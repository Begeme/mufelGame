"use client";

import { useState, useEffect } from "react";
import { useUser } from "../../context/UserContext";
import { supabase } from "../../lib/supabaseClient";

export default function ProfileSettings() {
  const context = useUser();
  const user = context !== "loading" ? context.user : null;

  const [username, setUsername] = useState("");
  const [initialUsername, setInitialUsername] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user?.username) {
      setUsername(user.username);
      setInitialUsername(user.username);
    }
  }, [user]);

  const handleSaveChanges = async () => {
    if (!user || !username.trim()) return;
    setSaving(true);
    await supabase.from("users").update({ username }).eq("id", user.id);
    setInitialUsername(username);
    setSaving(false);
  };

  const hasChanges = username !== initialUsername;

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-0 shadow-md overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-3">
        {/* Info izquierda */}
        <div className="bg-gray-950 px-6 py-8 border-r border-gray-800">
          <h3 className="text-xl font-bold text-white mb-2">Perfil</h3>
          <p className="text-sm text-gray-400">
            Edita tu nombre de usuario visible dentro del juego y en tu perfil.
          </p>
        </div>

        {/* Contenido editable */}
        <div className="md:col-span-2 p-6 space-y-6">
          {/* Nombre de usuario */}
          <div className="space-y-2">
            <label className="block text-sm text-gray-400">Nombre de usuario</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full max-w-sm px-4 py-2 bg-gray-900 border border-gray-700 rounded-md text-sm"
            />
          </div>

          {/* Botón guardar */}
          <div className="pt-4">
            <button
              onClick={handleSaveChanges}
              disabled={!hasChanges || saving || !username.trim()}
              className={`px-6 py-2 rounded-md text-sm border transition ${
                !hasChanges || saving || !username.trim()
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