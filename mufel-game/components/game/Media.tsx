"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const images = [
  "/img/GameMode.png",
  "/img/CinematicaImagen.png",
  "/img/PlataformasImagen.png",
  "/img/RoguelikeImagen.png",
];

const videos = [
  "/videos/PlatformMufel.mp4",
  "/videos/Roguelike4.mp4",
];

export default function Media() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section className="relative py-20 -mt-10 bg-gradient-to-b from-[#2a0f0f] via-[#1c0f0a] to-black text-white overflow-hidden text-center flex flex-col items-center">
      {/* Gradientes de conexión */}
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-[#2a0f0f] to-transparent z-0" />
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black to-transparent z-0" />

      <div className="relative z-10 max-w-5xl">
        <motion.h2
          className="text-4xl font-bold"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Galería y Videos
        </motion.h2>

        <motion.p
          className="mt-4 text-lg text-gray-300"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
        >
          Descubre imágenes y videos de MufelGame en acción. Sumérgete en su mundo y prepárate para la batalla.
        </motion.p>

        <motion.div
          className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: {
              transition: { staggerChildren: 0.1 },
            },
          }}
        >
          {images.map((src, index) => (
            <motion.div
              key={index}
              className="relative w-full h-40 md:h-48 overflow-hidden rounded-lg shadow-lg cursor-pointer"
              onClick={() => setSelectedImage(src)}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.4 }}
              whileHover={{ scale: 1.05 }}
            >
              <Image
                src={src}
                alt={`Galería ${index + 1}`}
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-300"
              />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold text-yellow-500">Videos Destacados</h3>
          <motion.div
            className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: {
                transition: { staggerChildren: 0.1 },
              },
            }}
          >
            {videos.map((video, index) => (
              <motion.div
                key={index}
                className="relative w-full"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.4 }}
              >
                <video controls className="rounded-lg w-full shadow-lg">
                  <source src={video} type="video/mp4" />
                  Tu navegador no soporta el video.
                </video>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Modal de imagen ampliada */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center"
            onClick={() => setSelectedImage(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative max-w-4xl w-full px-4"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 text-white text-3xl font-bold cursor-pointer"
              >
                &times;
              </button>
              <Image
                src={selectedImage}
                alt="Imagen ampliada"
                width={1600}
                height={900}
                className="w-full h-auto rounded-lg"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
