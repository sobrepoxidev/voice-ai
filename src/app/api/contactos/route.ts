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
  const type = searchParams.get('type') || 'raw'; // raw, active, inactive
  const search = searchParams.get('search');

  const offset = (page - 1) * limit;

  let tableName = 'outbound_call_contacts';
  if (type === 'active') tableName = 'active_contacts';
  if (type === 'inactive') tableName = 'inactive_contacts';

  let query = supabase
    .from(tableName)
    .select('*', { count: 'exact' });

  // Filter by 'called' only applies to raw and active (if active has that column)
  // outbound_call_contacts has 'called'
  // active_contacts does not have 'called' in my SQL script, but has 'times_called'.
  // I should probably add 'called' boolean to active_contacts or just use times_called > 0
  
  if (tableName === 'outbound_call_contacts' && called !== null) {
    query = query.eq('called', called === 'true');
  }

  if (search) {
    // Search in phone or user_name
    query = query.or(`phone.ilike.%${search}%,user_name.ilike.%${search}%`);
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