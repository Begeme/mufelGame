interface RankedStatsProps {
    rank: string;
    wins: number;
    losses: number;
  }
  
  export default function RankedStats({ stats }: { stats: RankedStatsProps }) {
    return (
      <div className="bg-gray-800 p-4 rounded-lg text-white">
        <h3 className="text-lg font-bold mb-2">Estadísticas Clasificatorias</h3>
        <p>Rango: {stats.rank}</p>
        <p>Victorias: {stats.wins}</p>
        <p>Derrotas: {stats.losses}</p>
      </div>
    );
  }