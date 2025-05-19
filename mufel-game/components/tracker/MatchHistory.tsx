interface Match {
  outcome: string;
  playtime: string;
  kills: number;
  rooms: number;   
}

export default function MatchHistory({ matches }: { matches: Match[] }) {
  return (
    <div className="bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-700">
      <h2 className="text-2xl font-bold mb-4 text-yellow-400">🧾 Últimas Expediciones</h2>
      <div className="space-y-4">
        {matches.map((match, index) => (
          <div
            key={index}
            className={`p-4 rounded-xl border border-gray-700 bg-gray-900 transition hover:scale-[1.01] hover:border-yellow-500`}
          >
            <div className="flex flex-col md:flex-row md:justify-between md:items-center">
              <div className="mb-2 md:mb-0">
                <p className={`text-lg font-semibold ${match.outcome === "Victoria" ? "text-green-400" : "text-red-400"}`}>
                  {match.outcome}
                </p>
                <p className="text-gray-300 text-sm">Duración: {match.playtime}</p>
              </div>
              <div className="text-gray-200 text-sm md:text-right">
                <p><strong>Enemigos Asesinados:</strong> {match.kills}</p>
                <p><strong>Salas Recorridas:</strong> {match.rooms}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
