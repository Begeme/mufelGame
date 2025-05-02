"use client";
import { useState } from "react";
import Image from "next/image";
import { FaStar } from "react-icons/fa";

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

  return (
    <section className="bg-gray-800 py-10">
      <div className="container mx-auto text-center text-white">
        <h2 className="text-3xl font-bold mb-6">Lo que dicen los jugadores</h2>

        <div className="relative bg-gray-700 p-6 rounded-lg shadow-lg max-w-lg mx-auto">
          <div className="flex items-center mb-4">
            <Image
              src={testimonios[currentIndex].avatar}
              alt={testimonios[currentIndex].nombre}
              width={50}
              height={50}
              className="rounded-full mr-3"
            />
            <h4 className="text-lg font-bold">{testimonios[currentIndex].nombre}</h4>
          </div>

          <div className="flex justify-center mb-4 text-yellow-400">
            {Array.from({ length: 5 }).map((_, i) => (
              <FaStar key={i} size={22} className={i < testimonios[currentIndex].estrellas ? "text-yellow-400" : "text-gray-500"} />
            ))}
          </div>

          <p className="text-lg italic text-gray-300 text-center">&quot;{testimonios[currentIndex].comentario}</p>

          <div className="flex justify-between mt-4">
            <button
              onClick={prevTestimonial}
              className="bg-gray-600 px-4 py-2 rounded-lg hover:bg-gray-500 transition duration-300 cursor-pointer"
            >
              ⬅ Anterior
            </button>
            <button
              onClick={nextTestimonial}
              className="bg-gray-600 px-4 py-2 rounded-lg hover:bg-gray-500 transition duration-300 cursor-pointer"
            >
              Siguiente ➡
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
