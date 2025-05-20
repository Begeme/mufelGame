"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const testimonios = [
  {
    nombre: "Carlos G.",
    avatar: "/img/logo-mufel.jpeg",
    comentario: "¡El mejor juego que he jugado en años! La jugabilidad es increíble.",
    estrellas: 5,
  },
  {
    nombre: "Laura P.",
    avatar: "/img/logo-mufel.jpeg",
    comentario: "Me encanta el modo Roguelike. Cada partida es un desafío diferente.",
    estrellas: 4,
  },
  {
    nombre: "Diego M.",
    avatar: "/img/logo-mufel.jpeg",
    comentario: "Los gráficos y la jugabilidad son increíbles. ¡Muy recomendado!",
    estrellas: 5,
  },
  {
    nombre: "Andrea R.",
    avatar: "/img/logo-mufel.jpeg",
    comentario: "Los eventos en vivo son emocionantes. Siempre hay algo nuevo.",
    estrellas: 3,
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonios.length);
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonios.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonios.length - 1 : prevIndex - 1
    );
  };

  const current = testimonios[currentIndex];

  return (
    <section className="relative py-16 -mt-10 bg-gradient-to-b from-[#2a0f0f] via-black to-black overflow-hidden">
      {/* Gradiente superior para fusión con FeaturedMerch */}
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-[#2a0f0f] to-transparent z-0" />
      {/* Gradiente inferior opcional para fusión con Footer */}
      <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-black to-transparent z-0" />

      <div className="relative z-10 container mx-auto text-center text-white">
        <motion.h2
          className="text-4xl font-bold mb-10"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Lo que dicen los jugadores
        </motion.h2>

        <div className="relative bg-gray-700 p-8 rounded-2xl shadow-lg max-w-xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center justify-center mb-4">
                <Image
                  src={current.avatar}
                  alt={current.nombre}
                  width={60}
                  height={60}
                  className="rounded-full border-2 border-yellow-400"
                />
                <h4 className="text-lg font-semibold ml-4">{current.nombre}</h4>
              </div>

              <div className="flex justify-center mb-4 text-yellow-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <FaStar
                    key={i}
                    size={20}
                    className={i < current.estrellas ? "text-yellow-400" : "text-gray-500"}
                  />
                ))}
              </div>

              <p className="text-lg text-gray-300 italic">
                &ldquo;{current.comentario}&rdquo;
              </p>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-between mt-6">
            <button
              onClick={prevTestimonial}
              className="bg-gray-600 px-4 py-2 rounded-lg hover:bg-gray-500 transition duration-300 cursor-pointer"
            >
              ⬅ Anterior
            </button>
            <button
              onClick={nextTestimonial}
              className="bg-gray-600 px-4 py-2 rounded-lg hover:bg-gray-500 transition duration-300 cursor-pointer "
            >
              Siguiente ➡
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
