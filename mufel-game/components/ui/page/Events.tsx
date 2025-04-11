"use client";
import { useState } from "react";

const eventos = {
  torneos: [
    {
      nombre: "Torneo de Verano",
      fecha: "25 de Julio",
      premio: "10,000 monedas",
      descripcion: "Compite contra los mejores jugadores y gana recompensas exclusivas.",
    },
    {
      nombre: "Batalla de Clanes",
      fecha: "15 de Agosto",
      premio: "Trofeo especial",
      descripcion: "Forma un equipo y participa en el torneo de clanes más épico.",
    },
  ],
  eventos_vivos: [
    {
      nombre: "Modo Especial: Sin Límite",
      fecha: "1 - 7 de Agosto",
      premio: "Recompensas exclusivas",
      descripcion: "Modo de juego sin restricciones con recompensas diarias.",
    },
    {
      nombre: "Evento de Doble XP",
      fecha: "20 - 22 de Agosto",
      premio: "Doble experiencia",
      descripcion: "Gana el doble de XP en todas tus partidas durante este evento.",
    },
  ],
};

export default function Events() {
  const [selectedType, setSelectedType] = useState<"torneos" | "eventos_vivos">(
    "torneos"
  );

  return (
    <section className="bg-gray-900 py-10">
      <div className="container mx-auto text-center text-white">
        <h2 className="text-3xl font-bold mb-6">Eventos en Vivo y Torneos</h2>

        <div className="flex justify-center space-x-6 mb-6">
          <button
            className={`px-6 py-3 text-lg font-bold rounded-lg transition duration-300 cursor-pointer transform ${
              selectedType === "torneos"
                ? "bg-yellow-500 text-black scale-105"
                : "bg-gray-700 hover:bg-yellow-400"
            }`}
            onClick={() => setSelectedType("torneos")}
          >
            Torneos
          </button>

          <button
            className={`px-6 py-3 text-lg font-bold rounded-lg transition duration-300 cursor-pointer transform ${
              selectedType === "eventos_vivos"
                ? "bg-yellow-500 text-black scale-105"
                : "bg-gray-700 hover:bg-yellow-400"
            }`}
            onClick={() => setSelectedType("eventos_vivos")}
          >
            Eventos en Vivo
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {eventos[selectedType].map((evento, index) => (
            <div key={index} className="bg-gray-800 p-6 rounded-lg shadow-lg text-left">
              <h3 className="text-xl font-bold">{evento.nombre}</h3>
              <p className="text-yellow-400">{evento.fecha}</p>
              <p className="text-gray-300 mt-2">{evento.descripcion}</p>
              <p className="mt-2 font-semibold">🏆 {evento.premio}</p>
              <button className="mt-4 bg-yellow-500 text-black px-4 py-2 rounded-lg font-bold hover:bg-yellow-400 transition cursor-pointer duration-300">
                Participar
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
