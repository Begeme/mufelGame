"use client";

import { useState } from "react";

export default function NotificationSettings() {
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [soundNotifications, setSoundNotifications] = useState(true);
  const [initialEmail, setInitialEmail] = useState(false);
  const [initialSound, setInitialSound] = useState(true);
  const [saving, setSaving] = useState(false);

  const hasChanges =
    emailNotifications !== initialEmail || soundNotifications !== initialSound;

  const handleSaveChanges = async () => {
    setSaving(true);
    // Aquí iría la lógica para guardar los cambios en Supabase
    setInitialEmail(emailNotifications);
    setInitialSound(soundNotifications);
    setSaving(false);
  };

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-0 shadow-md overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-3">
        {/* Info izquierda */}
        <div className="bg-gray-950 px-6 py-8 border-r border-gray-800">
          <h3 className="text-xl font-bold text-white mb-2">Notificaciones</h3>
          <p className="text-sm text-gray-400">
            Controla cómo deseas recibir alertas y sonidos en tu experiencia.
          </p>
        </div>

        {/* Contenido editable */}
        <div className="md:col-span-2 p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-white">
                Notificaciones por correo
              </h4>
              <p className="text-xs text-gray-500">
                Recibe alertas importantes directamente en tu email.
              </p>
            </div>
            <input
              type="checkbox"
              checked={emailNotifications}
              onChange={(e) => setEmailNotifications(e.target.checked)}
              className="w-5 h-5 accent-red-600"
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-white">
                Sonido de notificación de chat
              </h4>
              <p className="text-xs text-gray-500">
                Activa un sonido cuando recibas mensajes en el chat.
              </p>
            </div>
            <input
              type="checkbox"
              checked={soundNotifications}
              onChange={(e) => setSoundNotifications(e.target.checked)}
              className="w-5 h-5 accent-red-600"
            />
          </div>

          {/* Botón guardar */}
          <div className="pt-4">
            <button
              onClick={handleSaveChanges}
              disabled={!hasChanges || saving}
              className={`px-6 py-2 rounded-md text-sm border transition ${
                !hasChanges || saving
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
