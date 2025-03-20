"use client";

export default function Roles() {
  return (
    <section className="bg-gray-800 text-white py-20 text-center">
      <h2 className="text-3xl font-bold">Roles en el Juego</h2>
      <p className="mt-4 text-lg">Elige el rol que más se adapte a tu estilo.</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <div className="bg-gray-700 p-6 rounded-lg">
          <h3 className="text-xl font-bold">Guerrero</h3>
          <p>Especialista en combate cuerpo a cuerpo.</p>
        </div>
        <div className="bg-gray-700 p-6 rounded-lg">
          <h3 className="text-xl font-bold">Mago</h3>
          <p>Usa hechizos poderosos para derrotar a tus enemigos.</p>
        </div>
        <div className="bg-gray-700 p-6 rounded-lg">
          <h3 className="text-xl font-bold">Arquero</h3>
          <p>Combate a distancia con una puntería mortal.</p>
        </div>
      </div>
    </section>
  );
}
