// src/app/download/page.tsx
"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function DownloadPage() {
  useEffect(() => {
    document.title = "Descargar | MufelGame";
  }, []);

  return (
    <main className="min-h-screen bg-gray-900 text-white px-6 py-20 flex flex-col items-center">
      <motion.h1
        className="text-4xl md:text-5xl font-bold mb-6 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Descarga MufelGame
      </motion.h1>

      <motion.p
        className="text-gray-300 max-w-xl text-center mb-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        Prepárate para comenzar tu aventura en el infierno con Mufel. Descarga el juego para tu plataforma preferida.
      </motion.p>

      <div className="flex flex-col md:flex-row gap-6">
        <DownloadCard
          platform="Windows"
          description="Disponible para Windows 10 y superiores"
          downloadLink="/downloads/mufelgame-windows.exe"
          icon="/img/logo-sin-fondo.png"
        />
        <DownloadCard
          platform="MacOS"
          description="Compatible con MacOS 11+ (Intel & M1)"
          downloadLink="/downloads/mufelgame-mac.dmg"
          icon="/img/logo-sin-fondo.png"
        />
        {/* Si no tienes builds aún, puedes poner coming soon */}
        {/* <DownloadCard platform="Linux" description="Próximamente..." downloadLink="#" icon="/img/linux.png" /> */}
      </div>
    </main>
  );
}

function DownloadCard({
  platform,
  description,
  downloadLink,
  icon,
}: {
  platform: string;
  description: string;
  downloadLink: string;
  icon: string;
}) {
  return (
    <motion.div
      className="bg-gray-800 rounded-xl p-6 w-full max-w-xs text-center border border-gray-700 hover:border-yellow-500 transition"
      whileHover={{ scale: 1.03 }}
    >
      <div className="flex justify-center mb-4">
        <Image src={icon} alt={`${platform} icon`} width={48} height={48} />
      </div>
      <h2 className="text-xl font-bold mb-2">{platform}</h2>
      <p className="text-gray-400 text-sm mb-4">{description}</p>
      <a
        href={downloadLink}
        className="inline-block bg-yellow-500 hover:bg-yellow-400 text-black font-semibold px-5 py-2 rounded-lg transition"
        download
      >
        Descargar
      </a>
    </motion.div>
  );
}
