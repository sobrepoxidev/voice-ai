# /opt/voice-ai-service/retell.py - VERSIÓN LIMPIA

from fastapi import APIRouter, HTTPException, Header, Depends
from fastapi.responses import PlainTextResponse
from pydantic import BaseModel
import httpx
import os
import asterisk.manager
from typing import Optional, Dict, List
from queue_manager import queue_manager, CallState

router = APIRouter(prefix="/api/retell", tags=["Retell AI"])

RETELL_API_KEY = os.getenv("RETELL_API_KEY")
RETELL_AGENT_ID_DEFAULT = os.getenv("RETELL_AGENT_ID_DEFAULT")
API_BEARER_TOKEN = os.getenv("API_BEARER_TOKEN")

AMI_HOST = os.getenv("AMI_HOST", "31.97.210.100")
AMI_PORT = int(os.getenv("AMI_PORT", 5038))
AMI_USER = os.getenv("AMI_USER", "omnileads")
AMI_PASS = os.getenv("AMI_PASS")

DEFAULT_FROM_NUMBER = "+18887719555"

# Diccionario en memoria para transferencias
pending_transfers = {}

# ==========================================================
#                    MODELOS
# ==========================================================
class MakeCallRequest(BaseModel):
    to_number: str
    from_number: Optional[str] = None
    agent_id: Optional[str] = None
    retell_llm_dynamic_variables: Optional[dict] = None


# ==========================================================
#                 AUTH TOKEN
# ==========================================================
def verify_token(authorization: str = Header(None)):
    if not authorization:
        raise HTTPException(401, "Auth header missing")
    token = authorization.replace("Bearer ", "")
    if token != API_BEARER_TOKEN:
        raise HTTPException(403, "Invalid token")
    return token


# ==========================================================
#          NORMALIZAR VARIABLES
# ==========================================================
def normalize_vars(d: Optional[dict]) -> dict:
    out = {}
    for k, v in (d or {}).items():
        out[k] = str(v)
    return out

# ==========================================================
#        VERSIÓN SÍNCRONA PARA THREADS
# ==========================================================
def register_call_with_retell_sync(to_number: str, from_number: str,
                                   agent_id: str, vars: dict) -> str:
    """
    Versión SÍNCRONA de register_call_with_retell
    Necesaria porque los workers corren en threads normales (no async)
    """
    import httpx

    payload = {
        "agent_id": agent_id,
        "from_number": from_number,
        "to_number": to_number,
        "direction": "outbound",
        "retell_llm_dynamic_variables": vars
    }

    with httpx.Client() as client:
        r = client.post(
            "https://api.retellai.com/v2/register-phone-call",
            headers={"Authorization": f"Bearer {RETELL_API_KEY}"},
            json=payload,
            timeout=30
        )
        r.raise_for_status()
        return r.json().get("call_id")


# ==========================================================
#        REGISTRO EN RETELL
# ==========================================================
async def register_call_with_retell(to_number: str, from_number: str,
                                   agent_id: str, vars: dict) -> str:
    payload = {
        "agent_id": agent_id,
        "from_number": from_number,
        "to_number": to_number,
        "direction": "outbound",
        "retell_llm_dynamic_variables": vars
    }
    async with httpx.AsyncClient() as client:
        r = await client.post(
            "https://api.retellai.com/v2/register-phone-call",
            headers={"Authorization": f"Bearer {RETELL_API_KEY}"},
            json=payload,
            timeout=30
        )
        r.raise_for_status()
        return r.json().get("call_id")


# ==========================================================
#               ORIGINAR EN ASTERISK
# ==========================================================
def originate_in_asterisk(to_number: str, from_number: str, call_id: str):
    import time
    import logging

    logger = logging.getLogger(__name__)
    clean_num = to_number.lstrip("+")
    mgr = asterisk.manager.Manager()

    result = {
        "success": True,
        "reason": "CONNECTED",
        "detected": False,
        "completed": False,  # ← NUEVO
        "hangup_cause": None  # ← NUEVO
    }

    originated_channel = None  # ← NUEVO: guardar canal que originamos

    # ========== EVENTO: AMD DETECTION ==========
    def on_user_event(event, manager):
        if event.get('UserEvent') == 'AMDDetection':
            logger.info(f"🤖 AMD detected for {call_id}: {event.get('Result')}")
            result['success'] = False
            result['reason'] = 'VOICEMAIL'
            result['cause'] = event.get('Cause', 'UNKNOWN')
            result['detected'] = True

    # ========== EVENTO: HANGUP ==========
    def on_hangup(event, manager):
        """Detecta cuando la llamada termina"""
        channel = event.get('Channel', '')
        uniqueid = event.get('Uniqueid', '')
        cause = event.get('Cause', 'Unknown')
        cause_text = event.get('Cause-txt', 'Unknown')

        # Verificar si es el canal que originamos
        if originated_channel and originated_channel in channel:
            logger.info(f"📞 Hangup detected for {call_id}: {cause_text} (cause: {cause})")
            result['completed'] = True
            result['hangup_cause'] = cause_text

    try:
        mgr.connect(AMI_HOST, AMI_PORT)
        mgr.login(AMI_USER, AMI_PASS)

        # Registrar listeners
        mgr.register_event('UserEvent', on_user_event)
        mgr.register_event('Hangup', on_hangup)  # ← NUEVO

        vars = {
            "TO_NUMBER": to_number,
            "FROM_NUMBER": from_number,
            "RETELL_CALL_ID": call_id
        }

        # Originate la llamada
        resp = mgr.originate(
            channel=f"Local/{clean_num}@retell-originate",
            context="retell-bridge",
            exten="s",
            priority=1,
            timeout=60000,
            caller_id=from_number,
            variables=vars,
        )

        # Obtener el canal que se originó
        originated_channel = f"Local/{clean_num}@retell-originate"
        logger.info(f"📡 Originated channel: {originated_channel}")

        # ========== FASE 1: ESPERAR AMD (8 segundos) ==========
        logger.info(f"⏳ Waiting for AMD check ({call_id})...")
        for i in range(40):  # 8 segundos
            time.sleep(0.2)
            if result['detected']:
                # AMD detectó voicemail
                logger.info(f"❌ AMD: VOICEMAIL detected ({call_id})")
                return result

        # ========== FASE 2: ESPERAR HANGUP (hasta timeout) ==========
        if not result['detected']:
            logger.info(f"✅ AMD passed, call is active ({call_id}). Waiting for hangup...")

            # Esperar hasta 10 minutos (600 segundos) para que la llamada termine
            max_wait = 600  # 10 minutos
            for i in range(max_wait * 5):  # Check cada 0.2s
                time.sleep(0.2)

                if result['completed']:
                    logger.info(f"✅ Call completed normally ({call_id})")
                    result['reason'] = 'COMPLETED'
                    return result

                # Si AMD detectó algo tarde
                if result['detected']:
                    logger.info(f"❌ Late AMD detection ({call_id})")
                    return result

            # Timeout - la llamada sigue activa después de 10 minutos
            logger.warning(f"⚠️ Call still active after {max_wait}s ({call_id})")
            result['reason'] = 'TIMEOUT'
            return result

        return result

    except Exception as e:
        logger.error(f"❌ AMI Error ({call_id}): {e}")
        result['success'] = False
        result['reason'] = 'ERROR'
        result['error'] = str(e)
        return result

    finally:
        try:
            mgr.logoff()
        except:
            pass

def normalize_inbound_number(num: str, default_cc: Optional[str] = "+506") -> str:
    if not num:
        return ""
    num = num.strip()
    if num.startswith("+"):
        return num
    digits = "".join(ch for ch in num if ch.isdigit())
    if not digits:
        return ""
    if digits.startswith("506") and len(digits) == 11:
        return "+" + digits
    if len(digits) == 8 and default_cc:
        return default_cc + digits
    return "+" + digits


# ==========================================================
#              📞 ENDPOINTS PRINCIPALES
# ==========================================================

# ============ BATCH CALL (Para tu dashboard) ============
@router.post("/batch-call")
async def batch_call(calls: List[MakeCallRequest], token: str = Depends(verify_token)):
    """Envía múltiples llamadas a la cola - USAR ESTE"""
    if len(calls) > 100:
        raise HTTPException(400, "Max 100 calls per batch")

    job_ids = []
    for req in calls:
        to_n = req.to_number if req.to_number.startswith("+") else f"+{req.to_number}"
        from_n = req.from_number or DEFAULT_FROM_NUMBER
        agent = req.agent_id or RETELL_AGENT_ID_DEFAULT
        vars = normalize_vars(req.retell_llm_dynamic_variables or {})

        job_id = queue_manager.submit_call(to_n, from_n, agent, vars)
        job_ids.append(job_id)

    return {
        "success": True,
        "job_ids": job_ids,
        "queued": len(job_ids),
        "active_calls": queue_manager.get_active_count(),
        "queue_size": queue_manager.get_queue_size()
    }


# ============ ESTADO DE LLAMADA ============
@router.get("/call-status/{job_id}")
async def get_call_status(job_id: str, token: str = Depends(verify_token)):
    """Obtiene estado de una llamada específica"""
    job = queue_manager.get_job(job_id)
    if not job:
        raise HTTPException(404, "Job not found")
    return job


# ============ ESTADO GENERAL DE LA COLA ============
@router.get("/queue-status")
async def get_queue_status(token: str = Depends(verify_token)):
    """Estado general de la cola"""
    return {
        "active_calls": queue_manager.get_active_count(),
        "queue_size": queue_manager.get_queue_size(),
        "max_concurrent": queue_manager.max_concurrent
    }


# ============ LLAMADA INDIVIDUAL (Opcional) ============
@router.post("/make-call")
async def make_call(req: MakeCallRequest, token: str = Depends(verify_token)):
    """Llamada individual (no usar para dashboard, usar batch-call)"""
    import threading

    to_n = req.to_number if req.to_number.startswith("+") else f"+{req.to_number}"
    from_n = req.from_number or DEFAULT_FROM_NUMBER
    agent = req.agent_id or RETELL_AGENT_ID_DEFAULT
    vars = normalize_vars(req.retell_llm_dynamic_variables or {})

    call_id = await register_call_with_retell(
        to_number=to_n,
        from_number=from_n,
        agent_id=agent,
        vars=vars
    )

    result = {"success": None, "reason": "PENDING"}

    def originate_thread():
        try:
            ami_result = originate_in_asterisk(to_number=to_n, from_number=from_n, call_id=call_id)
            result.update(ami_result)
        except Exception as e:
            result.update({"success": False, "reason": "ERROR", "error": str(e)})

    thread = threading.Thread(target=originate_thread, daemon=True)
    thread.start()
    thread.join(timeout=10)

    if result['success'] is None:
        response = {
            "success": True,
            "call_id": call_id,
            "reason": "CALLING",
            "message": "Call initiated, AMD check in progress",
            "to_number": to_n,
            "from_number": from_n
        }
    elif result['success']:
        response = {
            "success": True,
            "call_id": call_id,
            "reason": "CONNECTED",
            "message": "Call connected successfully",
            "to_number": to_n,
            "from_number": from_n
        }
    else:
        response = {
            "success": False,
            "call_id": None,
            "reason": result['reason'],
            "message": f"Voicemail detected: {result.get('cause', 'UNKNOWN')}",
            "to_number": to_n,
            "from_number": from_n
        }

    return response


# ==========================================================
#              🔄 TRANSFERENCIAS
# ==========================================================

@router.post("/prepare-transfer")
async def prepare_transfer(transfer_id: str, retell_call_id: str, phone: str):
    """Preparar transferencia - guardar info en memoria"""
    try:
        manager = asterisk.manager.Manager()
        manager.connect(AMI_HOST, AMI_PORT)
        manager.login(AMI_USER, AMI_PASS)

        channels = manager.status()
        retell_channel = None

        for channel in channels:
            try:
                call_id_var = manager.getvar(channel.channel, 'RETELL_CALL_ID')
                if call_id_var.data == retell_call_id:
                    retell_channel = channel.channel
                    break
            except:
                continue

        manager.logoff()

        if not retell_channel:
            raise HTTPException(404, "Canal de Retell no encontrado")

        pending_transfers[transfer_id] = {
            'retell_call_id': retell_call_id,
            'retell_channel': retell_channel,
            'phone': phone,
            'status': 'prepared'
        }

        return {
            "status": "prepared",
            "transfer_id": transfer_id,
            "channel": retell_channel
        }

    except Exception as e:
        raise HTTPException(500, str(e))


@router.post("/execute-transfer")
async def execute_transfer(transfer_id: str, agent_extension: str = "1002"):
    """Ejecutar transferencia via AMI - llamar al agente y hacer bridge"""

    if transfer_id not in pending_transfers:
        raise HTTPException(404, "Transfer no encontrado")

    transfer_info = pending_transfers[transfer_id]
    retell_channel = transfer_info['retell_channel']

    try:
        manager = asterisk.manager.Manager()
        manager.connect(AMI_HOST, AMI_PORT)
        manager.login(AMI_USER, AMI_PASS)

        response = manager.originate(
            channel=f'PJSIP/{agent_extension}',
            exten='s',
            context='bridge-transfer',
            priority='1',
            variables={
                'TARGET_CHANNEL': retell_channel,
                'TRANSFER_ID': transfer_id
            },
            callerid=f'Transfer <{transfer_info["phone"]}>'
        )

        manager.logoff()

        transfer_info['status'] = 'bridging'

        return {
            "status": "bridging",
            "transfer_id": transfer_id,
            "agent": agent_extension,
            "ami_response": str(response)
        }

    except Exception as e:
        raise HTTPException(500, str(e))


# ==========================================================
#                 INBOUND → RETELL
# ==========================================================
@router.get("/handle-inbound-get")
async def handle_inbound_get(from_number: str, to_number: str, token: Optional[str] = None):
    if not token or token != API_BEARER_TOKEN:
        raise HTTPException(403, "Invalid token")

    default_cc = None
    if to_number in ("50642052929", "+50642052929"):
        default_cc = "+506"
    elif to_number in ("18887719555", "+18887719555"):
        default_cc = None

    from_number_norm = normalize_inbound_number(from_number, default_cc=default_cc)
    to_number_norm = normalize_inbound_number(to_number, default_cc=None)

    payload = {
        "agent_id": RETELL_AGENT_ID_DEFAULT,
        "from_number": from_number_norm,
        "to_number": to_number_norm,
        "direction": "inbound",
        "retell_llm_dynamic_variables": {
            "from_number": from_number_norm,
            "to_number": to_number_norm,
        },
    }

    async with httpx.AsyncClient() as client:
        r = await client.post(
            "https://api.retellai.com/v2/register-phone-call",
            headers={"Authorization": f"Bearer {RETELL_API_KEY}"},
            json=payload,
            timeout=30,
        )
        r.raise_for_status()
        call_id = r.json().get("call_id")

    return PlainTextResponse(call_id)