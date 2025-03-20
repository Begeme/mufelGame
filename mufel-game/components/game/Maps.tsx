"use client";

export default function Maps() {
  return (
    <section className="bg-gray-900 text-white py-20 text-center">
      <h2 className="text-3xl font-bold">Mapas del Juego</h2>
      <p className="mt-4 text-lg">Explora los distintos escenarios en los que puedes jugar.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="bg-gray-700 p-6 rounded-lg">
          <h3 className="text-xl font-bold">Bosque Encantado</h3>
          <p>Un denso bosque lleno de criaturas mágicas.</p>
        </div>
        <div className="bg-gray-700 p-6 rounded-lg">
          <h3 className="text-xl font-bold">Ciudad Abandonada</h3>
          <p>Un lugar misterioso con secretos ocultos.</p>
        </div>
      </div>
    </section>
  );
}