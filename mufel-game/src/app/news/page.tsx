"use client";
import Image from "next/image";
import Navbar from "../../../components/ui/Navbar";
import Footer from "../../../components/ui/Footer";

const noticias = [
  {
    id: 1,
    titulo: "Nuevo Torneo Anunciado",
    descripcion: "Un torneo global está por comenzar, ¡prepárate!",
    imagen: "/img/logo-mufel.jpeg",
  },
  {
    id: 2,
    titulo: "Actualización de Balance",
    descripcion: "Nuevos ajustes en personajes y habilidades.",
    imagen: "/img/fondo-mufel.png",
  },
  {
    id: 3,
    titulo: "Modo Especial Disponible",
    descripcion: "Un nuevo modo de juego llega por tiempo limitado.",
    imagen: "/img/edificios.png",
  },
];

export default function NewsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gray-900 text-white py-10 pt-20">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Últimas Noticias</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {noticias.map((noticia) => (
              <div
                key={noticia.id}
                className="relative rounded-lg overflow-hidden group"
              >
                <Image
                  src={noticia.imagen}
                  alt={noticia.titulo}
                  width={300}
                  height={200}
                  className="w-full h-64 object-cover group-hover:scale-105 transition duration-300"
                />
                <div className="absolute inset-0 bg-black/50 group-hover:bg-black/60 transition duration-300"></div>
                <div className="absolute bottom-0 left-0 w-full p-4 text-white">
                  <h3 className="text-xl font-bold">{noticia.titulo}</h3>
                  <p className="text-gray-300">{noticia.descripcion}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
