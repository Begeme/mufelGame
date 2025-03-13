"use client";
import { useState } from "react";
import Image from "next/image";
import { FaStar } from "react-icons/fa";

const testimonios = [
  {
    nombre: "Carlos G.",
    avatar: "/img/user1.jpg",
    comentario: "¡El mejor juego que he jugado en años! La jugabilidad es increíble.",
    estrellas: 5,
  },
  {
    nombre: "Laura P.",
    avatar: "/img/user2.jpg",
    comentario: "Me encanta el modo Roguelike. Cada partida es un desafío diferente.",
    estrellas: 4,
  },
  {
    nombre: "Diego M.",
    avatar: "/img/user3.jpg",
    comentario: "Los gráficos y la jugabilidad son increíbles. ¡Muy recomendado!",
    estrellas: 5,
  },
  {
    nombre: "Andrea R.",
    avatar: "/img/user4.jpg",
    comentario: "Los eventos en vivo son emocionantes. Siempre hay algo nuevo.",
    estrellas: 4,
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
          {/* Avatar del usuario */}
          <Image
            src={testimonios[currentIndex].avatar}
            alt={testimonios[currentIndex].nombre}
            width={80}
            height={80}
            className="mx-auto rounded-full mb-3"
          />

          {/* Comentario */}
          <p className="text-lg italic">&quot;{testimonios[currentIndex].comentario}</p>

          {/* Estrellas */}
          <div className="flex justify-center mt-2 text-yellow-400">
            {Array.from({ length: testimonios[currentIndex].estrellas }).map((_, i) => (
              <FaStar key={i} size={20} />
            ))}
          </div>

          {/* Nombre */}
          <h4 className="mt-2 font-bold">{testimonios[currentIndex].nombre}</h4>

          {/* Controles para cambiar de testimonio */}
          <div className="flex justify-between mt-4">
            <button
              onClick={prevTestimonial}
              className="bg-gray-600 px-4 py-2 rounded-lg hover:bg-gray-500 transition duration-300"
            >
              ⬅ Anterior
            </button>
            <button
              onClick={nextTestimonial}
              className="bg-gray-600 px-4 py-2 rounded-lg hover:bg-gray-500 transition duration-300"
            >
              Siguiente ➡
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
