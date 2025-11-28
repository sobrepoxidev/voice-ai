import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
  try {
    const { contacts } = await request.json();
    
    if (!Array.isArray(contacts) || contacts.length === 0) {
      return NextResponse.json(
        { error: 'Se requiere array de contactos' },
        { status: 400 }
      );
    }

    // Validar formato
    const validContacts = contacts.map((c) => {
      const phone = c.phone?.startsWith('+') ? c.phone : `+${c.phone}`;
      return {
        phone,
        user_name: c.user_name || null,
        locale: c.locale || 'es',
      };
    });

    // Insertar (ignorar duplicados)
    const { data, error } = await supabase
      .from('outbound_call_contacts')
      .upsert(validContacts, {
        onConflict: 'phone',
        ignoreDuplicates: true,
      })
      .select();

    if (error) throw error;

    return NextResponse.json({
      success: true,
      imported: data?.length || 0,
      total: contacts.length,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}