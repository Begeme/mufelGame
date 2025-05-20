"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const gameModes = {
  plataformas: {
    title: "Modo Plataformas",
    movement: "Mueve con A (izquierda), D (derecha), salta con ESPACIO.",
    combat: "Clic izquierdo: Lanza bola de fuego. Clic derecho: Cubrirse.",
    objective: "Llega a la meta final sin morir, escapando o eliminando enemigos.",
    videos: {
      movement: "/videos/MovimientoMufel.mp4",
      combat: "/videos/AtaqueMufel.mp4",
      objective: "/videos/PlatformMufel.mp4",
    },
  },
  roguelike: {
    title: "Modo Roguelike",
    movement: "Mueve con W, A, S, D en todas las direcciones.",
    combat: "Clic izquierdo: Ataca.",
    objective: "Desbloquea salas de la mazmorra hasta encontrar la puerta de salida.",
    videos: {
      movement: "/videos/MovimientoRoguelike.mp4",
      combat: "/videos/AtaqueRoguelike.mp4",
      objective: "/videos/Roguelike.mp4",
    },
  },
};

export default function HowToPlay() {
  const [isPlataformas, setIsPlataformas] = useState(true);
  const [selectedSection, setSelectedSection] = useState<"movement" | "combat" | "objective">("movement");

  const selectedMode = isPlataformas ? "plataformas" : "roguelike";

  return (
    <section className="relative py-20 -mt-10 bg-gradient-to-b from-[#1c0f0a] via-black to-black text-white overflow-hidden">
      {/* Gradientes visuales */}
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-[#1c0f0a] to-transparent z-0" />
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black to-transparent z-0" />

      <div className="relative z-10 container mx-auto text-center">
        <motion.h2
          className="text-4xl font-bold mb-10"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Cómo Jugar
        </motion.h2>

        {/* Switch de modo */}
        <motion.div
          className="flex justify-center mb-10"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="relative w-56 h-12 bg-gray-700 rounded-full flex items-center cursor-pointer transition"
            onClick={() => setIsPlataformas(!isPlataformas)}
            whileTap={{ scale: 0.97 }}
          >
            <span
              className={`w-1/2 text-sm font-bold text-center transition-all ${
                isPlataformas ? "text-black" : "text-gray-300"
              }`}
            >
              Plataformas
            </span>
            <span
              className={`absolute w-1/2 h-full rounded-full bg-yellow-500 flex items-center justify-center font-bold text-black transition-all ${
                isPlataformas ? "left-0" : "left-1/2"
              }`}
            >
              {isPlataformas ? "Plataformas" : "Roguelike"}
            </span>
            <span
              className={`w-1/2 text-sm font-bold text-center transition-all ${
                isPlataformas ? "text-gray-300" : "text-black"
              }`}
            >
              Roguelike
            </span>
          </motion.div>
        </motion.div>

        {/* Contenido principal */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-12 px-4">
          <motion.div
            className="w-full md:w-1/2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex justify-center gap-4 mb-4 flex-wrap">
              {["movement", "combat", "objective"].map((key) => (
                <motion.button
                  key={key}
                  onClick={() => setSelectedSection(key as "movement" | "combat" | "objective")}
                  whileTap={{ scale: 0.95 }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className={`px-6 py-2 rounded-lg font-bold transition cursor-pointer ${
                    selectedSection === key
                      ? "bg-yellow-500 text-black"
                      : "bg-gray-700 hover:bg-yellow-400"
                  }`}
                >
                  {key === "movement" ? "Movimiento" : key === "combat" ? "Combate" : "Objetivo"}
                </motion.button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={selectedMode + selectedSection}
                className="mt-4 bg-gray-800 p-6 rounded-lg shadow text-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-2xl font-bold mb-2">{gameModes[selectedMode].title}</h3>
                <p className="text-lg text-gray-300">{gameModes[selectedMode][selectedSection]}</p>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          <motion.div
            className="w-full md:w-1/2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <AnimatePresence mode="wait">
              <motion.video
                key={selectedSection + selectedMode}
                controls
                className="rounded-lg w-full max-w-xl shadow-lg"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
              >
                <source
                  src={gameModes[selectedMode].videos[selectedSection]}
                  type="video/mp4"
                />
                Tu navegador no soporta el video.
              </motion.video>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
