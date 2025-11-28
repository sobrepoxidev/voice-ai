import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

type RetellAgent = {
  id: number;
  created_at: string;
  language: string | null;
  name: string | null;
  description: string | null;
  call_direction: string | null;
  agent_id: string | null;
};

export async function GET() {
  const { data, error } = await supabase
    .from('retell_agents')
    .select('id,created_at,language,name,description,call_direction,agent_id')
    .order('created_at', { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const agents: RetellAgent[] = (data as RetellAgent[]) || [];
  return NextResponse.json({ agents });
}

