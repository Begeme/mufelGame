"use client";
import { useState } from "react";
import Image from "next/image";

const gameModes = {
  plataformas: {
    titulo: "Modo Plataformas",
    descripcion:
      "Supera obstáculos, salta entre plataformas y demuestra tu precisión en este emocionante modo de juego.",
    video: "/videos/plataformas.mp4",
    imagen: "/img/fondo-mufel.png",
  },
  roguelike: {
    titulo: "Modo Roguelike",
    descripcion:
      "Enfréntate a enemigos en un mundo generado proceduralmente, con mejoras y desafíos en cada partida.",
    video: "/videos/roguelike.mp4",
    imagen: "/img/logo-mufel.jpeg",
  },
};

export default function GameModes() {
  const [selectedMode, setSelectedMode] = useState<"plataformas" | "roguelike">(
    "plataformas"
  );

  return (
    <section className="bg-gray-900 py-10">
      <div className="container mx-auto text-center text-white">
        <h2 className="text-3xl font-bold mb-6">Modos de Juego</h2>

        <div className="flex justify-center space-x-6 mb-6">
          <button
            className={`px-6 py-3 text-lg font-bold rounded-lg transition duration-300 transform ${
              selectedMode === "plataformas"
                ? "bg-yellow-500 text-black scale-105"
                : "bg-gray-700 hover:bg-yellow-400"
            }`}
            onClick={() => setSelectedMode("plataformas")}
          >
            Plataformas
          </button>

          <button
            className={`px-6 py-3 text-lg font-bold rounded-lg transition duration-300 transform ${
              selectedMode === "roguelike"
                ? "bg-yellow-500 text-black scale-105"
                : "bg-gray-700 hover:bg-yellow-400"
            }`}
            onClick={() => setSelectedMode("roguelike")}
          >
            Roguelike
          </button>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
          <div className="w-full md:w-1/2">
            {gameModes[selectedMode].video ? (
              <video
                key={gameModes[selectedMode].video}
                autoPlay
                loop
                muted
                className="w-full h-64 object-cover rounded-lg shadow-lg"
                
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
          </div>

          <div className="w-full md:w-1/2 text-left">
            <h3 className="text-2xl font-bold">{gameModes[selectedMode].titulo}</h3>
            <p className="text-gray-300 mt-2">{gameModes[selectedMode].descripcion}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
