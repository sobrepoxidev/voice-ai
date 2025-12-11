import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { contacts } = await request.json();

    if (!contacts || !Array.isArray(contacts)) {
      return NextResponse.json({ error: 'contacts array required' }, { status: 400 });
    }

    if (contacts.length > 20) {
      return NextResponse.json({ error: 'Max 20 contacts' }, { status: 400 });
    }

    // Extract phones
    const phones = contacts.map((c: string | { phone: string }) => typeof c === 'string' ? c : c.phone);

    // Call voice-ai-service
    const serviceUrl = process.env.VOICE_AI_SERVICE_URL || 'http://127.0.0.1:8500';
    const token = process.env.VOICE_AI_SERVICE_TOKEN;

    const res = await fetch(`${serviceUrl}/api/retell/batch-classify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ phones })
    });

    if (!res.ok) {
      const txt = await res.text();
      console.error('Service error:', txt);
      return NextResponse.json({ error: 'Error en servicio de clasificación' }, { status: 500 });
    }

    const data = await res.json();
    return NextResponse.json(data);

  } catch (error) {
    console.error('Error initiating classification:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
