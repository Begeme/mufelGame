"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import toast from "react-hot-toast";
import { FiLoader } from "react-icons/fi";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isEmailValid) return toast.error("Introduce un correo válido.");

    setLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${location.origin}/resetPassword`,
      });

      if (error) throw new Error(error.message);
      toast.success("Revisa tu correo.");
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
        console.error("Forgot password error:", err);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 transition-all duration-500 ease-in-out transform"
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

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-2 px-4 rounded-lg transition duration-200 disabled:opacity-50 flex justify-center items-center gap-2"
      >
        {loading && <FiLoader className="animate-spin" />} Enviar enlace
      </button>
    </form>
  );
}
