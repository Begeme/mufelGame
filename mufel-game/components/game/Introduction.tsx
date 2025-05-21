"use client";

import { motion } from "framer-motion";

export default function Introduction() {
  return (
    <section className="relative min-h-screen bg-black text-white overflow-hidden flex items-start justify-center pt-32 -mt-10">
      <motion.video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      >
        <source src="/videos/Mufel.mp4" type="video/mp4" />
        Tu navegador no soporta el video.
      </motion.video>

      <div className="absolute inset-0 bg-black/60 z-0" />

      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#1c0f0a] to-transparent z-0" />

      <motion.div
        className="absolute top-24 left-1/2 transform -translate-x-1/2 z-10 text-center max-w-3xl px-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-outline-yellow"
          animate={{ textShadow: ["0 0 0px #facc15", "0 0 20px #facc15", "0 0 0px #facc15"] }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
        >
          Mufel Back To Hell
        </motion.h1>
      </motion.div>
    </section>
  );
}
