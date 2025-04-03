"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabaseClient";
import { useUser } from "../../context/UserContext";
import toast from "react-hot-toast";
import { FiLoader } from "react-icons/fi";
import Link from "next/link";

export default function LoginForm() {
  const router = useRouter();
  const userContext = useUser();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!isEmailValid) {
        toast.error("Introduce un correo electrónico válido.");
        setLoading(false);
        return;
      }

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      // 🧠 Comprobar si el error es por email no verificado
      if (error?.message?.toLowerCase().includes("email not confirmed")) {
        toast(
          "Email no verificado.",
          { icon: "✉️" }
        );
        setLoading(false);
        return;
      }

      if (error) {
        toast.error("Email o contraseña incorrectos.");
        setLoading(false);
        return;
      }

      const user = data.user;
      const userId = user.id;

      // Inserta en la tabla 'users' si no existe
      const { data: userExists } = await supabase
        .from("users")
        .select("id")
        .eq("id", userId)
        .maybeSingle();

      if (!userExists) {
        await supabase.from("users").insert([
          {
            id: userId,
            email: user.email,
            username: user.user_metadata?.username || "usuario",
          },
        ]);
      }

      if (userContext !== "loading") {
        await userContext.refreshUser();
      }

      router.push("/download");
      router.refresh();
    } catch (err) {
      toast.error("Ocurrió un error al iniciar sesión.");
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-gray-900 rounded-2xl shadow-xl p-8 border border-gray-700 transition-transform duration-500 hover:scale-[1.01]">
        <h2 className="text-3xl font-bold text-center text-white mb-6">
          Iniciar sesión
        </h2>

        <form
          onSubmit={handleLogin}
          className="space-y-5"
        >
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
            disabled={loading}
            className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-2 px-4 rounded-lg transition duration-200 disabled:opacity-50 flex justify-center items-center gap-2"
          >
            {loading && <FiLoader className="animate-spin" />} Iniciar sesión
          </button>
        </form>

        <p className="text-center text-sm text-yellow-400 mt-3">
          <Link href="/forgotPassword" className="hover:underline">
            ¿Olvidaste tu contraseña?
          </Link>
        </p>

        <p className="text-center text-sm text-gray-400 mt-4">
          ¿No tienes cuenta?{" "}
          <Link
            href="/register"
            className="text-yellow-400 hover:text-yellow-300 font-semibold"
          >
            Regístrate
          </Link>
        </p>
      </div>
    </div>
  );
}
