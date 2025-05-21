"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function GameModes() {
  const [selectedMode, setSelectedMode] = useState<"plataformas" | "roguelike">("plataformas");
  const { t } = useTranslation();

const gameModes = {
  plataformas: {
    titulo: t("gameModes.plataformas"),
    descripcion: t("gameModes.descripcionPlataformas"),
    video: "/videos/PlatformMufel.mp4",
    imagen: "/img/fondo-mufel.png",
  },
  roguelike: {
    titulo: t("gameModes.roguelike"),
    descripcion: t("gameModes.descripcionRoguelike"),
    video: "/videos/Roguelike4.mp4",
    imagen: "/img/logo-mufel.jpeg",
  },
};

  return (
    <section className="relative py-16 -mt-10 bg-gradient-to-b from-[#1c0f0a] via-black to-black overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-[#1c0f0a] to-transparent z-0" />

      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent z-0" />

      <div className="relative z-10 container mx-auto text-center text-white">
        <motion.h2
          className="text-3xl font-bold mb-8"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {t("gameModes.title")}
        </motion.h2>

        <motion.div
          className="flex justify-center space-x-6 mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          {(["plataformas", "roguelike"] as const).map((mode) => (
            <button
              key={mode}
              className={`px-6 py-3 text-lg font-bold rounded-lg transition duration-300 transform cursor-pointer ${
                selectedMode === mode
                  ? "bg-yellow-500 text-black scale-105"
                  : "bg-gray-700 hover:bg-yellow-400"
              }`}
              onClick={() => setSelectedMode(mode)}
            >
              {mode === "plataformas" ? t("gameModes.plataformas") : t("gameModes.roguelike")}
            </button>
          ))}
        </motion.div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedMode}
              className="w-full md:w-1/2"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.5 }}
            >
              {gameModes[selectedMode].video ? (
                <video
                  key={gameModes[selectedMode].video}
                  autoPlay
                  loop
                  muted
                  className="w-full max-w-sm sm:max-w-full h-64 object-cover rounded-lg shadow-lg"
                >
                  <source src={gameModes[selectedMode].video} type="video/mp4" />
                </video>
              ) : (
                <Image
                  src={gameModes[selectedMode].imagen}
                  alt={gameModes[selectedMode].titulo}
                  width={500}
                  height={300}
                  className="w-full h-64 object-cover rounded-lg shadow-lg"
                />
              )}
            </motion.div>

            <motion.div
              key={`${selectedMode}-text`}
              className="w-full md:w-1/2 text-left"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-2xl font-bold">{gameModes[selectedMode].titulo}</h3>
              <p className="text-gray-300 mt-2">{gameModes[selectedMode].descripcion}</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
