"use client";

import { useState, useEffect } from "react";
import { useUser } from "../../context/UserContext";
import { supabase } from "../../lib/supabaseClient";

export default function PrivacySettings() {
  const context = useUser();
  const user = context !== "loading" ? context.user : null;

  const [isPublic, setIsPublic] = useState(true);
  const [initialIsPublic, setInitialIsPublic] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user?.is_public !== undefined) {
      setIsPublic(user.is_public);
      setInitialIsPublic(user.is_public);
    }
  }, [user]);

  const handleSaveChanges = async () => {
    if (!user) return;
    setSaving(true);
    await supabase.from("users").update({ is_public: isPublic }).eq("id", user.id);
    setInitialIsPublic(isPublic);
    setSaving(false);
  };

  const hasChanges = isPublic !== initialIsPublic;

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-0 shadow-md overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-3">
        {/* Info izquierda */}
        <div className="bg-gray-950 px-6 py-8 border-r border-gray-800">
          <h3 className="text-xl font-bold text-white mb-2">Privacidad</h3>
          <p className="text-sm text-gray-400">
            Controla si tu perfil es visible para todos o solo para tus amigos.
          </p>
        </div>

        {/* Contenido editable */}
        <div className="md:col-span-2 p-6 space-y-6">
          {/* Perfil público */}
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-white">Perfil público</h4>
              <p className="text-xs text-gray-500">
                Si está activado, cualquier usuario podrá ver tu perfil y estadísticas.
              </p>
            </div>
            <input
              type="checkbox"
              checked={isPublic}
              onChange={(e) => setIsPublic(e.target.checked)}
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