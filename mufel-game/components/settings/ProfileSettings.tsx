"use client";

import { useState, useEffect } from "react";
import { useUser } from "../../context/UserContext";
import { supabase } from "../../lib/supabaseClient";
import toast from "react-hot-toast";

export default function ProfileSettings() {
  const context = useUser();
  const { user, refreshUser } = context !== "loading" ? context : { user: null, refreshUser: async () => {} };

  const [username, setUsername] = useState("");
  const [initialUsername, setInitialUsername] = useState("");
  const [saving, setSaving] = useState(false);

  const MIN_LENGTH = 3;
  const MAX_LENGTH = 20;

  useEffect(() => {
    if (user?.username) {
      setUsername(user.username);
      setInitialUsername(user.username);
    }
  }, [user]);

  const trimmedUsername = username.trim();
  const isValidLength =
    trimmedUsername.length >= MIN_LENGTH && trimmedUsername.length <= MAX_LENGTH;
  const hasChanges = trimmedUsername !== initialUsername;

  const handleSaveChanges = async () => {
    if (!user || !isValidLength || !hasChanges) return;

    setSaving(true);

    const { error } = await supabase
      .from("users")
      .update({ username: trimmedUsername })
      .eq("id", user.id);

    if (!error) {
      setInitialUsername(trimmedUsername);
      await refreshUser();
      toast.success("✏️ Nombre de usuario actualizado");
    } else {
      toast.error("Error al guardar el nombre de usuario");
      console.error("Error al actualizar username:", error);
    }

    setSaving(false);
  };

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-0 shadow-md overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-3">
        <div className="bg-gray-950 px-6 py-8 border-r border-gray-800">
          <h3 className="text-xl font-bold text-white mb-2">Perfil</h3>
          <p className="text-sm text-gray-400">
            Edita tu nombre de usuario visible dentro del juego y en tu perfil.
          </p>
        </div>

        <div className="md:col-span-2 p-6 space-y-6">
          <div className="space-y-2">
            <label className="block text-sm text-gray-400">Nombre de usuario</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              maxLength={MAX_LENGTH}
              className="w-full max-w-sm px-4 py-2 bg-gray-900 border border-gray-700 rounded-md text-sm text-white"
            />
            {hasChanges && (
              <div className="flex justify-between text-xs mt-1">
                {!isValidLength ? (
                  <span className="text-red-500">
                    Debe tener entre {MIN_LENGTH} y {MAX_LENGTH} caracteres.
                  </span>
                ) : (
                  <span className="text-green-400">✅ Longitud válida</span>
                )}
                <span
                  className={`${
                    username.length > MAX_LENGTH
                      ? "text-red-500"
                      : "text-gray-400"
                  }`}
                >
                  {username.length} / {MAX_LENGTH}
                </span>
              </div>
            )}
          </div>

          <div className="pt-4">
            <button
              onClick={handleSaveChanges}
              disabled={!hasChanges || saving || !isValidLength}
              className={`px-6 py-2 rounded-md text-sm border transition ${
                !hasChanges || saving || !isValidLength
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
