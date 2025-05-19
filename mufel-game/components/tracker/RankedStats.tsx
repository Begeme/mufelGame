interface RankedStatsProps {
  rank: string;
  expeditions: number;
  defeats: number;
}

export default function RankedStats({ stats }: { stats: RankedStatsProps }) {
  return (
    <div className="bg-gray-800 p-4 rounded-lg text-white border border-gray-700 shadow">
      <h3 className="text-lg font-bold mb-2 text-yellow-400">🎖️ Rango del Expedicionista</h3>
      <p><strong>Rango:</strong> {stats.rank}</p>
      <p><strong>Expediciones:</strong> {stats.expeditions}</p>
      <p><strong>Derrotas:</strong> {stats.defeats}</p>
    </div>
  );
}
