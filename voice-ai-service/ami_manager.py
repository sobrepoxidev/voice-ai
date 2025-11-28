# /opt/voice-ai-service/ami_manager.py
import asyncio
import logging
from panoramisk import Manager
import os

logger = logging.getLogger(__name__)

AMI_HOST = os.getenv("AMI_HOST", "31.97.210.100")
AMI_PORT = int(os.getenv("AMI_PORT", 5038))
AMI_USER = os.getenv("AMI_USER", "omnileads")
AMI_PASS = os.getenv("AMI_PASS")


class CallResult:
    def __init__(self):
        self.amd_detected = False
        self.is_voicemail = False
        self.call_answered = False
        self.call_completed = False
        self.hangup_cause = None
        self.error = None


async def originate_call_async(to_number: str, from_number: str, retell_call_id: str):
    """
    Origina llamada usando panoramisk y espera eventos en tiempo real
    
    Returns:
        {
            'success': bool,
            'reason': 'VOICEMAIL' | 'ACTIVE' | 'COMPLETED' | 'ERROR',
            'hangup_cause': str
        }
    """
    clean_num = to_number.lstrip("+")
    result = CallResult()
    manager = Manager()
    
    async def on_user_event(manager, event):
        """AMD Detection"""
        if event.get('UserEvent') == 'AMDDetection':
            logger.info(f"🤖 AMD for {retell_call_id}: {event}")
            result.amd_detected = True
            result.is_voicemail = True
    
    async def on_newstate(manager, event):
        """Detecta cuando la llamada es contestada"""
        channel = event.get('Channel', '')
        state = event.get('ChannelStateDesc', '')
        
        if clean_num in channel and state == 'Up':
            logger.info(f"✅ Call answered: {retell_call_id}")
            result.call_answered = True
    
    async def on_hangup(manager, event):
        """Detecta cuando la llamada termina"""
        channel = event.get('Channel', '')
        cause = event.get('Cause-txt', 'Unknown')
        
        if clean_num in channel or retell_call_id in str(event):
            logger.info(f"📞 Hangup: {retell_call_id} - {cause}")
            result.call_completed = True
            result.hangup_cause = cause
    
    try:
        # Conectar
        await manager.connect(AMI_HOST, AMI_PORT)
        await manager.login(AMI_USER, AMI_PASS)
        
        # Registrar listeners
        manager.register_event('UserEvent', on_user_event)
        manager.register_event('Newstate', on_newstate)
        manager.register_event('Hangup', on_hangup)
        
        # Originar llamada
        logger.info(f"📡 Originating: {to_number} ({retell_call_id})")
        action = manager.send_action({
            'Action': 'Originate',
            'Channel': f'Local/{clean_num}@retell-originate',
            'Context': 'retell-bridge',
            'Exten': 's',
            'Priority': '1',
            'Timeout': '60000',
            'CallerID': from_number,
            'Variable': [
                f'TO_NUMBER={to_number}',
                f'FROM_NUMBER={from_number}',
                f'RETELL_CALL_ID={retell_call_id}'
            ],
            'Async': 'true'
        })
        
        # Esperar respuesta del originate
        response = await action
        logger.info(f"Originate response: {response}")
        
        # ========== ESPERAR AMD (8 segundos) ==========
        logger.info(f"⏳ AMD check ({retell_call_id})...")
        await asyncio.sleep(8)
        
        if result.amd_detected and result.is_voicemail:
            logger.info(f"❌ VOICEMAIL detected ({retell_call_id})")
            await manager.close()
            return {
                'success': False,
                'reason': 'VOICEMAIL',
                'hangup_cause': 'AMD'
            }
        
        # ========== ESPERAR QUE CONTESTE (hasta 52s más) ==========
        logger.info(f"📞 Waiting for answer ({retell_call_id})...")
        for i in range(260):  # 52 segundos
            await asyncio.sleep(0.2)
            
            if result.call_answered:
                logger.info(f"✅ ACTIVE ({retell_call_id})")
                break
            
            if result.amd_detected and result.is_voicemail:
                logger.info(f"❌ Late VOICEMAIL ({retell_call_id})")
                await manager.close()
                return {
                    'success': False,
                    'reason': 'VOICEMAIL',
                    'hangup_cause': 'AMD_LATE'
                }
        
        if not result.call_answered:
            # No contestó en 60s total
            logger.warning(f"⏰ No answer ({retell_call_id})")
            await manager.close()
            return {
                'success': False,
                'reason': 'NO_ANSWER',
                'hangup_cause': 'TIMEOUT'
            }
        
        # ========== LLAMADA ACTIVA - ESPERAR HANGUP ==========
        logger.info(f"🎙️ Call active, waiting for hangup ({retell_call_id})...")
        
        # Esperar hasta 15 minutos
        for i in range(4500):  # 15 minutos
            await asyncio.sleep(0.2)
            
            if result.call_completed:
                logger.info(f"✅ COMPLETED ({retell_call_id}): {result.hangup_cause}")
                await manager.close()
                return {
                    'success': True,
                    'reason': 'COMPLETED',
                    'hangup_cause': result.hangup_cause
                }
        
        # Timeout después de 15min
        logger.warning(f"⏰ Call timeout after 15min ({retell_call_id})")
        await manager.close()
        return {
            'success': True,
            'reason': 'TIMEOUT',
            'hangup_cause': 'LONG_CALL'
        }
        
    except Exception as e:
        logger.error(f"❌ AMI Error ({retell_call_id}): {e}")
        result.error = str(e)
        try:
            await manager.close()
        except:
            pass
        return {
            'success': False,
            'reason': 'ERROR',
            'hangup_cause': str(e)
        }


def originate_call_sync(to_number: str, from_number: str, retell_call_id: str):
    """
    Wrapper síncrono para usar en threads
    """
    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)
    try:
        return loop.run_until_complete(
            originate_call_async(to_number, from_number, retell_call_id)
        )
    finally:
        loop.close()


