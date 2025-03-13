"use client";
import { useState } from "react";

const rankings = {
  plataformas: [
    { nombre: "ShadowKiller", puntos: 9820 },
    { nombre: "DragonMaster", puntos: 9450 },
    { nombre: "PhoenixRise", puntos: 9200 },
    { nombre: "LegendX", puntos: 8800 },
    { nombre: "NightHawk", puntos: 8600 },
  ],
  roguelike: [
    { nombre: "RogueKing", puntos: 15000 },
    { nombre: "DarkHunter", puntos: 14200 },
    { nombre: "NightSlayer", puntos: 13800 },
    { nombre: "UndeadWarrior", puntos: 13500 },
    { nombre: "PhantomBlade", puntos: 12900 },
  ],
};

export default function Ranking() {
  const [selectedMode, setSelectedMode] = useState<"plataformas" | "roguelike">(
    "plataformas"
  );

  return (
    <section className="bg-gray-800 py-10">
      <div className="container mx-auto text-center text-white">
        <h2 className="text-3xl font-bold mb-6">Ranking de Jugadores</h2>

        {/* Botones de selección */}
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

        {/* Tabla del ranking */}
        <div className="w-full max-w-lg mx-auto bg-gray-700 p-6 rounded-lg shadow-lg">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-500">
                <th className="py-2">#</th>
                <th className="py-2">Jugador</th>
                <th className="py-2 text-right">Puntos</th>
              </tr>
            </thead>
            <tbody>
              {rankings[selectedMode].map((jugador, index) => (
                <tr key={index} className="border-b border-gray-600">
                  <td className="py-2">{index + 1}</td>
                  <td className="py-2">{jugador.nombre}</td>
                  <td className="py-2 text-right text-yellow-400">
                    {jugador.puntos}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
