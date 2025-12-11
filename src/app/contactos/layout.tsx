// src/app/dashboard/layout.tsx

import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import DashboardNav from '@/components/layout/DashboardNav';
import AgentStatus from '@/components/layout/AgentStatus';

export default async function ContactosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: async () => cookieStore.getAll(),
        setAll: async () => {
          // ✅ VACÍO - No podemos setear cookies en un Server Component
          // El cliente o middleware manejarán el refresh de tokens
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const nombre = user.user_metadata?.nombre ?? 'Usuario';

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Navegación Lateral */}
      <DashboardNav userName={nombre} />

      {/* Contenido Principal */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header con estado del agente */}
        <AgentStatus userName={nombre} userId={user.id} />

        {/* Área de contenido */}
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  );
}