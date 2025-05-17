"use client";
import { useState } from "react";

const gameModes = {
  plataformas: {
    title: "Modo Plataformas",
    movement: "Mueve con A (izquierda), D (derecha), salta con ESPACIO.",
    combat: "Clic izquierdo: Lanza bola de fuego. Clic derecho: Cubrirse.",
    objective: "Llega a la meta final sin morir, escapando o eliminando enemigos.",
    videos: {
      movement: "/videos/plataformas.mp4",
      combat: "/videos/plataformas.mp4",
      objective: "/videos/plataformas.mp4",
    },
  },
  roguelike: {
    title: "Modo Roguelike",
    movement: "Mueve con W, A, S, D en todas las direcciones.",
    combat: "Clic izquierdo: Ataca.",
    objective: "Desbloquea salas de la mazmorra hasta encontrar la puerta de salida.",
    videos: {
      movement: "/videos/roguelike.mp4",
      combat: "/videos/roguelike.mp4",
      objective: "/videos/roguelike.mp4",
    },
  },
};

export default function HowToPlay() {
  const [isPlataformas, setIsPlataformas] = useState(true);
  const [selectedSection, setSelectedSection] = useState<"movement" | "combat" | "objective">("movement");

  const selectedMode = isPlataformas ? "plataformas" : "roguelike";

  return (
    <section className="bg-gray-800 text-white py-20 min-h-screen flex flex-col items-center">
      <h2 className="text-4xl font-bold text-center">Cómo Jugar</h2>

      <div className="mt-6 flex items-center">
        <div
          className="relative w-52 h-12 bg-gray-700 rounded-full flex items-center cursor-pointer transition"
          onClick={() => setIsPlataformas(!isPlataformas)}
        >
          <span
            className={`w-1/2 text-center text-sm font-bold transition-all px-4 ${
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
            className={`w-1/2 text-center text-sm font-bold transition-all px-4 ${
              isPlataformas ? "text-gray-300" : "text-black"
            }`}
          >
            Roguelike
          </span>
        </div>
      </div>

      <div className="mt-10 w-full max-w-6xl flex flex-col md:flex-row items-center justify-center space-y-8 md:space-y-0 md:space-x-16">
        
        <div className="w-full md:w-1/2 flex flex-col items-center">
          <div className="flex space-x-4">
            {["movement", "combat", "objective"].map((key) => (
              <button 
                key={key} 
                onClick={() => setSelectedSection(key as "movement" | "combat" | "objective")}
                className={`px-6 py-2 rounded-lg font-bold transition ${
                  selectedSection === key ? "bg-yellow-500 text-black" : "bg-gray-700 hover:bg-yellow-400"
                }`}
              >
                {key === "movement" ? "Movimiento" : key === "combat" ? "Combate" : "Objetivo"}
              </button>
            ))}
          </div>

          <div className="mt-6 bg-gray-700 p-6 rounded-lg text-center w-full">
            <h3 className="text-2xl font-bold">{gameModes[selectedMode].title}</h3>
            <p className="mt-2 text-lg">{gameModes[selectedMode][selectedSection]}</p>
          </div>
        </div>

        <div className="w-full md:w-1/2 flex justify-center">
          <video key={selectedSection + selectedMode} controls className="rounded-lg w-full max-w-xl">
            <source src={gameModes[selectedMode].videos[selectedSection]} type="video/mp4" />
            Tu navegador no soporta el video.
          </video>
        </div>
      </div>
    </section>
  );
}
