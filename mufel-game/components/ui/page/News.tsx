import Image from "next/image";

const noticias = [
  {
    id: 1,
    titulo: "Nuevo Torneo Anunciado",
    descripcion: "Un torneo global está por comenzar, ¡prepárate!",
    imagen: "/img/fondo-mufel.png",
  },
  {
    id: 2,
    titulo: "Actualización de Balance",
    descripcion: "Nuevos ajustes en personajes y habilidades.",
    imagen: "/img/logo-mufel.jpeg",
  },
  {
    id: 3,
    titulo: "Modo Especial Disponible",
    descripcion: "Un nuevo modo de juego llega por tiempo limitado.",
    imagen: "/img/edificios.png",
  },
];

export default function News() {
  return (
    <section className="bg-gray-800 py-10">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold text-white mb-6">
          Últimas Noticias
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {noticias.map((noticia) => (
            <div
              key={noticia.id}
              className="relative rounded-lg overflow-hidden group"
            >
              {/* Imagen de fondo */}
              <Image
                src={noticia.imagen}
                alt={noticia.titulo}
                width={400}
                height={400}
                className="w-full h-72 object-cover transform group-hover:scale-105 transition duration-300"
              />

              {/* Capa oscura */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent group-hover:from-black/80 transition duration-300"></div>

              {/* Texto sobre la imagen */}
              <div className="absolute bottom-0 left-0 w-full p-4 text-white">
                <h3 className="text-2xl font-bold">{noticia.titulo}</h3>
                <p className="text-gray-300">{noticia.descripcion}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
