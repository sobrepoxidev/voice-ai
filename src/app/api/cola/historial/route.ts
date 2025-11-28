// src\app\api\cola\historial\route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// src/app/api/cola/historial/route.ts
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const limit = parseInt(searchParams.get('limit') || '50');

  try {
    const { data, error } = await supabase
      .from('outbound_call_queue')
      .select('*')
      .neq('active', true) // 🔥 Traer todo lo que NO esté activo
      .order('updated_at', { ascending: false })
      .limit(limit);

    if (error) throw error;

    return NextResponse.json({
      calls: data || [],
      total: data?.length || 0,
    });
  } catch (error: any) {
    console.error('Error en historial:', error);
    return NextResponse.json({ calls: [], total: 0 }, { status: 200 });
  }
}