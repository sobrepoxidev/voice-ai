// src\app\api\cola\monitor\route.ts
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const VOICE_AI_URL = process.env.VOICE_AI_SERVICE_URL || 'http://31.97.210.100:8500';
const VOICE_AI_TOKEN = process.env.VOICE_AI_SERVICE_TOKEN!;

// src/app/api/cola/monitor/route.ts
export async function GET() {
  try {
    const queueStatusRes = await fetch(`${VOICE_AI_URL}/api/retell/queue-status`, {
      headers: { Authorization: `Bearer ${VOICE_AI_TOKEN}` },
    });
    const queueStatus = await queueStatusRes.json();

    // Obtener llamadas activas (active=true y status en estados activos)
    const { data: activeCalls, error } = await supabase
      .from('outbound_call_queue')
      .select('*')
      .eq('active', true)  // 🔥 AGREGAR ESTE FILTRO
      .in('status', ['queued', 'calling', 'active'])
      .order('created_at', { ascending: false });

    if (error) throw error;

    // Calcular duración para llamadas activas
    const callsWithDetails = (activeCalls || []).map((call) => {
      let duration = 0;
      if (call.status === 'active' && call.created_at) {
        duration = Math.floor((Date.now() - new Date(call.created_at).getTime()) / 1000);
      }
      return { ...call, duration };
    });

    return NextResponse.json({
      active_calls: queueStatus.active_calls || 0,
      queue_size: queueStatus.queue_size || 0,
      max_concurrent: queueStatus.max_concurrent || 20,
      calls: callsWithDetails,
    });
  } catch (error: any) {
    console.error('Error en monitor:', error);
    return NextResponse.json(
      {
        active_calls: 0,
        queue_size: 0,
        max_concurrent: 20,
        calls: [],
      },
      { status: 200 }
    );
  }
}