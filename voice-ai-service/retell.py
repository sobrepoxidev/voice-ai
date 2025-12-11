from fastapi import APIRouter, HTTPException, Header, Depends, BackgroundTasks
from fastapi.responses import PlainTextResponse
from pydantic import BaseModel
import httpx
import os
import random
import asyncio
from typing import Optional, Dict, List
from queue_manager import queue_manager, CallState
from datetime import datetime
import logging
from supabase import create_client, Client

router = APIRouter(prefix="/api/retell", tags=["Retell AI"])
logger = logging.getLogger(__name__)

RETELL_API_KEY = os.getenv("RETELL_API_KEY")
RETELL_AGENT_ID_DEFAULT = os.getenv("RETELL_AGENT_ID_DEFAULT")
API_BEARER_TOKEN = os.getenv("API_BEARER_TOKEN")

AMI_HOST = os.getenv("AMI_HOST", "31.97.210.100")
AMI_PORT = int(os.getenv("AMI_PORT", 5038))
AMI_USER = os.getenv("AMI_USER", "omnileads")
AMI_PASS = os.getenv("AMI_PASS")

DEFAULT_FROM_NUMBER = "+18887719555"

# Supabase Client
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_SERVICE_KEY = os.getenv("SUPABASE_SERVICE_KEY")
supabase: Client = create_client(SUPABASE_URL, SUPABASE_SERVICE_KEY)

# Diccionario en memoria para transferencias
pending_transfers = {}
# Variable global para tracking de transferencias
transfer_channels = {}  # {transfer_id: {'retell_channel': ..., 'phone': ...}}


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
#     🔥 NUEVO: ENDPOINT PARA AMD DESDE DIALPLAN
# ==========================================================
# ==========================================================
#     🔥 ENDPOINT AMD ACTUALIZADO - Todos los estados
# ==========================================================
# Reemplaza las funciones amd_result en retell.py

@router.post("/amd-result")
async def amd_result_post(
    call_id: str,
    result: str,
    cause: str = ""
):
    """Endpoint llamado desde Asterisk dialplan"""
    return await _handle_amd_result(call_id, result, cause)


@router.get("/amd-result")
async def amd_result_get(
    call_id: str,
    result: str,
    cause: str = ""
):
    """Versión GET para CURL desde dialplan"""
    return await _handle_amd_result(call_id, result, cause)


async def _handle_amd_result(call_id: str, result: str, cause: str):
    """Lógica común para manejar resultado de llamada desde dialplan"""
    logger.info(f"📞 AMD Result: call_id={call_id}, result={result}, cause={cause}")

    # Mapeo de resultados a estados de DB
    status_map = {
        'VOICEMAIL': 'voicemail',
        'NO_ANSWER': 'no_answer',
        'BUSY': 'busy',
        'FAILED': 'failed',
        'HUMAN': 'active',  # Humano detectado → activo, Retell manejará el resto
    }

    db_status = status_map.get(result.upper(), 'failed')

    # Estados que marcan la llamada como inactiva
    inactive_statuses = ['voicemail', 'no_answer', 'busy', 'failed']
    is_inactive = db_status in inactive_statuses

    try:
        update_data = {
            'status': db_status,
            'updated_at': datetime.utcnow().isoformat(),
            'end_reason': f"{result}:{cause}" if cause else result
        }

        if is_inactive:
            update_data['active'] = False

        supabase.table('outbound_call_queue') \
            .update(update_data) \
            .eq('retell_call_id', call_id) \
            .execute()

        logger.info(f"✅ Queue → {db_status.upper()}: {call_id}")
        return PlainTextResponse(f"{db_status.upper()}:{call_id}")

    except Exception as e:
        logger.error(f"❌ AMD Result error: {e}")
        return PlainTextResponse(f"ERROR:{str(e)}", status_code=500)


# ==========================================================
#        VERSIÓN SÍNCRONA PARA THREADS
# ==========================================================
def register_call_with_retell_sync(to_number: str, from_number: str,
                                   agent_id: str, vars: dict) -> str:
    """Versión SÍNCRONA de register_call_with_retell"""
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
#        REGISTRO EN RETELL (Versión Async)
# ==========================================================
async def register_call_with_retell(to_number: str, from_number: str,
                                   agent_id: str, vars: dict) -> str:
    """Versión ASYNC para uso en endpoints FastAPI"""
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
#    🔥 SIMPLIFICADO: ORIGINATE SIN ESPERAR EVENTOS
# ==========================================================
def originate_in_asterisk(to_number: str, from_number: str, retell_call_id: str):
    """
    Origina llamada en Asterisk de forma simple.
    El dialplan se encarga de AMD y notifica via HTTP.
    """
    import asterisk.manager

    clean_num = to_number.lstrip("+")

    try:
        manager = asterisk.manager.Manager()
        manager.connect(AMI_HOST, AMI_PORT)
        manager.login(AMI_USER, AMI_PASS)

        logger.info(f"📡 Originating: {to_number} ({retell_call_id})")

        # Usar send_action para control total
        response = manager.send_action({
            'Action': 'Originate',
            'Channel': f'Local/{clean_num}@retell-originate',
            'Context': 'retell-bridge',
            'Exten': 's',
            'Priority': '1',
            'Timeout': '45000',
            'CallerID': f'"{from_number}" <{from_number}>',
            'Variable': f'TO_NUMBER={to_number},FROM_NUMBER={from_number},RETELL_CALL_ID={retell_call_id}',
            'Async': 'true'
        })

        manager.logoff()

        logger.info(f"✅ Originate sent: {retell_call_id} - Response: {response}")

        return {
            'success': True,
            'reason': 'ORIGINATED',
            'hangup_cause': None
        }

    except Exception as e:
        logger.error(f"❌ AMI Error ({retell_call_id}): {e}", exc_info=True)
        return {
            'success': False,
            'reason': 'ERROR',
            'hangup_cause': str(e)
        }


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

@router.get("/call-info/{call_id}")
async def get_call_info(call_id: str):
    """
    Obtiene información de una llamada desde outbound_call_queue
    Usado por webhook-transfer para obtener phone number
    """
    try:
        result = supabase.table('outbound_call_queue') \
            .select('*') \
            .eq('retell_call_id', call_id) \
            .single() \
            .execute()

        if result.data:
            return {
                'retell_call_id': call_id,
                'to_number': result.data.get('phone'),
                'from_number': result.data.get('from_number'),
                'status': result.data.get('status'),
                'user_name': result.data.get('user_name')
            }

        # Si no está en outbound, buscar en out_customers
        customer = supabase.table('out_customers') \
            .select('*') \
            .eq('retell_call_id', call_id) \
            .single() \
            .execute()

        if customer.data:
            return {
                'retell_call_id': call_id,
                'to_number': customer.data.get('user_number'),
                'from_number': None,
                'status': 'active',
                'user_name': customer.data.get('user_name')
            }

        raise HTTPException(404, f"Call {call_id} not found")

    except Exception as e:
        logger.error(f"❌ Error getting call info: {e}")
        raise HTTPException(500, str(e))


@router.post("/prepare-transfer")
async def prepare_transfer(
    transfer_id: str,
    retell_call_id: str,
    phone: str
):
    """
    Prepara una transferencia buscando el canal de Asterisk donde está Retell.

    Flujo:
    1. Conectar a AMI
    2. Buscar canal que tiene la variable RETELL_CALL_ID
    3. Guardar info en memoria para execute-transfer
    """
    try:
        manager = asterisk.manager.Manager()
        manager.connect(AMI_HOST, AMI_PORT)
        manager.login(AMI_USER, AMI_PASS)

        logger.info(f"🔍 Buscando canal para Retell call: {retell_call_id}")

        # Obtener todos los canales activos
        response = manager.command('core show channels')
        channels_output = response.data

        # Buscar canal con el retell_call_id
        retell_channel = None

        # Lista de canales (parsear output de AMI)
        # Formato típico: "PJSIP/didww_out_aux-0000009e"
        for line in channels_output.split('\n'):
            if 'PJSIP/' in line or 'SIP/' in line:
                # Extraer nombre del canal
                parts = line.strip().split()
                if parts:
                    channel = parts[0]

                    # Verificar si este canal tiene la variable RETELL_CALL_ID
                    try:
                        var_response = manager.getvar(channel, 'RETELL_CALL_ID')
                        if var_response and var_response.data == retell_call_id:
                            retell_channel = channel
                            logger.info(f"✅ Canal encontrado: {channel}")
                            break
                    except:
                        continue

        manager.logoff()

        if not retell_channel:
            logger.warning(f"⚠️ No se encontró canal para {retell_call_id}")
            # Guardar de todos modos para intentar después
            transfer_channels[transfer_id] = {
                'retell_call_id': retell_call_id,
                'retell_channel': None,
                'phone': phone,
                'status': 'channel_not_found'
            }
            return {
                'status': 'prepared_without_channel',
                'transfer_id': transfer_id,
                'warning': 'Channel not found yet, will retry on execute'
            }

        # Guardar info de la transferencia
        transfer_channels[transfer_id] = {
            'retell_call_id': retell_call_id,
            'retell_channel': retell_channel,
            'phone': phone,
            'status': 'prepared'
        }

        logger.info(f"✅ Transfer {transfer_id} prepared: {retell_channel} → Agent")

        return {
            'status': 'prepared',
            'transfer_id': transfer_id,
            'retell_channel': retell_channel,
            'phone': phone
        }

    except Exception as e:
        logger.error(f"❌ Error preparing transfer: {e}", exc_info=True)
        raise HTTPException(500, str(e))


@router.post("/execute-transfer")
async def execute_transfer(
    transfer_id: str,
    agent_extension: str = "1002"
):
    """
    Ejecuta la transferencia conectando al agente con el canal de Retell.

    Flujo:
    1. Obtener info del transfer preparado
    2. Originate llamada al agente (PJSIP/1002)
    3. Cuando agente contesta, bridge con canal de Retell
    4. Hangup canal de Retell (IA se desconecta, queda solo humano)
    """
    if transfer_id not in transfer_channels:
        raise HTTPException(404, f"Transfer {transfer_id} not prepared")

    transfer_info = transfer_channels[transfer_id]
    retell_channel = transfer_info.get('retell_channel')
    retell_call_id = transfer_info.get('retell_call_id')
    phone = transfer_info.get('phone')

    try:
        manager = asterisk.manager.Manager()
        manager.connect(AMI_HOST, AMI_PORT)
        manager.login(AMI_USER, AMI_PASS)

        logger.info(f"📞 Ejecutando transfer: Agente {agent_extension} ← {phone}")

        # Si no encontramos el canal antes, intentar de nuevo
        if not retell_channel:
            logger.info(f"🔍 Reintentando búsqueda de canal para {retell_call_id}")
            response = manager.command('core show channels')
            channels_output = response.data

            for line in channels_output.split('\n'):
                if 'PJSIP/' in line or 'SIP/' in line:
                    parts = line.strip().split()
                    if parts:
                        channel = parts[0]
                        try:
                            var_response = manager.getvar(channel, 'RETELL_CALL_ID')
                            if var_response and var_response.data == retell_call_id:
                                retell_channel = channel
                                transfer_info['retell_channel'] = channel
                                logger.info(f"✅ Canal encontrado en retry: {channel}")
                                break
                        except:
                            continue

        if not retell_channel:
            manager.logoff()
            raise HTTPException(404, f"Retell channel not found for call {retell_call_id}")

        # Originate llamada al agente con bridge automático
        logger.info(f"📞 Calling agent {agent_extension}...")

        # Usamos Originate con Bridge directo
        response = manager.send_action({
            'Action': 'Originate',
            'Channel': f'PJSIP/{agent_extension}',
            'Exten': retell_channel,  # ← Bridge directo al canal de Retell
            'Context': 'bridge-direct',  # Contexto que hace Bridge
            'Priority': '1',
            'Timeout': '30000',
            'CallerID': f'Transfer <{phone}>',
            'Variable': f'TRANSFER_ID={transfer_id},RETELL_CALL_ID={retell_call_id},TARGET_CHANNEL={retell_channel}',
            'Async': 'true'
        })

        logger.info(f"✅ Originate sent: {response}")

        # Actualizar estado
        transfer_info['status'] = 'bridging'
        transfer_info['agent_extension'] = agent_extension

        manager.logoff()

        # Nota: El bridge se completará cuando el agente conteste
        # El dialplan en 'bridge-direct' hará el Bridge() automático

        return {
            'status': 'bridging',
            'transfer_id': transfer_id,
            'agent_extension': agent_extension,
            'retell_channel': retell_channel,
            'phone': phone,
            'message': 'Agent is being called, bridge will happen on answer'
        }

    except Exception as e:
        logger.error(f"❌ Error executing transfer: {e}", exc_info=True)
        raise HTTPException(500, str(e))


# ==========================================================
#     🔧 ENDPOINT AUXILIAR: COMPLETE TRANSFER
# ==========================================================

@router.post("/complete-transfer")
async def complete_transfer(
    transfer_id: str,
    success: bool = True
):
    """
    Marca una transferencia como completada.
    Llamado desde el dialplan o webhook cuando el bridge termina.
    """
    if transfer_id in transfer_channels:
        del transfer_channels[transfer_id]

    try:
        supabase.table('call_transfers') \
            .update({
                'status': 'completed' if success else 'failed',
                'completed_at': datetime.utcnow().isoformat()
            }) \
            .eq('id', transfer_id) \
            .execute()

        logger.info(f"✅ Transfer {transfer_id} marked as {'completed' if success else 'failed'}")

        return {'status': 'ok', 'transfer_id': transfer_id}
    except Exception as e:
        logger.error(f"❌ Error completing transfer: {e}")
        return {'status': 'error', 'error': str(e)}


# ==========================================================
#     📊 ENDPOINT: LISTAR TRANSFERENCIAS PENDIENTES
# ==========================================================

@router.get("/pending-transfers")
async def get_pending_transfers(token: str = Depends(verify_token)):
    """
    Obtiene todas las transferencias pendientes para mostrar en el dashboard
    """
    try:
        result = supabase.table('call_transfers') \
            .select('*') \
            .eq('status', 'pending') \
            .order('created_at', desc=True) \
            .execute()

        return {
            'transfers': result.data or [],
            'count': len(result.data) if result.data else 0
        }
    except Exception as e:
        logger.error(f"❌ Error getting pending transfers: {e}")
        raise HTTPException(500, str(e))

@router.post("/batch-call")
async def batch_call(calls: List[MakeCallRequest], token: str = Depends(verify_token)):
    """Envía múltiples llamadas a la cola"""
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


@router.get("/call-status/{job_id}")
async def get_call_status(job_id: str, token: str = Depends(verify_token)):
    """Obtiene estado de una llamada específica"""
    job = queue_manager.get_job(job_id)
    if not job:
        raise HTTPException(404, "Job not found")
    return job


@router.get("/queue-status")
async def get_queue_status(token: str = Depends(verify_token)):
    """Estado general de la cola"""
    return {
        "active_calls": queue_manager.get_active_count(),
        "queue_size": queue_manager.get_queue_size(),
        "max_concurrent": queue_manager.max_concurrent
    }


@router.post("/make-call")
async def make_call(req: MakeCallRequest, token: str = Depends(verify_token)):
    """Llamada individual"""
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

    # Originar en background
    def originate_thread():
        originate_in_asterisk(to_number=to_n, from_number=from_n, retell_call_id=call_id)

    thread = threading.Thread(target=originate_thread, daemon=True)
    thread.start()

    return {
        "success": True,
        "call_id": call_id,
        "reason": "CALLING",
        "message": "Call initiated - AMD will notify result",
        "to_number": to_n,
        "from_number": from_n
    }


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


# ==========================================================
#     🕵️‍♂️ CLASSIFIER LOGIC
# ==========================================================

class ClassifyRequest(BaseModel):
    phones: List[str]

async def process_classification_batch(phones: List[str]):
    """
    Procesa el lote de clasificación en background con 'antropía' (delays aleatorios).
    """
    logger.info(f"🕵️‍♂️ Starting batch classification for {len(phones)} numbers (Background)")
    
    for i, phone in enumerate(phones):
        p = normalize_inbound_number(phone)
        if not p:
            continue
            
        # Entropy delay (Human-like behavior)
        if i > 0:
            # "Coffee Break" logic: every 5-8 calls, take a longer pause
            if i % random.randint(5, 8) == 0:
                long_delay = random.uniform(25.0, 45.0)
                logger.info(f"☕ Coffee Break: Pausing for {long_delay:.2f}s to mimic human fatigue")
                await asyncio.sleep(long_delay)
            else:
                # Standard random sleep between 6 and 14 seconds
                delay = random.uniform(6.0, 14.0)
                logger.info(f"⏳ Entropy: Waiting {delay:.2f}s before classifying {p}")
                await asyncio.sleep(delay)
        
        # Originate call
        res = originate_classification_call(p)
        if res['success']:
            logger.info(f"🚀 Classification initiated for {p}")
        else:
            logger.error(f"❌ Failed to initiate classification for {p}: {res.get('reason')}")

@router.post("/batch-classify")
async def batch_classify(req: ClassifyRequest, background_tasks: BackgroundTasks, token: str = Depends(verify_token)):
    """
    Inicia llamadas de clasificación (Ping) para un lote de números.
    Se ejecuta en background con intervalos aleatorios.
    """
    if len(req.phones) > 20:
        raise HTTPException(400, "Max 20 phones per batch")

    background_tasks.add_task(process_classification_batch, req.phones)
        
    return {
        "message": "Classification started in background",
        "count": len(req.phones),
        "note": "Calls will be placed with random intervals (human-like behavior)"
    }

@router.get("/classifier-result")
async def classifier_result(
    phone: str,
    status: str,
    cause: str = ""
):
    """
    Callback desde Asterisk para resultados de clasificación.
    Mueve el contacto a active_contacts o inactive_contacts.
    """
    logger.info(f"🕵️‍♂️ Classification Result: {phone} -> {status} ({cause})")
    
    # 1. Buscar info del contacto original (para nombre/locale)
    try:
        # Intentamos obtener datos de outbound_call_contacts si existen
        # Nota: phone viene normalizado E.164 desde Asterisk (+506...)
        original = supabase.table('outbound_call_contacts') \
            .select('*') \
            .eq('phone', phone) \
            .single() \
            .execute()
            
        user_name = original.data.get('user_name') if original.data else None
        locale = original.data.get('locale', 'es') if original.data else 'es'
        
        if status == 'active':
            # Insertar en active_contacts
            supabase.table('active_contacts').upsert({
                'phone': phone,
                'user_name': user_name,
                'locale': locale,
                'classification_details': {'cause': cause, 'status': status},
                'last_called_at': datetime.utcnow().isoformat()
            }, on_conflict='phone').execute()
            
        elif status == 'inactive':
            # Insertar en inactive_contacts
            supabase.table('inactive_contacts').insert({
                'phone': phone,
                'user_name': user_name,
                'locale': locale,
                'classification_cause': f"{cause}"
            }).execute()

        else:
            # Indeterminate -> inactive_contacts with special cause label
            # User wants to review them visually
            cause_label = f"INDETERMINATE (Cause {cause})"
            supabase.table('inactive_contacts').insert({
                'phone': phone,
                'user_name': user_name,
                'locale': locale,
                'classification_cause': cause_label
            }).execute()
            
        return PlainTextResponse("OK")
        
    except Exception as e:
        logger.error(f"❌ Error processing classifier result for {phone}: {e}")
        return PlainTextResponse("ERROR")


def originate_classification_call(to_number: str):
    """
    Origina llamada de clasificación (sin Retell)
    """
    import asterisk.manager
    
    clean_num = to_number.lstrip("+")
    
    try:
        manager = asterisk.manager.Manager()
        manager.connect(AMI_HOST, AMI_PORT)
        manager.login(AMI_USER, AMI_PASS)
        
        logger.info(f"🕵️‍♂️ Classifying: {to_number}")
        
        response = manager.send_action({
            'Action': 'Originate',
            'Channel': f'Local/{clean_num}@classifier-originate',
            'Context': 'classifier-out',  # CORRECCION: Debe coincidir o ser válido
            'Exten': clean_num,          # CORRECCION: Pasar el numero como extensión
            'Priority': '1',
            'Timeout': '30000',
            'Async': 'true'
        })
        
        manager.logoff()
        return {'success': True}
        
    except Exception as e:
        logger.error(f"❌ Classifier AMI Error: {e}")
        return {'success': False, 'reason': str(e)}