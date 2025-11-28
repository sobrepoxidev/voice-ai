// src/app/dashboard/layout.tsx
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import DashboardNav from "@/components/layout/DashboardNav";
import AgentStatus from "@/components/layout/AgentStatus";

export default async function QueueLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  console.log("🔐 Queue layout - verificando sesión");
  
  const cookieStore = await cookies();

  // Listar todas las cookies
  const allCookies = cookieStore.getAll();
  console.log("🍪 Cookies disponibles:", allCookies.map(c => c.name));

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          // Server Components cannot set cookies. Middleware handles session refresh.
        },
      },
    }
  );

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  console.log("👤 User:", user ? user.email : "NULL");
  console.log("❌ Error:", error ? error.message : "NULL");

  if (error) {
    console.error("Error en getUser:", error);
  }

  if (!user) {
    console.log("🚫 No user found, redirecting to login");
    redirect("/login");
  }

  const nombre = user.user_metadata?.nombre ?? "Usuario";

  return (
    <div className="flex h-screen flex-col md:flex-row bg-gray-50">
      <DashboardNav userName={nombre} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AgentStatus userName={nombre} userId={user.id} />
        <main className="flex-1 overflow-auto p-2 sm:p-6">{children}</main>
      </div>
    </div>
  );
}