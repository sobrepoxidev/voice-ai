// app/api/transferencias/aceptar/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
  try {
    // 1. Verificar auth del agente
    const cookieStore = await cookies();
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
    }

    const agentId = user.id;
    const agentExtension = user.user_metadata.extension || '1002'; // ⚠️ Agregar extension en user_metadata

    // 2. Obtener transfer_id del body
    const { transfer_id } = await request.json();

    // 3. Actualizar DB
    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { error: updateError } = await supabaseAdmin
      .from('call_transfers')
      .update({
        status: 'accepted',
        agent_id: agentId,
        accepted_at: new Date().toISOString()
      })
      .eq('id', transfer_id);

    if (updateError) throw updateError;

    // 4. Ejecutar transferencia via AMI
    const executeResponse = await fetch(
      'http://31.97.210.100:8500/api/retell/execute-transfer',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          transfer_id,
          agent_extension: agentExtension
        })
      }
    );

    const executeResult = await executeResponse.json();

    if (!executeResponse.ok) {
      throw new Error(executeResult.detail || 'Error ejecutando transferencia');
    }

    // 5. Actualizar a "completed" después de bridge
    setTimeout(async () => {
      await supabaseAdmin
        .from('call_transfers')
        .update({
          status: 'completed',
          completed_at: new Date().toISOString()
        })
        .eq('id', transfer_id);
    }, 2000);

    return NextResponse.json({
      success: true,
      transfer_id,
      agent: agentExtension,
      ami_result: executeResult
    });

  } catch (error: any) {
    console.error('Error aceptando transferencia:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}