// app/api/retell/webhook-transfer/route.ts
// ✅ VERSIÓN CON VARIABLES DINÁMICAS PARA RETELL

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const {
      call_id,
      function_name,
      function_arguments
    } = body;

    if (function_name === 'request_human_transfer') {
      const { reason, priority = 'normal' } = function_arguments;

      // 1. Obtener info de la llamada
      const callInfo = await fetch(
        `http://31.97.210.100:8500/api/retell/call-info/${call_id}`
      ).then(r => r.json());

      const phone = callInfo.to_number || callInfo.from_number;

      // 2. Crear registro de transferencia
      const transferId = `trans_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      const { error } = await supabase
        .from('call_transfers')
        .insert({
          id: transferId,
          retell_call_id: call_id,
          phone: phone,
          reason: reason,
          priority: priority,
          status: 'pending'
        });

      if (error) {
        console.error('❌ Error insertando transferencia:', error);
        return NextResponse.json({
          result: {
            success: false,
            message: 'Error al solicitar transferencia. Intenta de nuevo.'
          }
        });
      }

      // 3. Preparar transferencia en voice-ai-service
      await fetch('http://31.97.210.100:8500/api/retell/prepare-transfer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          transfer_id: transferId,
          retell_call_id: call_id,
          phone: phone
        })
      });

      console.log(`✅ Transfer ${transferId} creada para call ${call_id}`);

      // 4. ✨ IMPORTANTE: Retornar variables dinámicas a Retell
      // Esto permite que la IA use {{transfer_status}} en el prompt
      return NextResponse.json({
        result: {
          transfer_id: transferId,
          transfer_status: 'pending',
          message: 'Solicitud de transferencia enviada a los agentes'
        },
        // ✨ Response variables que Retell puede usar
        response_variables: {
          transfer_id: transferId,
          transfer_status: 'pending'
        }
      });
    }

    return NextResponse.json({ result: 'ok' });
  } catch (error: any) {
    console.error('❌ Error en webhook transfer:', error);
    return NextResponse.json({
      result: {
        success: false,
        message: 'Error procesando solicitud de transferencia'
      }
    }, { status: 500 });
  }
}