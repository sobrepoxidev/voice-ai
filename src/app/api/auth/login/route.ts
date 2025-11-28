// app/api/auth/login/route.ts
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  console.log("POST /api/auth/login");
  const { email, password } = await req.json();

  const cookieStore = await cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            console.log(`✅ SET cookie: ${name}`);
            cookieStore.set(name, value, options);
          });
        },
      },
    }
  );

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error("❌ Login error:", error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  console.log("✅ Login exitoso para:", data.user?.email);
  
  // ⬇️ Solo retorna success, NO hagas redirect aquí
  return NextResponse.json({ 
    success: true,
    user: data.user?.email 
  });
}