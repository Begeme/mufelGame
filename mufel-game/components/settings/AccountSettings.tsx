"use client";

import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabaseClient";

export default function AccountSettings() {
  const router = useRouter();

  const handleLogout = async () => {
  await supabase.auth.signOut();
  router.push("/");
};

  const handleDeleteAccount = async () => {
    const confirm = window.confirm(
      "¿Estás seguro de que quieres eliminar tu cuenta? Esta acción no se puede deshacer."
    );
    if (!confirm) return;

    const {
      data: { session },
    } = await supabase.auth.getSession();
    const user = session?.user;

    if (user) {
      await supabase.from("users").delete().eq("id", user.id);
      await supabase.auth.signOut();
      router.push("/");
    }
  };

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-0 shadow-md overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-3">
        <div className="bg-gray-950 px-6 py-8 border-r border-gray-800">
          <h3 className="text-xl font-bold text-white mb-2">Cuenta</h3>
          <p className="text-sm text-gray-400">
            Cierra sesión o elimina tu cuenta permanentemente de la plataforma.
          </p>
        </div>

        <div className="md:col-span-2 p-6 space-y-6">
          <div className="flex justify-between items-center">
            <span className="text-sm text-white">Cerrar sesión de la cuenta</span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm rounded-md border border-gray-700 bg-gray-800 hover:bg-gray-700 transition"
            >
              Cerrar sesión
            </button>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-white">Eliminar cuenta</span>
            <button
              onClick={handleDeleteAccount}
              className="px-4 py-2 text-sm rounded-md border border-red-700 bg-red-900 hover:bg-red-800 transition text-white"
            >
              Eliminar cuenta
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}