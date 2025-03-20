"use client";
import { useState } from "react";
import { motion } from "framer-motion";

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);

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

        <form className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-gray-300">Nombre de usuario</label>
              <input
                type="text"
                placeholder="Tu nombre"
                className="w-full px-4 py-2 rounded bg-gray-700 text-white focus:outline-none"
              />
            </div>
          )}

          <div>
            <label className="block text-gray-300">Correo Electrónico</label>
            <input
              type="email"
              placeholder="correo@example.com"
              className="w-full px-4 py-2 rounded bg-gray-700 text-white focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-300">Contraseña</label>
            <input
              type="password"
              placeholder="********"
              className="w-full px-4 py-2 rounded bg-gray-700 text-white focus:outline-none"
            />
          </div>

          <motion.button
            whileTap={{ scale: 0.95 }}
            className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-2 px-4 rounded transition"
          >
            {isLogin ? "Iniciar Sesión" : "Crear Cuenta"}
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
