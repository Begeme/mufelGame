"use client";
import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { motion } from "framer-motion";
import { FiAlertCircle } from "react-icons/fi";

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [userData, setUserData] = useState<{ username: string; email: string } | null>(null);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setUserData(null);

    try {
      if (isLogin) {
        // LOGIN
        const { error, data } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw new Error("Correo o contraseña incorrectos.");

        const { user } = data;
        if (!user) throw new Error("Usuario no encontrado.");

        // Obtener datos desde tabla users
        const { data: userInfo, error: userError } = await supabase
          .from("users")
          .select("username, email")
          .eq("id", user.id)
          .single();

        if (userError) throw new Error("No se pudieron obtener los datos del usuario.");
        setUserData(userInfo);
      } else {
        // REGISTRO
        const { data, error } = await supabase.auth.signUp({ email, password });

        console.log("🔁 Resultado de signUp:", data);

        if (error) throw new Error(error.message || "Error al registrarse.");

        // En caso de que no llegue el user inmediatamente (por email confirmation), intentamos obtenerlo
        let userId = data?.user?.id;

        if (!userId) {
          const {
            data: sessionData,
            error: sessionError,
          } = await supabase.auth.getSession();
          if (sessionError || !sessionData.session?.user.id) {
            throw new Error("No se pudo obtener el ID del usuario.");
          }
          userId = sessionData.session.user.id;
        }

        console.log("🆔 ID del usuario:", userId);

        // Guardar en tabla personalizada
        const insert = await supabase.from("users").insert([
          {
            id: userId,
            username,
            email,
          },
        ]);

        if (insert.error) {
          console.error("❌ Error al insertar en la base de datos:", insert.error);
          throw new Error("Error al guardar en la base de datos.");
        }

        console.log("✅ Insert exitoso:", insert.data);

        setUserData({ username, email });
      }
    } catch (err) {
      if (err instanceof Error) {
        console.error("🚨 Error atrapado:", err.message);
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-800 p-8 rounded-lg shadow-lg w-96 text-white"
      >
        <h2 className="text-2xl font-bold text-center mb-6">
          {isLogin ? "Iniciar Sesión" : "Regístrate"}
        </h2>

        {error && (
          <p className="text-red-500 text-center flex items-center justify-center mb-4">
            <FiAlertCircle className="mr-2" /> {error}
          </p>
        )}

        {!userData ? (
          <form className="space-y-4" onSubmit={handleAuth} autoComplete="off">
            {!isLogin && (
              <div>
                <label className="block text-gray-300">Nombre de usuario</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Tu nombre"
                  className="w-full px-4 py-2 rounded bg-gray-700 text-white focus:outline-none"
                  required
                />
              </div>
            )}

            <div>
              <label className="block text-gray-300">Correo Electrónico</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="correo@example.com"
                className="w-full px-4 py-2 rounded bg-gray-700 text-white focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-gray-300">Contraseña</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********"
                className="w-full px-4 py-2 rounded bg-gray-700 text-white focus:outline-none"
                required
              />
            </div>

            <motion.button
              whileTap={{ scale: 0.95 }}
              disabled={loading}
              className={`w-full font-bold py-2 px-4 rounded transition ${
                loading
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-yellow-500 hover:bg-yellow-400 text-black"
              }`}
            >
              {loading ? "Cargando..." : isLogin ? "Iniciar Sesión" : "Crear Cuenta"}
            </motion.button>
          </form>
        ) : (
          <div className="mt-6 text-center">
            <h3 className="text-xl mb-2">🎉 Registro exitoso</h3>
            <p className="text-white">
              Bienvenido, <strong>{userData.username}</strong>
              <br />
              Tu correo es: {userData.email}
            </p>
          </div>
        )}

        <p className="text-center text-gray-300 mt-4">
          {isLogin ? "¿No tienes cuenta?" : "¿Ya tienes cuenta?"}
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setError("");
              setUserData(null);
            }}
            className="ml-2 text-yellow-400 hover:text-yellow-300 transition"
          >
            {isLogin ? "Regístrate" : "Inicia Sesión"}
          </button>
        </p>
      </motion.div>
    </div>
  );
}
