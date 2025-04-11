"use client";
import Image from "next/image";
import Navbar from "../../../components/ui/Navbar";
import Footer from "../../../components/ui/Footer";
import ProductoModal, { Producto } from "../../../components/merch/ProductModal";
import { useState } from "react";

const productos: Producto[] = [
  {
    id: 1,
    nombre: "Zapatillas MBH",
    variantes: [
      {
        color: "Negro",
        disponible: true,
        imagenes: ["/img/mbh-zapatillas.webp", "/img/mbh-zapatillas.webp"],
        precio: 24.99,
      },
      {
        color: "Blanco",
        disponible: false,
        imagenes: ["/img/logo-mufel.jpg", "/img/logo-sin-fondo.png"],
        precio: 24.99,
      },
    ],
  },
  {
    id: 2,
    nombre: "Sudadera MBH",
    variantes: [
      {
        color: "Negro",
        disponible: true,
        imagenes: ["/img/modelo-mbh.webp"],
        precio: 29.99,
      },
    ],
  },
];

export default function MerchPage() {
  const [productoSeleccionado, setProductoSeleccionado] = useState<Producto | null>(null);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gray-900 text-white py-10 pt-20">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Tienda de Merchandising</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {productos.map((producto) => {
              const varianteActiva =
                producto.variantes.find((v) => v.disponible) || producto.variantes[0];

              return (
                <div
                  key={producto.id}
                  className="bg-gray-800 p-4 rounded-lg cursor-pointer hover:shadow-lg transition"
                  onClick={() => setProductoSeleccionado(producto)}
                >
                  <Image
                    src={varianteActiva.imagenes[0]}
                    alt={`${producto.nombre} - ${varianteActiva.color}`}
                    width={300}
                    height={200}
                    className="w-full h-64 object-contain rounded-md"
                  />
                  <h3 className="text-xl font-bold mt-4">{producto.nombre}</h3>
                  <p
                    className={`text-lg ${
                      varianteActiva.disponible ? "text-yellow-400" : "text-gray-400"
                    }`}
                  >
                    {varianteActiva.disponible
                      ? `${varianteActiva.precio}€`
                      : "Próximamente"}
                  </p>
                  <button
                    disabled={!varianteActiva.disponible}
                    className={`mt-4 px-4 py-2 rounded text-black font-bold transition ${
                      varianteActiva.disponible
                        ? "bg-yellow-500 hover:bg-yellow-400"
                        : "bg-gray-600 cursor-not-allowed"
                    }`}
                  >
                    {varianteActiva.disponible ? "Ver más" : "Próximamente"}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </main>
      <Footer />

      {productoSeleccionado && (
        <ProductoModal
          producto={productoSeleccionado}
          onClose={() => setProductoSeleccionado(null)}
        />
      )}
    </div>
  );
}
