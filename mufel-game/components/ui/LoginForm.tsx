"use client";
import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState<{ username: string; email: string } | null>(null);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw new Error("Correo o contraseña incorrectos.");

      const userId = data.user?.id;
      if (!userId) throw new Error("No se pudo obtener el ID del usuario.");

      const { data: userInfo, error: fetchError } = await supabase
        .from("users")
        .select("username, email")
        .eq("id", userId)
        .single();

      if (fetchError) throw new Error("No se pudieron obtener los datos del usuario.");
      setUserData(userInfo);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 text-white">
      <h2 className="text-2xl font-bold mb-4">Iniciar sesión</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      {!userData ? (
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 bg-gray-700 rounded"
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 bg-gray-700 rounded"
            required
          />
          <button
            type="submit"
            className="w-full bg-yellow-500 text-black font-bold py-2 rounded hover:bg-yellow-400"
          >
            Iniciar sesión
          </button>
        </form>
      ) : (
        <div className="mt-4">
          <p>👋 Bienvenido, <strong>{userData.username}</strong></p>
          <p>📧 Tu correo: {userData.email}</p>
        </div>
      )}
    </div>
  );
}
