interface SidebarStatsProps {
    gamesPlayed: number;
    avgKDA: string;
  }
  
  export default function SidebarStats({ stats }: { stats: SidebarStatsProps }) {
    return (
      <div className="bg-gray-800 p-4 rounded-lg text-white">
        <h3 className="text-lg font-bold mb-2">Estadísticas Generales</h3>
        <p>Partidas jugadas: {stats.gamesPlayed}</p>
        <p>Promedio de KDA: {stats.avgKDA}</p>
      </div>
    );
  }