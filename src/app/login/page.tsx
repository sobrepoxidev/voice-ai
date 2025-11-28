'use client';

import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: any) {
    e.preventDefault();
    setLoading(true);
    console.log("User trying to login with:", email);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Credenciales incorrectas");
        setLoading(false);
        return;
      }

      console.log("✅ Login exitoso, redirigiendo...");
      
      // ⬇️ Espera un momento para asegurar que las cookies se propaguen
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // ⬇️ Usa replace para forzar navegación completa
      window.location.replace("/dashboard");
      
    } catch (error) {
      console.error("Error:", error);
      alert("Error de conexión");
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 text-gray-900">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 md:p-10 rounded-xl shadow-xl w-full max-w-sm"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>

        <label className="block mb-2 text-sm text-gray-700">Correo</label>
        <input
          type="email"
          className="w-full p-2 border rounded mb-4"
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
          required
        />

        <label className="block mb-2 text-sm text-gray-700">Contraseña</label>
        <input
          type="password"
          className="w-full p-2 border rounded mb-6"
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
          required
        />

        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded-lg disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Entrando..." : "Entrar"}
        </button>
      </form>
    </div>
  );
}