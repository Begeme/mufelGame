"use client";

import { useUser } from "../../../context/UserContext";
import Footer from "../../../components/ui/Footer";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { supabase } from "../../../lib/supabaseClient";

export default function ProfilePage() {
  const context = useUser();
  const user = context !== "loading" ? context.user : null;
  const [avatarUrl, setAvatarUrl] = useState("/img/logo-mufel.jpeg");
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, margin: "-100px" });
  const controls = useAnimation();

  const router = useRouter();
  useEffect(() => {
    if (!user && context !== "loading") {
      router.push("/login");
    }
  }, [user, context, router]);

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  useEffect(() => {
    const fetchAvatar = async () => {
      if (user) {
        try {
          const { data, error } = await supabase
            .from("users")
            .select("avatar_url")
            .eq("id", user.id)
            .single();

          if (error) console.error("Error obteniendo avatar:", error.message);
          if (data?.avatar_url) {
            setAvatarUrl(data.avatar_url);
          }
        } catch (err) {
          console.error("Error inesperado al obtener avatar:", err);
        }
      }
    };
    fetchAvatar();
  }, [user]);

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    const fileExt = file.name.split(".").pop();
    const filePath = `${user.id}/avatar.${fileExt}`;

    console.log("🔍 user.id:", user.id);
    console.log("📁 filePath:", filePath);

    try {
      const { error: uploadError, data: uploadData } = await supabase.storage
        .from("avatars")
        .upload(filePath, file, { upsert: true });

      if (uploadError) {
        console.error("❌ Error subiendo avatar:", uploadError.message);
        return;
      }

      console.log("✅ Archivo subido:", uploadData);

      const { data: urlData } = supabase.storage
        .from("avatars")
        .getPublicUrl(filePath);
      const publicUrl = urlData?.publicUrl;

      if (!publicUrl) {
        console.error("❌ No se pudo generar URL pública");
        return;
      }

      const finalUrl = `${publicUrl}?t=${Date.now()}`;
      setAvatarUrl(finalUrl);

      const { error: updateError } = await supabase
        .from("users")
        .update({ avatar_url: finalUrl })
        .eq("id", user.id);

      if (updateError) {
        console.error(
          "❌ Error actualizando avatar_url en DB:",
          updateError.message
        );
      } else {
        console.log("✅ Avatar actualizado correctamente");
      }
    } catch (err) {
      console.error("❌ Error inesperado:", err);
    }
  };

  if (context === "loading") return null;
  if (!user) {
    return (
      <div className="pt-24 p-6 text-white text-center">
        <h1 className="text-2xl font-bold">
          Debes iniciar sesión para ver tu perfil
        </h1>
      </div>
    );
  }

  const stats = {
    level: 42,
    rank: "Oro III",
    played: {
      roguelike: 120,
      plataformas: 85,
    },
  };

  const latestMatches = [
    { mode: "Roguelike", result: "Victoria", time: "4:32", date: "2025-03-30" },
    {
      mode: "Plataformas",
      result: "Derrota",
      time: "10:12",
      date: "2025-03-29",
    },
    { mode: "Roguelike", result: "Victoria", time: "5:03", date: "2025-03-27" },
  ];

  const achievements = [
    "Completar el plataformas sin morir",
    "Completar el plataformas 10 veces",
    "Completar el plataformas 25 veces",
    "Completar el plataformas 50 veces",
    "Matar 50 enemigos en plataformas",
    "Matar 100 enemigos en plataformas",
    "Matar 250 enemigos en plataformas",
    "Completar el roguelike en menos de 5 minutos",
    "Completar el roguelike 10 veces",
    "Completar el roguelike 25 veces",
    "Completar el roguelike 50 veces",
    "Matar 50 enemigos en roguelike",
    "Matar 100 enemigos en roguelike",
    "Matar 250 enemigos en roguelike",
  ];

  return (
    <div className="min-h-screen pt-24 text-white bg-gradient-to-b from-gray-950 to-gray-900">
      <motion.div
        initial="hidden"
        animate={controls}
        variants={{
          hidden: { opacity: 0, y: 50 },
          visible: { opacity: 1, y: 0 },
        }}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-4 py-10"
        ref={containerRef}
      >
        <h1 className="text-4xl font-bold mb-10 text-center">👤 Mi Perfil</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-gray-800 rounded-2xl p-6 shadow-lg text-center space-y-4 border border-gray-700"
          >
            <div
              className="relative inline-block cursor-pointer group"
              onClick={handleAvatarClick}
            >
              <Image
                src={avatarUrl}
                alt="Avatar"
                width={100}
                height={100}
                className="mx-auto rounded-full border-4 border-yellow-500 shadow-md group-hover:opacity-80"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="opacity-0 group-hover:opacity-100 transition text-xs text-white bg-yellow-600 px-2 py-1 rounded-full shadow">
                  ✎ Editar Avatar
                </span>
              </div>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleAvatarChange}
                className="hidden"
              />
            </div>
            <p className="text-2xl font-semibold">{user.username}</p>
            <hr className="border-gray-600 my-2" />
            <p>
              <strong>Nivel:</strong> {stats.level}
            </p>
            <p>
              <strong>Rango:</strong> {stats.rank}
            </p>
            <p>
              <strong>Roguelike:</strong> {stats.played.roguelike} partidas
            </p>
            <p>
              <strong>Plataformas:</strong> {stats.played.plataformas} partidas
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="md:col-span-2 bg-gray-800 rounded-2xl p-6 shadow-lg space-y-4 border border-gray-700"
          >
            <h2 className="text-2xl font-semibold mb-3">🕹️ Últimas partidas</h2>
            {latestMatches.map((match, idx) => (
              <div
                key={idx}
                className="bg-gray-900 p-4 rounded-lg border border-gray-700 flex justify-between items-center hover:bg-gray-800 transition"
              >
                <div>
                  <p className="font-bold">{match.mode}</p>
                  <p className="text-sm text-gray-400">{match.date}</p>
                </div>
                <div className="text-right">
                  <p
                    className={
                      match.result === "Victoria"
                        ? "text-green-400"
                        : "text-red-400"
                    }
                  >
                    {match.result}
                  </p>
                  <p className="text-sm">{match.time}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="max-w-6xl mx-auto mb-16"
        >
          <h2 className="text-2xl font-semibold mb-6 text-center">🏅 Logros</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {achievements.map((name, idx) => (
              <div
                key={idx}
                className="bg-gray-900 border border-gray-700 rounded-xl p-6 flex flex-col items-center text-center opacity-50 hover:opacity-80 transition"
              >
                <span className="text-4xl mb-2">🔒</span>
                <p className="font-bold text-sm">¿¿¿???</p>
                <p className="text-xs text-gray-500">Desbloquéalo para ver</p>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
      <Footer />
    </div>
  );
}
