"use client";

export default function Introduction() {
  return (
    <section className="relative bg-black text-white min-h-screen flex items-center justify-center text-center overflow-hidden pt-0">
      {/* Video de fondo */}
      <video 
        autoPlay 
        loop 
        muted 
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/videos/plataformas.mp4" type="video/mp4" />
        Tu navegador no soporta el video.
      </video>
      
      {/* Overlay para mejorar legibilidad */}
      <div className="absolute inset-0 bg-black/50 z-0"></div>

      {/* Contenido principal */}
      <div className="relative z-10 max-w-3xl">
        <h1 className="text-5xl font-bold">Bienvenido a MufelGame</h1>
        <p className="mt-4 text-xl">Descubre un mundo lleno de desafíos y aventuras.</p>
      </div>
    </section>
  );
}