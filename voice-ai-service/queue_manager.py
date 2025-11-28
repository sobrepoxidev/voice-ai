# /opt/voice-ai-service/queue_manager.py - VERSIÓN CORREGIDA
import redis
import json
import uuid
import threading
from queue import Queue
from datetime import datetime
from enum import Enum
from typing import Optional
import logging
import os
from supabase import create_client, Client

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# ========== CONFIGURACIÓN ==========
redis_client = redis.Redis(
    host="31.97.210.100",
    port=6379,
    decode_responses=True,
    socket_timeout=5,
)

# Supabase Client
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_SERVICE_KEY = os.getenv("SUPABASE_SERVICE_KEY")
supabase: Client = create_client(SUPABASE_URL, SUPABASE_SERVICE_KEY)


# ========== ENUMS ==========
class CallState(str, Enum):
    QUEUED = "queued"
    CALLING = "calling"
    ACTIVE = "active"
    VOICEMAIL = "voicemail"
    COMPLETED = "completed"
    FAILED = "failed"


# ========== FUNCIÓN STANDALONE PARA ACTUALIZAR SUPABASE ==========
def update_supabase_status(job_id: str, phone: str, status: str, retell_call_id: str = None):
    """
    Actualiza estado en Supabase outbound_call_queue
    Esta función es STANDALONE (fuera de la clase)
    """
    try:
        # Mapeo de estados queue_manager → Supabase
        status_map = {
            'queued': 'queued',
            'calling': 'calling',
            'active': 'active',
            'voicemail': 'canceled',
            'completed': 'finished',
            'failed': 'canceled'
        }

        supabase_status = status_map.get(status, status)

        update_data = {
            'status': supabase_status,
            'updated_at': datetime.utcnow().isoformat()
        }

        if retell_call_id:
            update_data['retell_call_id'] = retell_call_id

        # Buscar por phone y job_id (más seguro)
        result = supabase.table('outbound_call_queue') \
            .update(update_data) \
            .eq('phone', phone) \
            .eq('job_id', job_id) \
            .execute()

        logger.info(f"✅ Supabase updated: {phone} → {supabase_status}")
    except Exception as e:
        logger.error(f"❌ Supabase update failed: {e}")


# ========== CLASES ==========
class CallJob:
    def __init__(self, job_id: str, to_number: str, from_number: str, agent_id: str):
        self.id = job_id
        self.to_number = to_number
        self.from_number = from_number
        self.agent_id = agent_id
        self.state = CallState.QUEUED
        self.retell_call_id: Optional[str] = None
        self.amd_result: Optional[str] = None
        self.error: Optional[str] = None
        self.created_at = datetime.utcnow().isoformat()
        self.started_at: Optional[str] = None
        self.completed_at: Optional[str] = None

    def to_dict(self):
        raw = {
            "id": self.id,
            "to_number": self.to_number,
            "from_number": self.from_number,
            "agent_id": self.agent_id,
            "state": self.state.value,
            "retell_call_id": self.retell_call_id,
            "amd_result": self.amd_result,
            "error": self.error,
            "created_at": self.created_at,
            "started_at": self.started_at,
            "completed_at": self.completed_at,
        }
        # Quitar los None para que Redis no se queje
        return {k: v for k, v in raw.items() if v is not None}


class CallQueueManager:
    def __init__(self, max_concurrent=20):
        self.max_concurrent = max_concurrent
        self.call_queue = Queue()
        self.active_count = 0
        self.lock = threading.Lock()

        # Iniciar workers (20 threads)
        logger.info(f"Starting {max_concurrent} worker threads...")
        for i in range(max_concurrent):
            t = threading.Thread(target=self._worker, daemon=True, name=f"Worker-{i}")
            t.start()
        logger.info(f"✅ {max_concurrent} workers started")

    def submit_call(self, to_number: str, from_number: str, agent_id: str, variables: dict = None) -> str:
        """Agrega llamada a la cola"""
        job_id = str(uuid.uuid4())

        job = CallJob(
            job_id=job_id,
            to_number=to_number,
            from_number=from_number,
            agent_id=agent_id
        )

        # Guardar en Redis
        try:
            redis_client.hset(f"call:{job_id}", mapping=job.to_dict())
            redis_client.expire(f"call:{job_id}", 7200)  # 2 horas TTL
        except Exception as e:
            logger.error(f"Redis error: {e}")
            raise

        # Agregar a cola con variables
        self.call_queue.put((job_id, variables or {}))
        logger.info(f"📞 Job {job_id} queued for {to_number}")

        return job_id

    def _worker(self):
        """Worker thread que procesa llamadas"""
        thread_name = threading.current_thread().name
        logger.info(f"🔧 {thread_name} ready")

        while True:
            # Bloquea hasta que haya trabajo
            job_id, variables = self.call_queue.get()

            with self.lock:
                self.active_count += 1

            logger.info(f"🚀 {thread_name} processing {job_id}")

            try:
                self._process_call(job_id, variables)
            except Exception as e:
                logger.error(f"❌ {thread_name} error: {e}")
                self._update_state(job_id, CallState.FAILED, error=str(e))
            finally:
                with self.lock:
                    self.active_count -= 1
                self.call_queue.task_done()

    def _process_call(self, job_id: str, variables: dict):
        """Procesa una llamada individual"""
        job_data = redis_client.hgetall(f"call:{job_id}")
        if not job_data:
            raise ValueError(f"Job {job_id} not found")

        to_number = job_data['to_number']
        from_number = job_data['from_number']
        agent_id = job_data['agent_id']

        # Actualizar a CALLING
        self._update_state(job_id, CallState.CALLING)
        redis_client.hset(f"call:{job_id}", "started_at", datetime.utcnow().isoformat())

        # Importar funciones de retell.py
        from retell import register_call_with_retell_sync, originate_in_asterisk

        # Registrar en Retell
        retell_call_id = register_call_with_retell_sync(
            to_number, from_number, agent_id, variables
        )

        redis_client.hset(f"call:{job_id}", "retell_call_id", retell_call_id)
        update_supabase_status(job_id, to_number, 'calling', retell_call_id)
        logger.info(f"📋 Job {job_id} → Retell {retell_call_id}")

        # ========== ORIGINAR EN ASTERISK (BLOQUEANTE HASTA QUE TERMINE) ==========
        result = originate_in_asterisk(to_number, from_number, retell_call_id)

        # ========== PROCESAR RESULTADO FINAL ==========
        if result.get('detected') and result['reason'] == 'VOICEMAIL':
            # AMD detectó voicemail
            self._update_state(job_id, CallState.VOICEMAIL,
                             amd_result='MACHINE',
                             error=f"Voicemail: {result.get('cause')}")
            logger.info(f"📞 Job {job_id} → VOICEMAIL")

        elif result.get('reason') == 'COMPLETED':
            # ✅ NUEVO: Llamada completada normalmente
            self._update_state(job_id, CallState.COMPLETED)
            logger.info(f"✅ Job {job_id} → COMPLETED (duration: {result.get('hangup_cause')})")

        elif result['success']:
            # Llamada conectó pero todavía activa (timeout de 10min)
            self._update_state(job_id, CallState.ACTIVE)
            logger.info(f"✅ Job {job_id} → STILL ACTIVE after timeout")

        else:
            # Error general
            self._update_state(job_id, CallState.FAILED,
                             error=result.get('error', 'Unknown error'))
            logger.info(f"❌ Job {job_id} → FAILED: {result.get('error')}")

    def _update_state(self, job_id: str, state: CallState, **kwargs):
        """Actualiza estado en Redis Y Supabase"""
        updates = {"state": state.value}

        if 'error' in kwargs:
            updates['error'] = kwargs['error']
        if 'amd_result' in kwargs:
            updates['amd_result'] = kwargs['amd_result']
        if state == CallState.COMPLETED:
            updates['completed_at'] = datetime.utcnow().isoformat()

        # Actualizar Redis
        redis_client.hset(f"call:{job_id}", mapping=updates)

        # 🔥 Actualizar Supabase usando función standalone
        job_data = redis_client.hgetall(f"call:{job_id}")
        if job_data:
            update_supabase_status(
                job_id=job_id,
                phone=job_data.get('to_number'),
                status=state.value,
                retell_call_id=job_data.get('retell_call_id')
            )

    def get_job(self, job_id: str) -> dict:
        """Obtiene job desde Redis"""
        data = redis_client.hgetall(f"call:{job_id}")
        if not data:
            return None
        return data

    def get_active_count(self) -> int:
        """Cuenta llamadas activas"""
        with self.lock:
            return self.active_count

    def get_queue_size(self) -> int:
        """Tamaño de la cola"""
        return self.call_queue.qsize()


# Instancia global
queue_manager = CallQueueManager(max_concurrent=20)