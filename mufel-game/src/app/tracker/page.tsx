"use client";
import { useState, useEffect } from "react";
import SearchBar from "../../../components/tracker/SearchBar";
import PlayerInfo from "../../../components/tracker/PlayerInfo";
import RankedStats from "../../../components/tracker/RankedStats";
import MatchHistory from "../../../components/tracker/MatchHistory";
import SidebarStats from "../../../components/tracker/SidebarStats";
import Footer from "../../../components/ui/Footer";

interface Player {
  avatar: string;
  username: string;
  level: number;
}

interface RankedStatsProps {
  rank: string;
  wins: number;
  losses: number;
}

interface Match {
  result: string;
  champion: string;
  kda: string;
}

interface SidebarStatsProps {
  gamesPlayed: number;
  avgKDA: string;
}

interface PlayerData {
  player: Player;
  rankedStats: RankedStatsProps;
  matchHistory: Match[];
  globalStats: SidebarStatsProps;
}

export default function TrackerPage() {
  const [playerData, setPlayerData] = useState<PlayerData | null>(null);

  useEffect(() => {
    // Datos por defecto al cargar la página
    const defaultData: PlayerData = {
      player: {
        avatar: "/img/logo-mufel.jpeg",
        username: "JugadorEjemplo",
        level: 50,
      },
      rankedStats: {
        rank: "Platino II",
        wins: 200,
        losses: 150,
      },
      matchHistory: [
        { result: "Victoria", champion: "Yasuo", kda: "12/5/9" },
        { result: "Derrota", champion: "Lux", kda: "3/8/12" },
        { result: "Victoria", champion: "Ezreal", kda: "7/2/14" },
      ],
      globalStats: {
        gamesPlayed: 500,
        avgKDA: "4.2",
      },
    };
    setPlayerData(defaultData);
  }, []);

  const handleSearch = async (username: string) => {
    // Simulación de datos obtenidos de una API
    const mockData: PlayerData = {
      player: {
        avatar: "/img/logo-mufel.jpeg",
        username,
        level: 30,
      },
      rankedStats: {
        rank: "Diamante IV",
        wins: 120,
        losses: 80,
      },
      matchHistory: [
        { result: "Victoria", champion: "Ahri", kda: "10/2/8" },
        { result: "Derrota", champion: "Zed", kda: "5/7/3" },
        { result: "Victoria", champion: "Jinx", kda: "12/4/10" },
      ],
      globalStats: {
        gamesPlayed: 200,
        avgKDA: "3.5",
      },
    };

    setPlayerData(mockData);
  };

  return (
    <div className="min-h-screen pt-20 flex flex-col justify-between">
      <div className="container mx-auto py-10 flex-grow">
        <div className="flex flex-col items-center">
          <SearchBar onSearch={handleSearch} />
        </div>
        {playerData && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div className="md:col-span-1">
              <PlayerInfo player={playerData.player} />
              <SidebarStats stats={playerData.globalStats} />
            </div>
            <div className="md:col-span-2 mb-8 space-y-6">
              <RankedStats stats={playerData.rankedStats} />
              <MatchHistory matches={playerData.matchHistory} />
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}