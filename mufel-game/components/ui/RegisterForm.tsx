"use client";
import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    try {
      // Registro en Auth con metadata
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { username }, // metadata guardado en Auth
        },
      });

      if (signUpError) throw new Error(signUpError.message);
      if (!data.user) throw new Error("No se pudo registrar el usuario.");

      const userId = data.user.id;

      // Insert en tabla personalizada
      const { error: insertError } = await supabase.from("users").insert([
        {
          id: userId,
          username,
          email,
        },
      ]);

      if (insertError) throw new Error("Error al guardar en la base de datos.");

      console.clear();
      console.log("✅ Usuario registrado:");
      console.log("📧 Email:", email);
      console.log("👤 Username:", username);
      console.log("🆔 ID:", userId);

      setSuccess(true);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
        console.error("❌ Error:", err.message);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-gray-900 rounded-2xl shadow-xl p-8 border border-gray-700">
        <h2 className="text-3xl font-bold text-center text-white mb-6">
          Crear cuenta
        </h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {success && (
          <p className="text-green-400 text-center mb-4">
            🎉 Registro exitoso, revisa la consola
          </p>
        )}

        <form onSubmit={handleRegister} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Nombre de usuario
            </label>
            <input
              type="text"
              placeholder="ej: brian_dev"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-yellow-500 focus:outline-none"
              required
            />
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
            Registrarse
          </button>
        </form>
        <p className="text-center text-gray-400 mt-4">
          ¿Ya tienes cuenta?{" "}
          <a
            href="/login"
            className="text-yellow-400 hover:text-yellow-300 font-medium"
          >
            Inicia sesión
          </a>
        </p>
        {success && (
          <div className="text-green-400 text-center mb-4">
            ✅ Registro exitoso. Por favor confirma tu email antes de iniciar
            sesión.
            <br />
            <span className="text-sm text-gray-400">
              Revisa tu bandeja de entrada o spam 📩
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
