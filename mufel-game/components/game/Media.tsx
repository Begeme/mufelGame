"use client";
import Image from "next/image";

const images = [
  "/img/mbh-zapatillas.webp",
  "/img/edificios.png",
  "/img/fondo-mufel.png",
  "/img/logo-mufel.jpeg",
];

const videos = [
  "/videos/plataformas.mp4",
  "/videos/roguelike.mp4",
];

export default function Media() {
  return (
    <section className="bg-gray-900 text-white py-20 text-center flex flex-col items-center">
      <div className="max-w-5xl">
        <h2 className="text-4xl font-bold">Galería y Videos</h2>
        <p className="mt-4 text-lg text-gray-300">
          Descubre imágenes y videos de MufelGame en acción. Sumérgete en su mundo y prepárate para la batalla.
        </p>

        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6">
          {images.map((src, index) => (
            <div key={index} className="relative w-full h-40 md:h-48 overflow-hidden rounded-lg shadow-lg">
              <Image 
                src={src} 
                alt={`Galería ${index + 1}`} 
                layout="fill" 
                objectFit="cover" 
                className="hover:scale-110 transition-transform duration-300"
              />
            </div>
          ))}
        </div>

        <div className="mt-16">
          <h3 className="text-3xl font-bold text-yellow-500">Videos Destacados</h3>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-8">
            {videos.map((video, index) => (
              <div key={index} className="relative w-full">
                <video controls className="rounded-lg w-full shadow-lg">
                  <source src={video} type="video/mp4" />
                  Tu navegador no soporta el video.
                </video>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
