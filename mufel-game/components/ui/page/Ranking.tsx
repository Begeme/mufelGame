"use client";

export default function Ranking() {
  const rankingRoguelike = [
    { nombre: "RogueKing", puntos: 15000 },
    { nombre: "DarkHunter", puntos: 14200 },
    { nombre: "NightSlayer", puntos: 13800 },
    { nombre: "UndeadWarrior", puntos: 13500 },
    { nombre: "PhantomBlade", puntos: 12900 },
    { nombre: "BloodReaper", puntos: 12400 },
    { nombre: "GhostFury", puntos: 11900 },
    { nombre: "HellWalker", puntos: 11300 },
    { nombre: "GrimSoul", puntos: 11000 },
    { nombre: "DreadKnight", puntos: 10700 },
  ];

  return (
    <section className="bg-gray-950 py-16 border-t border-gray-800">
      <div className="max-w-4xl mx-auto px-4 text-white">
        <h2 className="text-4xl font-bold text-center mb-10 text-yellow-400">
          🏆 Top 10 Roguelike
        </h2>

        <div className="overflow-hidden rounded-2xl shadow-lg border border-gray-700 bg-gray-800">
          <table className="w-full text-sm sm:text-base">
            <thead className="bg-gray-900 text-yellow-500">
              <tr>
                <th className="px-4 py-3 text-left">#</th>
                <th className="px-4 py-3 text-left">Jugador</th>
                <th className="px-4 py-3 text-right">Puntos</th>
              </tr>
            </thead>
            <tbody>
              {rankingRoguelike.map((jugador, index) => (
                <tr
                  key={index}
                  className={`border-b border-gray-700 ${
                    index === 0
                      ? "bg-yellow-500 text-black font-bold"
                      : "hover:bg-gray-700 transition"
                  }`}
                >
                  <td className="px-4 py-3">{index + 1}</td>
                  <td className="px-4 py-3">{jugador.nombre}</td>
                  <td className="px-4 py-3 text-right text-yellow-400">
                    {jugador.puntos.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
