"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useUser } from "../../../context/UserContext";
import { useRouter } from "next/navigation";

export default function DownloadPage() {
  const context = useUser();
  const user = context !== "loading" ? context.user : null;
  const router = useRouter();

  useEffect(() => {
    if (typeof window === "undefined") return;
    document.title = "Descargar | MufelGame";

    if (!user && context !== "loading") {
      router.push("/login");
    }
  }, [user, context, router]);

  if (context === "loading") return null;
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <p>Redirigiendo al login...</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-black to-gray-900 text-white pt-32 px-6 py-20 flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <Image
          src="/img/logo-sin-fondo.png"
          alt="MufelGame logo"
          width={96}
          height={96}
          className="mx-auto mb-4"
        />
        <h1 className="text-5xl font-extrabold tracking-tight mb-4">
          Descarga MufelGame
        </h1>
        <p className="text-gray-300 max-w-2xl mx-auto text-lg">
          Empieza tu viaje en el infierno con la versión más reciente de
          MufelGame. ¡Haz clic abajo para comenzar la descarga!
        </p>
      </motion.div>

      <motion.a
        href="/downloads/mufelgame.zip"
        download
        whileHover={{ scale: 1.05 }}
        className="bg-yellow-500 hover:bg-yellow-400 !text-black font-bold text-lg px-8 py-4 rounded-xl shadow-lg transition no-underline"
      >
        Descargar Juego
      </motion.a>
    </main>
  );
}
