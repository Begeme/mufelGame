"use client";

import { useState } from "react";

export default function SecuritySettings() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const isValid =
    currentPassword.trim() !== "" &&
    newPassword.length >= 6 &&
    newPassword === confirmPassword;

  const handlePasswordChange = () => {
    alert("Funcionalidad de cambio de contraseña disponible pronto.");
  };

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-0 shadow-md overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-3">
        {/* Info izquierda */}
        <div className="bg-gray-950 px-6 py-8 border-r border-gray-800">
          <h3 className="text-xl font-bold text-white mb-2">Seguridad</h3>
          <p className="text-sm text-gray-400">
            Cambia tu contraseña para proteger tu cuenta. La autenticación en dos pasos estará disponible pronto.
          </p>
        </div>

        {/* Contenido editable */}
        <div className="md:col-span-2 p-6 space-y-6">
          <div className="space-y-2">
            <label className="block text-sm text-gray-400">Contraseña actual</label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full max-w-sm px-4 py-2 bg-gray-900 border border-gray-700 rounded-md text-sm"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm text-gray-400">Nueva contraseña</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full max-w-sm px-4 py-2 bg-gray-900 border border-gray-700 rounded-md text-sm"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm text-gray-400">Confirmar nueva contraseña</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full max-w-sm px-4 py-2 bg-gray-900 border border-gray-700 rounded-md text-sm"
            />
          </div>

          {/* Bot\u00f3n guardar */}
          <div className="pt-4">
            <button
              onClick={handlePasswordChange}
              disabled={!isValid}
              className={`px-6 py-2 rounded-md text-sm border transition ${
                !isValid
                  ? "bg-gray-800 border-gray-700 text-gray-500 cursor-not-allowed"
                  : "bg-red-600 hover:bg-red-500 border-red-700 text-white"
              }`}
            >
              Guardar cambios
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}