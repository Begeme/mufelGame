"use client";
import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import { motion } from "framer-motion";
import { FiAlertCircle } from "react-icons/fi";

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({
    email: "",
    password: "",
    username: "",
  });

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex para validar email

  useEffect(() => {
    validateFields();
  }, [email, password, username]);

  const validateFields = async () => {
    const errors = { email: "", password: "", username: "" };
    let isValid = true;

    if (!email.trim()) {
      errors.email = "Introduce una dirección de correo válida.";
      isValid = false;
    } else if (!emailRegex.test(email)) {
      errors.email = "Formato de email incorrecto.";
      isValid = false;
    }

    if (!password.trim()) {
      errors.password = "La contraseña es obligatoria.";
      isValid = false;
    } else if (password.length < 6) {
      errors.password = "Debe tener al menos 6 caracteres.";
      isValid = false;
    }

    if (!isLogin) {
      if (!username.trim()) {
        errors.username = "El nombre de usuario es obligatorio.";
        isValid = false;
      } else {
        const { data: existingUser } = await supabase
          .from("users")
          .select("username")
          .eq("username", username)
          .single();

        if (existingUser) {
          errors.username = "Este nombre de usuario ya está en uso.";
          isValid = false;
        }
      }
    }

    setFieldErrors(errors);
    return isValid;
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const valid = await validateFields();
    if (!valid) {
      setLoading(false);
      return;
    }

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          throw new Error("Correo o contraseña incorrectos. Inténtalo de nuevo.");
        }
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { username } },
        });

        if (error) {
          throw new Error(error.message || "Error al registrarse.");
        }
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Ocurrió un error inesperado.");
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
          <p className="text-red-500 text-center flex items-center justify-center">
            <FiAlertCircle className="mr-2" /> {error}
          </p>
        )}

        <form className="space-y-4" onSubmit={handleAuth}>
          {!isLogin && (
            <div>
              <label className="block text-gray-300">Nombre de usuario</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Tu nombre"
                className="w-full px-4 py-2 rounded bg-gray-700 text-white focus:outline-none"
              />
              {fieldErrors.username && (
                <p className="text-red-500 text-sm flex items-center mt-1">
                  <FiAlertCircle className="mr-1" /> {fieldErrors.username}
                </p>
              )}
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
            />
            {fieldErrors.email && (
              <p className="text-red-500 text-sm flex items-center mt-1">
                <FiAlertCircle className="mr-1" /> {fieldErrors.email}
              </p>
            )}
          </div>

          <div>
            <label className="block text-gray-300">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              className="w-full px-4 py-2 rounded bg-gray-700 text-white focus:outline-none"
            />
            {fieldErrors.password && (
              <p className="text-red-500 text-sm flex items-center mt-1">
                <FiAlertCircle className="mr-1" /> {fieldErrors.password}
              </p>
            )}
          </div>

          <motion.button
            whileTap={{ scale: 0.95 }}
            disabled={!isLogin ? !email || !password || !username || !!fieldErrors.username : !email || !password}
            className={`w-full font-bold py-2 px-4 rounded transition ${
              !isLogin
                ? !email || !password || !username || !!fieldErrors.username
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-yellow-500 hover:bg-yellow-400 text-black"
                : !email || !password
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-yellow-500 hover:bg-yellow-400 text-black"
            }`}
          >
            {loading ? "Cargando..." : isLogin ? "Iniciar Sesión" : "Crear Cuenta"}
          </motion.button>
        </form>

        <p className="text-center text-gray-300 mt-4">
          {isLogin ? "¿No tienes cuenta?" : "¿Ya tienes cuenta?"}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="ml-2 text-yellow-400 hover:text-yellow-300 transition"
          >
            {isLogin ? "Regístrate" : "Inicia Sesión"}
          </button>
        </p>
      </motion.div>
    </div>
  );
}
