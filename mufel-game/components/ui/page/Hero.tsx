"use client";
import { useState } from "react";
import PlayModal from "../PlayModal";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";


export default function Hero() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useTranslation();

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
          {t("hero.title")}
        </h1>
        <p className="mt-4 text-lg animate-fadeIn delay-200">
          {t("hero.subtitle")}
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
          {t("hero.cta")}
        </motion.button>
      </div>
      <PlayModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
}
