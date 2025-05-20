"use client";

import { useState } from "react";
import { FaGamepad, FaDungeon } from "react-icons/fa";
import { MdOutlineCategory } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";

const gameModes = {
  plataformas: {
    title: "¿Qué es un Juego de Plataformas?",
    description:
      "Los juegos de plataformas son un género de videojuegos en el que el jugador debe atravesar niveles llenos de obstáculos, plataformas flotantes y enemigos. La precisión en los saltos y la movilidad son clave para superar los desafíos.",
    history:
      "Este género se popularizó en la década de los 80 con juegos como 'Super Mario Bros' y 'Sonic the Hedgehog'. Son conocidos por sus mecánicas de salto y su enfoque en la exploración y el timing preciso.",
    characteristics: [
      "📌 Enfoque en saltos y precisión.",
      "🎮 Plataformas móviles y obstáculos dinámicos.",
      "💡 Requiere coordinación y reflejos.",
      "🏆 Objetivo: llegar al final del nivel evitando peligros.",
    ],
  },
  roguelike: {
    title: "¿Qué es un Roguelike?",
    description:
      "Los roguelike son juegos que se caracterizan por mazmorras generadas aleatoriamente, muerte permanente y una dificultad elevada. Cada partida es única, y la exploración es clave.",
    history:
      "El término 'roguelike' proviene del juego 'Rogue' (1980), que introdujo mazmorras aleatorias y muerte permanente. Desde entonces, juegos como 'Hades' y 'The Binding of Isaac' han refinado el género.",
    characteristics: [
      "🗺️ Mazmorras generadas aleatoriamente.",
      "💀 Muerte permanente: cada partida es diferente.",
      "⚔️ Enfoque en combate estratégico y mejoras progresivas.",
      "🎲 Elementos de azar que cambian la experiencia en cada intento.",
    ],
  },
};

export default function GameModes() {
  const [isPlataformas, setIsPlataformas] = useState(true);
  const selectedMode = isPlataformas ? "plataformas" : "roguelike";

  return (
    <section className="relative py-20 -mt-10 bg-gradient-to-b from-black via-[#0e0e0e] to-black text-white overflow-hidden">
      {/* Gradientes de transición */}
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-black to-transparent z-0" />
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black to-transparent z-0" />

      <div className="relative z-10 container mx-auto flex flex-col items-center text-center px-4">
        <motion.h2
          className="text-4xl font-bold mb-6"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Modos de Juego
        </motion.h2>

        {/* Switch */}
        <motion.div
          className="mt-4"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="relative w-48 h-12 bg-gray-700 rounded-full flex items-center cursor-pointer transition"
            onClick={() => setIsPlataformas(!isPlataformas)}
            whileTap={{ scale: 0.97 }}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <span
              className={`w-1/2 text-center text-sm font-bold transition-all ${
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
              className={`w-1/2 text-center text-sm font-bold transition-all ${
                isPlataformas ? "text-gray-300" : "text-black"
              }`}
            >
              Roguelike
            </span>
          </motion.div>
        </motion.div>

        {/* Contenido del modo */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedMode}
            className="mt-10 max-w-4xl bg-gray-800 p-8 rounded-lg shadow-lg text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <motion.h3
              className="text-3xl font-bold flex items-center justify-center gap-2"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              {isPlataformas ? <FaGamepad /> : <FaDungeon />}
              {gameModes[selectedMode].title}
            </motion.h3>

            <motion.p
              className="text-lg text-gray-300 mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              {gameModes[selectedMode].description}
            </motion.p>

            <motion.div
              className="mt-6 bg-gray-700 p-4 rounded-lg"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h4 className="text-xl font-bold text-yellow-400 flex items-center justify-center gap-2">
                <MdOutlineCategory /> Historia
              </h4>
              <p className="text-gray-300 mt-2">
                {gameModes[selectedMode].history}
              </p>
            </motion.div>

            <motion.div
              className="mt-6 bg-gray-700 p-4 rounded-lg"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h4 className="text-xl font-bold text-yellow-400 flex items-center justify-center gap-2">
                ⭐ Características
              </h4>
              <motion.ul
                className="text-gray-300 mt-2 list-disc list-inside space-y-2 text-left"
                initial="hidden"
                animate="visible"
                variants={{
                  visible: {
                    transition: {
                      staggerChildren: 0.1,
                    },
                  },
                }}
              >
                {gameModes[selectedMode].characteristics.map((feature, index) => (
                  <motion.li
                    key={index}
                    variants={{
                      hidden: { opacity: 0, x: -10 },
                      visible: { opacity: 1, x: 0 },
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {feature}
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
