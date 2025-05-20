"use client";
import { useState } from "react";

interface Evento {
  nombre: string;
  fecha: string;
  premio: string;
  descripcion: string;
}

const eventos: {
  torneos: Evento[];
  eventos_vivos: Evento[];
} = {
  torneos: [],
  eventos_vivos: [],
};

export default function Events() {
  const [selectedType, setSelectedType] = useState<"torneos" | "eventos_vivos">("torneos");
  const hayEventos = eventos[selectedType].length > 0;

  return (
    <section className="bg-gray-900 py-10">
      <div className="container mx-auto text-center text-white">
        <h2 className="text-3xl font-bold mb-6">Eventos en Vivo y Torneos</h2>

        <div className="flex justify-center space-x-6 mb-6">
          <button
            className={`px-6 py-3 text-lg font-bold rounded-lg transition duration-300 transform ${
              selectedType === "torneos"
                ? "bg-yellow-500 text-black scale-105"
                : "bg-gray-700 hover:bg-yellow-400"
            }`}
            onClick={() => setSelectedType("torneos")}
          >
            Torneos
          </button>

          <button
            className={`px-6 py-3 text-lg font-bold rounded-lg transition duration-300 transform ${
              selectedType === "eventos_vivos"
                ? "bg-yellow-500 text-black scale-105"
                : "bg-gray-700 hover:bg-yellow-400"
            }`}
            onClick={() => setSelectedType("eventos_vivos")}
          >
            Eventos en Vivo
          </button>
        </div>

        {hayEventos ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {eventos[selectedType].map((evento, index) => (
              <div key={index} className="bg-gray-800 p-6 rounded-lg shadow-lg text-left">
                <h3 className="text-xl font-bold">{evento.nombre}</h3>
                <p className="text-yellow-400">{evento.fecha}</p>
                <p className="text-gray-300 mt-2">{evento.descripcion}</p>
                <p className="mt-2 font-semibold">🏆 {evento.premio}</p>
                <button className="mt-4 bg-yellow-500 text-black px-4 py-2 rounded-lg font-bold hover:bg-yellow-400 transition duration-300">
                  Participar
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-gray-800 rounded-xl p-8 max-w-xl mx-auto shadow-lg">
            <h3 className="text-2xl font-semibold mb-4">🎉 ¡Pronto nuevos {selectedType === "torneos" ? "torneos" : "eventos"}!</h3>
            <p className="text-gray-400">
              Actualmente no hay {selectedType === "torneos" ? "torneos" : "eventos en vivo"} activos.
              <br />
              Vuelve más adelante para participar en los próximos desafíos.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
