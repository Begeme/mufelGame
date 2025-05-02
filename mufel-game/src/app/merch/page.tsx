"use client";
import Image from "next/image";
import Navbar from "../../../components/ui/Navbar";
import Footer from "../../../components/ui/Footer";
import ProductoModal, { Producto } from "../../../components/merch/ProductModal";
import { useState } from "react";

const productos: Producto[] = [
  {
    id: 1,
    nombre: "Mufel Pop",
    variantes: [
      {
        color: "Negro",
        disponible: true,
        imagenes: ["/img/mufel-pop.png"],
        precio: 24.99,
      },
      
    ],
  },
  {
    id: 2,
    nombre: "Sudadera MBH",
    variantes: [
      {
        color: "Blanco",
        disponible: true,
        imagenes: ["/img/sudadera-blanca1.png", "/img/sudadera-blanca2.png"],
        precio: 29.99,
      },
      {
        color: "Rojo",
        disponible: true,
        imagenes: ["/img/sudadera-blanca1.png"],
        precio: 29.99,
      },
      {
        color: "Azul",
        disponible: true,
        imagenes: ["/img/sudadera-blanca2.png"],
        precio: 29.99,
      },
      {
        color: "Amarillo",
        disponible: true,
        imagenes: ["/img/sudadera-blanca1.png"],
        precio: 29.99,
      },
    ],
  },
  {
    id: 3,
    nombre: "Taza MBH",
    variantes: [
      {
        color: "Negro",
        disponible: true,
        imagenes: ["/img/taza-negra.png"],
        precio: 12.99,
      },
      {
        color: "Blanco",
        disponible: true,
        imagenes: ["/img/taza-edicion-especial.png"],
        precio: 14.99,
      },
    ],
  },
  {
    id: 4,
    nombre: "Peluche Mufel",
    variantes: [
      {
        color: "Único",
        disponible: true,
        imagenes: ["/img/peluche-mufel.png"],
        precio: 19.99,
      },
    ],
  },
  {
    id: 5,
    nombre: "Alfombrilla Mufel",
    variantes: [
      {
        color: "Clásica",
        disponible: true,
        imagenes: ["/img/alfombrilla.png"],
        precio: 9.99,
      },
      {
        color: "XL",
        disponible: true,
        imagenes: ["/img/alfombrilla-xl.png"],
        precio: 14.99,
      },
    ],
  },
  {
    id: 6,
    nombre: "Gorra Mufel",
    variantes: [
      {
        color: "Negro",
        disponible: true,
        imagenes: ["/img/gorra-negra.png"],
        precio: 15.99,
      },
      {
        color: "Blanco",
        disponible: true,
        imagenes: ["/img/gorra-blanca.png"],
        precio: 15.99,
      },
      {
        color: "Edición Especial",
        disponible: true,
        imagenes: ["/img/gorra-edicion-especial.png"],
        precio: 18.99,
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
