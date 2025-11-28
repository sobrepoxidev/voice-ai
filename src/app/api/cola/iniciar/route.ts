//src\app\api\cola\iniciar\route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';


// Modificar para aceptar from_number y contacts con user_name
export async function POST(request: NextRequest) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  try {
    const { contacts, phones, from_number, agent_id } = await request.json();

    // Backward compatibility: construct contacts array if only 'phones' is provided
    let targets: { phone: string; user_name?: string }[] = [];

    if (contacts && Array.isArray(contacts)) {
        targets = contacts;
    } else if (phones && Array.isArray(phones)) {
        targets = phones.map((p: string) => ({ phone: p, user_name: 'Cliente' }));
    }

    if (targets.length === 0) {
      return NextResponse.json({ error: 'contacts or phones array required' }, { status: 400 });
    }

    if (targets.length > 20) {
      return NextResponse.json({ error: 'Max 20 contacts' }, { status: 400 });
    }

    // Preparar payload para voice-ai-service
    const calls = targets.map((contact) => ({
      to_number: contact.phone,
      from_number: from_number || '+18887719555',
      agent_id: (typeof agent_id === 'string' && agent_id.length > 0)
        ? agent_id
        : process.env.RETELL_AGENT_ID_DEFAULT!,
      retell_llm_dynamic_variables: {
        user_name: contact.user_name || 'Cliente',
        locale: contact.phone.startsWith('+506') ? 'es' : 'en'
      }
    }));

    // Llamar a voice-ai-service
    const voiceRes = await fetch(
      `${process.env.VOICE_AI_SERVICE_URL}/api/retell/batch-call`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.VOICE_AI_SERVICE_TOKEN}`,
        },
        body: JSON.stringify(calls),
      }
    );

    if (!voiceRes.ok) {
      throw new Error('voice-ai-service failed');
    }

    const voiceData = await voiceRes.json();

    // Insertar en Supabase
    const callRecords = targets.map((contact, idx) => ({
      phone: contact.phone,
      user_name: contact.user_name || 'Cliente',
      from_number: from_number || '+18887719555',
      job_id: voiceData.job_ids[idx],
      status: 'queued',
      retell_call_id: null,
      active: true,
      // created_at y updated_at se generan automáticamente en la DB
    }));

    const { error: insertError } = await supabase
      .from('outbound_call_queue')
      .insert(callRecords);

    if (insertError) throw insertError;

    // Actualizar contactos
    for (const contact of targets) {
      const { data: existingContact } = await supabase
        .from('outbound_call_contacts')
        .select('times_called')
        .eq('phone', contact.phone)
        .single();

      await supabase
        .from('outbound_call_contacts')
        .update({
          called: true,
          times_called: (existingContact?.times_called || 0) + 1,
        })
        .eq('phone', contact.phone);
    }

    return NextResponse.json({
      success: true,
      queued: voiceData.queued,
      job_ids: voiceData.job_ids,
      active_calls: voiceData.active_calls,
      queue_size: voiceData.queue_size,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error iniciando llamadas:', message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
