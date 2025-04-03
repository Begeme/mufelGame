"use client";

import { useState, useEffect } from "react";
import { useNotification } from "../../context/NotificationContext";
import { useUser } from "../../context/UserContext";
import { supabase } from "../../lib/supabaseClient";
import toast from "react-hot-toast";

export default function NotificationSettings() {
  const { soundEnabled, toggleSound } = useNotification();
  const context = useUser();
  const currentUser = context !== "loading" ? context.user : null;

  const [emailNotifications, setEmailNotifications] = useState(false);
  const [initialEmail, setInitialEmail] = useState(false);
  const [initialSound, setInitialSound] = useState(true);
  const [saving, setSaving] = useState(false);

  const hasChanges =
    emailNotifications !== initialEmail || soundEnabled !== initialSound;

  useEffect(() => {
    if (!currentUser) return;

    const loadPreferences = async () => {
      const { data } = await supabase
        .from("users")
        .select("email_notifications, chat_sound_enabled")
        .eq("id", currentUser.id)
        .single();

      if (data) {
        setEmailNotifications(data.email_notifications);
        setInitialEmail(data.email_notifications);
        setInitialSound(data.chat_sound_enabled);
      }
    };

    loadPreferences();
  }, [currentUser]);

  const handleSaveChanges = async () => {
    if (!currentUser) return;
    setSaving(true);

    const changedSettings: string[] = [];

    if (emailNotifications !== initialEmail) {
      changedSettings.push(
        emailNotifications ? "📧 Email activado" : "📧 Email desactivado"
      );
    }

    if (soundEnabled !== initialSound) {
      changedSettings.push(
        soundEnabled ? "🔔 Sonido activado" : "🔕 Sonido desactivado"
      );
    }

    if (changedSettings.length === 0) {
      setSaving(false);
      return;
    }

    const { error } = await supabase
      .from("users")
      .update({
        email_notifications: emailNotifications,
        chat_sound_enabled: soundEnabled,
      })
      .eq("id", currentUser.id);

    if (!error) {
      setInitialEmail(emailNotifications);
      setInitialSound(soundEnabled);
      toast.success(changedSettings.join(" · "));
    } else {
      toast.error("Error al guardar configuración");
      console.error("Error al guardar configuración:", error);
    }

    setSaving(false);
  };

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-0 shadow-md overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-3">
        <div className="bg-gray-950 px-6 py-8 border-r border-gray-800">
          <h3 className="text-xl font-bold text-white mb-2">Notificaciones</h3>
          <p className="text-sm text-gray-400">
            Controla cómo deseas recibir alertas y sonidos en tu experiencia.
          </p>
        </div>

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
              checked={soundEnabled}
              onChange={toggleSound}
              className="w-5 h-5 accent-red-600"
            />
          </div>

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
