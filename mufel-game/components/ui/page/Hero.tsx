"use client";
import { useState } from "react";
import PlayModal from "../PlayModal";
import { motion } from "framer-motion";

export default function Hero() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section
      className="relative h-screen flex items-center justify-center text-center text-white"
      style={{
        backgroundImage: `url('/img/fondo-mufel.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative z-10">
        <h1 className="text-5xl font-bold animate-fadeIn">
          ¡Bienvenido a la batalla!
        </h1>
        <p className="mt-4 text-lg animate-fadeIn delay-200">
          Únete a la acción y demuestra tu habilidad.
        </p>
        <motion.button
          className="mt-6 bg-yellow-500 text-black px-6 py-3 rounded-lg text-xl font-bold hover:bg-yellow-400 transition duration-300 cursor-pointer"
          onClick={() => setIsModalOpen(true)}
          animate={{ scale: [1, 1.08, 1], opacity: [1, 0.8, 1] }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            repeatDelay: 3,
            ease: "easeInOut",
          }}
        >
          Jugar Gratis
        </motion.button>
      </div>
      <PlayModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
}
