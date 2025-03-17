"use client";
import Image from "next/image";
import Navbar from "../../../components/ui/Navbar";
import Footer from "../../../components/ui/Footer";

const productos = [
  { id: 1, nombre: "Zapatillas MBH", precio: "24.99€", imagen: "/img/mbh-zapatillas.webp" },
  { id: 2, nombre: "Sudadera MBH", precio: "29.99€", imagen: "/img/modelo-f-mbh.webp" },
  { id: 3, nombre: "Camiseta MBH", precio: "14.99€", imagen: "/img/modelo-mbh.webp" },
];

export default function MerchPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gray-900 text-white py-10 pt-20">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Tienda de Merchandising</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {productos.map((producto) => (
              <div key={producto.id} className="bg-gray-800 p-4 rounded-lg">
                <Image
                  src={producto.imagen}
                  alt={producto.nombre}
                  width={300}
                  height={200}
                  className="w-full h-64 object-contain rounded-md"
                />
                <h3 className="text-xl font-bold mt-4">{producto.nombre}</h3>
                <p className="text-yellow-400 text-lg">{producto.precio}</p>
                <button className="mt-4 bg-yellow-500 px-4 py-2 rounded text-black font-bold hover:bg-yellow-400">
                  Comprar
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
