"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import toast from "react-hot-toast";
import { FiLoader } from "react-icons/fi";

export default function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [checkingUsername, setCheckingUsername] = useState(false);

  const isUsernameValid = username.length >= 3 && username.length <= 20 && !username.includes(" ");
  const isPasswordValid = password.length >= 8 && password.length <= 64;
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && !email.endsWith(".xyz") && !email.endsWith(".ru");

  const canSubmit = email && isUsernameValid && isPasswordValid && isEmailValid && !checkingUsername;

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setCheckingUsername(true);

      // Verificar si el username ya existe
      const { data: existingUser } = await supabase
        .from("users")
        .select("id")
        .eq("username", username)
        .maybeSingle();

      if (existingUser) {
        toast.error("El nombre de usuario ya está en uso.");
        setCheckingUsername(false);
        return;
      }

      // Verificar si el email ya existe
      const { data: existingEmail } = await supabase
        .from("users")
        .select("id")
        .eq("email", email)
        .maybeSingle();

      if (existingEmail) {
        toast.error("Este correo electrónico ya está registrado.");
        setCheckingUsername(false);
        return;
      }

      setCheckingUsername(false);

      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { username },
          emailRedirectTo: 'http://localhost:3000/login',
        },
      });
      

      if (signUpError) {
        toast.error("Error al registrar el usuario.");
        console.error("Auth error:", signUpError.message);
        return;
      }

      if (data.user?.id) {
        await supabase.from("users").insert([
          {
            id: data.user.id,
            username,
            email,
          },
        ]);
      }

      toast.success("Verifica tu correo electrónico.");
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
        console.error("❌ Error:", err.message);
      }
    } finally {
      setCheckingUsername(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-gray-900 rounded-2xl shadow-xl p-8 border border-gray-700">
        <h2 className="text-3xl font-bold text-center text-white mb-6">
          Crear cuenta
        </h2>

        <form onSubmit={handleRegister} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Nombre de usuario
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="ej: brian_dev"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 pr-10 rounded-lg bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                required
                maxLength={20}
              />
              {checkingUsername && (
                <FiLoader className="absolute right-3 top-1/2 -translate-y-1/2 animate-spin text-yellow-500" size={18} />
              )}
            </div>
            {!isUsernameValid && username && (
              <p className="text-xs text-red-400 mt-1">
                El nombre debe tener entre 3 y 20 caracteres y no incluir espacios.
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Correo electrónico
            </label>
            <input
              type="email"
              placeholder="ej: brian@mail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-yellow-500 focus:outline-none"
              required
            />
            {!isEmailValid && email && (
              <p className="text-xs text-red-400 mt-1">
                Introduce un correo electrónico válido.
              </p>
            )}
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
              minLength={8}
              maxLength={64}
            />
            {!isPasswordValid && password && (
              <p className="text-xs text-red-400 mt-1">
                La contraseña debe tener entre 8 y 64 caracteres.
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={!canSubmit}
            className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-2 px-4 rounded-lg transition duration-200 disabled:opacity-50"
          >
            Registrarse
          </button>
        </form>

        <p className="text-center text-gray-400 mt-4">
          ¿Ya tienes cuenta? {" "}
          <a
            href="/login"
            className="text-yellow-400 hover:text-yellow-300 font-medium"
          >
            Inicia sesión
          </a>
        </p>
      </div>
    </div>
  );
}