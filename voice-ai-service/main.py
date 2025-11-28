import os, re, json
from typing import Any, Dict, Optional, List
from datetime import datetime, timezone

from fastapi import FastAPI, Header, HTTPException, Request
from fastapi.responses import JSONResponse, PlainTextResponse
from dotenv import load_dotenv
from db import get_supabase
import phonenumbers
from phonenumbers import geocoder as pn_geocoder

# Importar lógica de WhatsApp
from whatsapp import WhatsAppService

load_dotenv()

# ====== CONFIG ======
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY")
RETELL_API_KEY = os.getenv("RETELL_API_KEY")
API_BEARER_TOKEN = os.getenv("API_BEARER_TOKEN")

app = FastAPI(
    title="Unified Service - Retell + WhatsApp",
    version="3.0",
    docs_url="/api/docs",
    openapi_url="/api/openapi.json"
)
# Integrar el endpoint de llamadas Retell
from retell import router as retell_router
app.include_router(retell_router)


supabase = get_supabase()
def get_supabase():
    return supabase
# Inicializar servicio de WhatsApp
whatsapp_service = None

@app.on_event("startup")
async def startup_event():
    """Inicializa el servicio de WhatsApp al arrancar"""
    global whatsapp_service
    try:
        whatsapp_service = WhatsAppService(supabase)
        await whatsapp_service.initialize()
        print("✅ Servicio de WhatsApp inicializado")
    except Exception as e:
        print(f"⚠️ Error al inicializar WhatsApp: {e}")

# ====== UTILS ======
def require_bearer(auth_header: Optional[str]):
    """Valida el token Bearer"""
    if not auth_header or not auth_header.startswith("Bearer "):
        raise HTTPException(401, "Authorization header requerido")
    token = auth_header.replace("Bearer ", "")
    if token != API_BEARER_TOKEN:
        raise HTTPException(403, "Token inválido")

def norm_phone(p: Optional[str]) -> Optional[str]:
    """Normaliza teléfono a formato E.164"""
    if not p:
        return None
    p = p.strip()
    p = re.sub(r"[ \-()]", "", p)
    if p.startswith("tel:"):
        p = p[4:]
    if p and p[0] != "+" and re.fullmatch(r"\d+", p):
        p = "+" + p
    return p

# ====== SPOKEN PHONE NUMBERS ======
_ES_DIGITS = ["cero","uno","dos","tres","cuatro","cinco","seis","siete","ocho","nueve"]
_EN_DIGITS = ["zero","one","two","three","four","five","six","seven","eight","nine"]

def _es_0_99(n:int)->str:
    esp10 = {10:"diez",11:"once",12:"doce",13:"trece",14:"catorce",15:"quince"}
    tens = {20:"veinte",30:"treinta",40:"cuarenta",50:"cincuenta",
            60:"sesenta",70:"setenta",80:"ochenta",90:"noventa"}
    if n < 10: return _ES_DIGITS[n]
    if n in esp10: return esp10[n]
    if 16 <= n <= 19: return "dieci" + _ES_DIGITS[n-10]
    if n == 20: return "veinte"
    if 21 <= n <= 29: return "veinti" + _ES_DIGITS[n-20]
    d, r = (n//10)*10, n%10
    return tens[d] if r == 0 else f"{tens[d]} y {_ES_DIGITS[r]}"

def _en_0_99(n:int)->str:
    teens = {10:"ten",11:"eleven",12:"twelve",13:"thirteen",14:"fourteen",
             15:"fifteen",16:"sixteen",17:"seventeen",18:"eighteen",19:"nineteen"}
    tens = {20:"twenty",30:"thirty",40:"forty",50:"fifty",
            60:"sixty",70:"seventy",80:"eighty",90:"ninety"}
    if n < 10: return _EN_DIGITS[n]
    if n in teens: return teens[n]
    if n < 20: return "nineteen"
    if n in tens: return tens[n]
    d, r = (n//10)*10, n%10
    return f"{tens[d]} {_EN_DIGITS[r]}"

_COUNTRY_ES = {
    "CR": "Costa Rica", "PA":"Panamá", "MX":"México", "CA":"Canadá",
    "US":"Estados Unidos", "GB":"Reino Unido", "ES":"España"
}
_COUNTRY_EN = {
    "CR":"Costa Rica", "PA":"Panama", "MX":"Mexico", "CA":"Canada",
    "US":"United States", "GB":"United Kingdom", "ES":"Spain"
}

def _country_name(num: phonenumbers.PhoneNumber, lang: str) -> str:
    name = pn_geocoder.country_name_for_number(num, lang) or ""
    if name: return name
    rc = phonenumbers.region_code_for_number(num) or ""
    if lang.startswith("es"): return _COUNTRY_ES.get(rc, rc or "Internacional")
    return _COUNTRY_EN.get(rc, rc or "International")

def _chunk_pairs(s: str) -> List[str]:
    return [s[i:i+2] for i in range(0, len(s), 2)]

def _speak_group_es(g: str) -> str:
    if len(g) == 1: return _ES_DIGITS[int(g)]
    return _es_0_99(int(g))

def _speak_group_en(g: str) -> str:
    if len(g) == 1: return _EN_DIGITS[int(g)]
    return _en_0_99(int(g))

def build_spoken_vars(e164: str) -> dict:
    """Devuelve variables para pronunciar el teléfono correctamente"""
    out = {"caller_phone_spoken_es": None, "caller_phone_spoken_en": None}
    if not e164:
        return out

    try:
        num = phonenumbers.parse(e164, None)
        if not phonenumbers.is_valid_number(num):
            raise ValueError("invalid")
        nsn = phonenumbers.national_significant_number(num)
    except Exception:
        nsn = re.sub(r"\D", "", e164)

    pairs = _chunk_pairs(nsn)

    try:
        num = phonenumbers.parse(e164, None)
        country_es = _country_name(num, "es")
        country_en = _country_name(num, "en")
    except Exception:
        country_es = "Internacional"
        country_en = "International"

    es_parts = [_speak_group_es(p) for p in pairs]
    en_parts = [_speak_group_en(p) for p in pairs]

    out["caller_phone_spoken_es"] = f"{country_es}, " + ", ".join(es_parts)
    out["caller_phone_spoken_en"] = f"{country_en}, " + ", ".join(en_parts)
    return out

# ====== CUSTOMER DB ======
def _get_customer_by_phone(phone: str) -> Optional[Dict[str, Any]]:
    r = supabase.table("customers").select("*").eq("phone", phone).limit(1).execute()
    return (r.data or [None])[0]

def _ensure_customer(phone: str) -> Dict[str, Any]:
    """Crea cliente si no existe, devuelve el registro"""
    row = _get_customer_by_phone(phone)
    if not row:
        supabase.table("customers").insert({
            "phone": phone,
            "name": None,
            "conversations": []
        }).execute()
        row = _get_customer_by_phone(phone)
    return row

def _update_customer(phone: str, name: Optional[str] = None,
                     summary: Optional[str] = None,
                     sentiment: Optional[str] = None,
                     call_id: Optional[str] = None,
                     event: Optional[str] = None):
    """Actualiza info del cliente y agrega conversación"""
    cust = _ensure_customer(phone)
    conversations = cust.get("conversations") or []

    new_conv = {
        "ts": datetime.now(timezone.utc).isoformat(),
        "call_id": call_id,
        "summary": summary or "Sin resumen",
        "sentiment": sentiment or "Neutral",
        "event": event,
    }
    conversations.append(new_conv)

    updates = {
        "conversations": conversations,
        "last_ts": new_conv["ts"],
        "last_event": event,
        "last_summary": summary,
        "last_sentiment": sentiment,
        "last_call_id": call_id,
    }

    if name and name.strip() and not cust.get("name"):
        updates["name"] = name.strip()
        print(f"💾 Guardando nombre: {name.strip()}")

    supabase.table("customers").update(updates).eq("phone", phone).execute()

def _get_out_customer_by_number(user_number: str) -> Optional[Dict[str, Any]]:
    r = supabase.table("out_customers").select("*").eq("user_number", user_number).limit(1).execute()
    return (r.data or [None])[0]

def _ensure_out_customer(user_number: str) -> Dict[str, Any]:
    """Crea cliente saliente si no existe y devuelve el registro"""
    row = _get_out_customer_by_number(user_number)
    if not row:
        supabase.table("out_customers").insert({
            "user_number": user_number,
            "user_name": None,
            "conversations": []
        }).execute()
        row = _get_out_customer_by_number(user_number)
    return row

def _update_customer_out(user_number: str, name: Optional[str] = None,
                     summary: Optional[str] = None,
                     sentiment: Optional[str] = None,
                     call_id: Optional[str] = None,
                     event: Optional[str] = None):
    """Actualiza info del cliente saliente en out_customers y agrega conversación"""
    cust = _ensure_out_customer(user_number)
    conversations = cust.get("conversations") or []

    ts_iso = datetime.now(timezone.utc).isoformat()
    new_conv = {
        "ts": ts_iso,
        "call_id": call_id,
        "summary": summary or "Sin resumen",
        "sentiment": sentiment or "Neutral",
        "event": event,
    }
    conversations.append(new_conv)

    updates: Dict[str, Any] = {
        "conversations": conversations,
        "last_call_id": call_id,
        "last_interaction_ts": ts_iso,
    }

    # Solo actualiza el nombre si viene y aún no existe
    if name and name.strip() and not cust.get("user_name"):
        updates["user_name"] = name.strip()
        print(f"💾 Guardando nombre (out): {name.strip()}")

    supabase.table("out_customers").update(updates).eq("user_number", user_number).execute()

#=======  NUEVO WEBHOOK DE RESPALDO ======
@app.post("/api/retell/webhook-out")
async def retell_webhook_out(request: Request):
    """Maneja eventos de Retell (sin lógica de cola/concurrencia por ahora)."""
    try:
        payload = await request.json()
    except Exception:
        payload = {}

    print("📞 Webhook recibido")
    event = payload.get("event") or payload.get("type")

    # ========== CALL STARTED ==========
    if event == "call_started":
        call = payload.get("call") or {}
        user_number = norm_phone(call.get("to_number") or "+50662633553")
        call_id = call.get("call_id") or "testid"

        if user_number:
            print(f"✅ call_started - User Number: {user_number}, Call ID: {call_id}")
            # Marca en tu CRM (out_customers)
            _update_customer_out(
                user_number=user_number,
                call_id=call_id,
                event="call_started",
                summary="Llamada iniciada",
                sentiment="Neutral",
            )

        return PlainTextResponse("", status_code=204)

    # ========== CALL ENDED ==========
    if event == "call_ended":
        call = payload.get("call") or {}
        to_number = call.get("to_number")
        user_number = norm_phone(to_number) if to_number else None
        call_id = call.get("call_id") or "testid"

        print(
            f"📞 call_ended - to_number raw: '{to_number}', "
            f"normalizado: '{user_number}', Call ID: {call_id}",
            flush=True,
        )

        if not user_number:
            dynamic_variables = call.get("retell_llm_dynamic_variables") or {}
            dyn_number = dynamic_variables.get("user_number")
            user_number = norm_phone(dyn_number) if dyn_number else None
            print(
                f"📞 Intentando obtener de dynamic_variables: '{dyn_number}' -> '{user_number}'",
                flush=True,
            )

        user_name = (
            (call.get("retell_llm_dynamic_variables") or {}).get("user_name")
            or "Cliente"
        )
        print(f"👤 Usuario: {user_name}", flush=True)

        if user_number:
            print(f"✅ Guardando call_ended para {user_number}", flush=True)
            _update_customer_out(
                user_number=user_number,
                call_id=call_id,
                event="call_ended",
                summary="Llamada finalizada",
                sentiment="Neutral",
            )
        else:
            print(
                f"⚠️ call_ended SIN número válido - NO se guarda en DB. Call ID: {call_id}",
                flush=True,
            )

        return PlainTextResponse("", status_code=204)

    # ========== CALL ANALYZED ==========
    if event == "call_analyzed":
        call = payload.get("call") or {}
        to_number = call.get("to_number")
        user_number = norm_phone(to_number) if to_number else None
        call_id = call.get("call_id") or "testid"

        print(
            f"📊 call_analyzed - to_number: '{to_number}' -> '{user_number}', "
            f"Call ID: {call_id}",
            flush=True,
        )

        call_analysis = call.get("call_analysis") or {}
        summary = call_analysis.get("call_summary") or "Sin análisis"
        sentiment = call_analysis.get("user_sentiment") or "Neutral"

        custom_data = call_analysis.get("custom_analysis_data") or {}
        usernamed = custom_data.get("usernamed")
        if not usernamed:
            dv = call.get("retell_llm_dynamic_variables") or {}
            usernamed = dv.get("customer_name")

        print(f"👤 Nombre detectado: {usernamed}", flush=True)

        if user_number:
            print(f"✅ Guardando análisis para {user_number}", flush=True)
            _update_customer_out(
                user_number=user_number,
                name=usernamed,
                call_id=call_id,
                event="call_analyzed",
                summary=summary,
                sentiment=sentiment,
            )
        else:
            print(
                f"⚠️ call_analyzed SIN número válido - NO se guarda. Call ID: {call_id}",
                flush=True,
            )

        return PlainTextResponse("", status_code=204)

    # Otros eventos se ignoran de forma silenciosa
    return PlainTextResponse("", status_code=204)


@app.get("/mcp/health")
async def mcp_health():
    """Health check del servicio"""
    whatsapp_status = whatsapp_service.is_ready() if whatsapp_service else False
    return JSONResponse({
        "status": "ok",
        "version": "3.0",
        "whatsapp": whatsapp_status,
        "supabase": SUPABASE_URL is not None
    })

# ====== HEALTH CHECK ======
@app.get("/")
async def root():
    return {
        "status": "ok",
        "version": "3.0",
        "service": "unified-retell-whatsapp"
    }

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("APP_PORT", 8500))
    host = os.getenv("APP_HOST", "0.0.0.0")