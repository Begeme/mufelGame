interface Match {
    result: string;
    champion: string;
    kda: string;
  }
  
  export default function MatchHistory({ matches }: { matches: Match[] }) {
    return (
      <div className="bg-gray-800 p-4 rounded-lg text-white">
        <h3 className="text-lg font-bold mb-2">Historial de Partidas</h3>
        {matches.map((match, index) => (
          <div key={index} className="border-b border-gray-600 py-2">
            <p className={match.result === "Victoria" ? "text-green-400" : "text-red-400"}>
              {match.result} - {match.champion}
            </p>
            <p>{match.kda} KDA</p>
          </div>
        ))}
      </div>
    );
  }