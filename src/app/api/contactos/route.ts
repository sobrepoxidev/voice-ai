import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const limit = parseInt(searchParams.get('limit') || '50');
  const page = parseInt(searchParams.get('page') || '1');
  const called = searchParams.get('called');

  const offset = (page - 1) * limit;

  let query = supabase
    .from('outbound_call_contacts')
    .select('*', { count: 'exact' });

  if (called !== null) {
    query = query.eq('called', called === 'true');
  }

  const { data, error, count } = await query
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    contacts: data,
    total: count,
    page,
    pages: Math.ceil((count || 0) / limit),
  });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { phone, user_name, locale = 'es' } = body;

  if (!phone) {
    return NextResponse.json({ error: 'phone es requerido' }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('outbound_call_contacts')
    .insert({ phone, user_name, locale })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}