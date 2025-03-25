"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabaseClient";
import { useUser } from "../../context/UserContext";

export default function LoginForm() {
  const router = useRouter();
  const userContext = useUser(); // 👈 aquí

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [unconfirmed, setUnconfirmed] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setUnconfirmed(false);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw new Error(error.message);

      if (!data.session) {
        setUnconfirmed(true);
        return;
      }

      const user = data.user;
      const userId = user.id;

      const { data: userExists } = await supabase
        .from("users")
        .select("id")
        .eq("id", userId)
        .maybeSingle();

      if (!userExists) {
        const { error: insertError } = await supabase.from("users").insert([
          {
            id: userId,
            email: user.email,
            username: user.user_metadata?.username || "usuario",
          },
        ]);

        if (insertError && insertError.code !== "23505") {
          throw new Error("No se pudo guardar el usuario en la base de datos.");
        }
      }

      if (userContext !== "loading") {
        await userContext.refreshUser(); // ✅ refresca el contexto
      }

      router.push("/download");
      router.refresh(); // 🔄 fuerza re-render con el usuario cargado
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-gray-900 rounded-2xl shadow-xl p-8 border border-gray-700">
        <h2 className="text-3xl font-bold text-center text-white mb-6">
          Iniciar sesión
        </h2>

        {error && <p className="text-red-500 text-center mb-4">❌ {error}</p>}
        {unconfirmed && (
          <p className="text-yellow-400 text-center mb-4">
            ✉️ Aún no has confirmado tu correo. Revisa tu bandeja de entrada o
            spam.
          </p>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Correo electrónico
            </label>
            <input
              type="email"
              placeholder="ej: usuario@mail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-yellow-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Contraseña
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-yellow-500 focus:outline-none"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-2 px-4 rounded-lg transition duration-200"
          >
            Iniciar sesión
          </button>
        </form>

        <p className="text-center text-sm text-gray-400 mt-4">
          ¿No tienes cuenta?{" "}
          <a
            href="/register"
            className="text-yellow-400 hover:text-yellow-300 font-semibold"
          >
            Regístrate
          </a>
        </p>
      </div>
    </div>
  );
}
