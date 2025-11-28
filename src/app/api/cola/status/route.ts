//src\app\api\cola\status\route.ts
import { NextResponse } from 'next/server';

const VOICE_AI_URL = process.env.VOICE_AI_SERVICE_URL || 'http://31.97.210.100:8500';
const VOICE_AI_TOKEN = process.env.VOICE_AI_SERVICE_TOKEN!;

export async function GET() {
  try {
    const response = await fetch(`${VOICE_AI_URL}/api/retell/queue-status`, {
      headers: {
        Authorization: `Bearer ${VOICE_AI_TOKEN}`,
      },
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Error obteniendo estado:', error);
    return NextResponse.json(
      { active_calls: 0, queue_size: 0, max_concurrent: 20 },
      { status: 200 }
    );
  }
}