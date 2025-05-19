interface SidebarStatsProps {
  expeditions: number;
  bestTime: string;
  highestKills: number;
  points?: number;
}

export default function SidebarStats({ stats }: { stats: SidebarStatsProps }) {
  return (
    <div className="bg-gray-800 p-6 mt-4 rounded-2xl shadow-lg border border-gray-700">
      <h2 className="text-2xl font-bold mb-4 text-yellow-400">📊 Estadísticas</h2>
      <ul className="space-y-2 text-white text-sm">
        <li>
          <span className="font-semibold">Expediciones completadas:</span>{" "}
          {stats.expeditions}
        </li>
        <li>
          <span className="font-semibold">Mejor tiempo:</span>{" "}
          {stats.bestTime}
        </li>
        <li>
          <span className="font-semibold">Máx. enemigos eliminados:</span>{" "}
          {stats.highestKills}
        </li>
        {stats.points !== undefined && (
          <li>
            <span className="font-semibold">Puntos totales:</span>{" "}
            {stats.points}
          </li>
        )}
      </ul>
    </div>
  );
}
