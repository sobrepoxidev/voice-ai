import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
  try {
    const { phone } = await request.json();

    if (!phone) {
      return NextResponse.json({ error: 'Phone is required' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('outbound_call_contacts')
      .update({ called: false })
      .eq('phone', phone)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ success: true, contact: data });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error resetting contact:', message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
