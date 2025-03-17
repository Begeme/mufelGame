"use client";
import { useState } from "react";
import Image from "next/image";

const tienda = {
  skins: [
    {
      nombre: "Armadura Dragón",
      precio: "500 monedas",
      imagen: "/img/fondo-mufel.png",
      descripcion: "Una armadura legendaria con detalles de dragón.",
    },
    {
      nombre: "Espada Legendaria",
      precio: "300 monedas",
      imagen: "/img/logo-mufel.jpeg",
      descripcion: "Una espada mítica con poder oculto.",
    },
  ],
  recompensas: [
    {
      nombre: "Paquete de Monedas",
      precio: "1000 monedas",
      imagen: "/img/coins.png",
      descripcion: "Obtén 1000 monedas para comprar más skins.",
    },
    {
      nombre: "Boost de Experiencia",
      precio: "Gratis",
      imagen: "/img/exp-boost.png",
      descripcion: "Duplica tu experiencia por 24 horas.",
    },
  ],
};

export default function Shop() {
  const [selectedCategory, setSelectedCategory] = useState<"skins" | "recompensas">(
    "skins"
  );

  return (
    <section className="bg-gray-900 py-10">
      <div className="container mx-auto text-center text-white">
        <h2 className="text-3xl font-bold mb-6">Tienda de Skins y Recompensas</h2>

        <div className="flex justify-center space-x-6 mb-6">
          <button
            className={`px-6 py-3 text-lg font-bold rounded-lg transition duration-300 transform ${
              selectedCategory === "skins"
                ? "bg-yellow-500 text-black scale-105"
                : "bg-gray-700 hover:bg-yellow-400"
            }`}
            onClick={() => setSelectedCategory("skins")}
          >
            Skins
          </button>

          <button
            className={`px-6 py-3 text-lg font-bold rounded-lg transition duration-300 transform ${
              selectedCategory === "recompensas"
                ? "bg-yellow-500 text-black scale-105"
                : "bg-gray-700 hover:bg-yellow-400"
            }`}
            onClick={() => setSelectedCategory("recompensas")}
          >
            Recompensas
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tienda[selectedCategory].map((item, index) => (
            <div key={index} className="bg-gray-800 p-6 rounded-lg shadow-lg text-left">
              <Image
                src={item.imagen}
                alt={item.nombre}
                width={300}
                height={200}
                className="w-full h-40 object-cover rounded-md mb-3"
              />
              <h3 className="text-xl font-bold">{item.nombre}</h3>
              <p className="text-gray-300 mt-2">{item.descripcion}</p>
              <p className="mt-2 font-semibold text-yellow-400">{item.precio}</p>
              <button className="mt-4 bg-yellow-500 text-black px-4 py-2 rounded-lg font-bold hover:bg-yellow-400 transition duration-300">
                Comprar
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
