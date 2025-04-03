"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabaseClient";
import toast from "react-hot-toast";
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [toastQueue, setToastQueue] = useState<string[]>([]);
  const [isToastActive, setIsToastActive] = useState(false);

  const accessToken = searchParams.get("access_token");

  const isPasswordValid = newPassword.length >= 8 && newPassword.length <= 64;
  const doPasswordsMatch = newPassword === confirmPassword;

  // Mostrar mensajes iniciales según token
  useEffect(() => {
    if (!accessToken) {
      showToast("El enlace no es válido o ha expirado.");
    } else {
      showToast("Token válido. Cambia tu contraseña.", "success");
    }
  }, [accessToken]);

  // Toast queue control: solo uno visible
  useEffect(() => {
    if (!isToastActive && toastQueue.length > 0) {
      const nextMessage = toastQueue[0];

      const toastId = toast.error(nextMessage, {
        duration: 3000,
        icon: '❌', // Solo ícono de error
      });

      setIsToastActive(true);

      setTimeout(() => {
        toast.dismiss(toastId);
        setIsToastActive(false);
        setToastQueue((prev) => prev.slice(1));
      }, 3000);
    }
  }, [toastQueue, isToastActive]);

  const showToast = (message: string, type: "error" | "success" = "error") => {
    if (type === "success") {
      toast.success(message, { icon: '✅' }); // Puedes usar icon: null si no quieres ninguno
      return;
    }

    setToastQueue((prev) => {
      if (!prev.includes(message)) {
        return [...prev, message];
      }
      return prev;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const errors: string[] = [];

    if (!isPasswordValid) {
      errors.push("La contraseña debe tener entre 8 y 64 caracteres.");
    }

    if (!doPasswordsMatch) {
      errors.push("Las contraseñas no coinciden.");
    }

    if (errors.length > 0) {
      errors.forEach((msg) => showToast(msg));
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password: newPassword });

    if (error) {
      showToast("Error al actualizar la contraseña.");
      console.error(error.message);
    } else {
      toast.success("Contraseña actualizada correctamente. Redirigiendo...", { icon: '✅' });
      setTimeout(() => router.push("/login"), 1500);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-gray-900 rounded-2xl shadow-xl p-8 border border-gray-700">
        <h2 className="text-2xl font-bold text-center text-white mb-6">
          Cambiar contraseña
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                placeholder="Nueva contraseña"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-2 pr-10 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-yellow-500"
                onClick={() => setShowNewPassword((prev) => !prev)}
              >
                {showNewPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
            {!isPasswordValid && newPassword && (
              <p className="text-xs text-red-400 mt-1">
                La contraseña debe tener entre 8 y 64 caracteres.
              </p>
            )}
          </div>

          <div>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Repetir contraseña"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2 pr-10 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-yellow-500"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
              >
                {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
            {!doPasswordsMatch && confirmPassword && (
              <p className="text-xs text-red-400 mt-1">
                Las contraseñas no coinciden.
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-2 px-4 rounded-lg transition disabled:opacity-50"
          >
            {loading ? "Actualizando..." : "Cambiar contraseña"}
          </button>
        </form>
      </div>
    </div>
  );
}
