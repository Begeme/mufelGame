"use client";
import { useState } from "react";
import { FaGamepad, FaDungeon } from "react-icons/fa";
import { MdOutlineCategory } from "react-icons/md";

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
    <section className="bg-gray-900 text-white py-20 flex flex-col items-center">
      <h2 className="text-4xl font-bold text-center mb-6">Modos de Juego</h2>

      <div className="mt-4 flex items-center">
        <div
          className="relative w-48 h-12 bg-gray-700 rounded-full flex items-center cursor-pointer transition"
          onClick={() => setIsPlataformas(!isPlataformas)}
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
        </div>
      </div>

      <div className="mt-10 max-w-4xl bg-gray-800 p-8 rounded-lg shadow-lg text-center">
        <h3 className="text-3xl font-bold flex items-center justify-center gap-2">
          {isPlataformas ? <FaGamepad /> : <FaDungeon />} 
          {gameModes[selectedMode].title}
        </h3>
        <p className="text-lg text-gray-300 mt-4">
          {gameModes[selectedMode].description}
        </p>

        <div className="mt-6 bg-gray-700 p-4 rounded-lg">
          <h4 className="text-xl font-bold text-yellow-400 flex items-center justify-center gap-2">
            <MdOutlineCategory /> Historia
          </h4>
          <p className="text-gray-300 mt-2">{gameModes[selectedMode].history}</p>
        </div>

        <div className="mt-6 bg-gray-700 p-4 rounded-lg">
          <h4 className="text-xl font-bold text-yellow-400 flex items-center justify-center gap-2">
            ⭐ Características
          </h4>
          <ul className="text-gray-300 mt-2 list-disc list-inside space-y-2">
            {gameModes[selectedMode].characteristics.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
