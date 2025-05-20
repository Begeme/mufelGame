"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabaseClient";

import SearchBar from "../../../components/tracker/SearchBar";
import PlayerInfo from "../../../components/tracker/PlayerInfo";
import RankedStats from "../../../components/tracker/RankedStats";
import MatchHistory from "../../../components/tracker/MatchHistory";
import SidebarStats from "../../../components/tracker/SidebarStats";
import Footer from "../../../components/ui/Footer";
import { getFullPlayerData } from "@/utils/playerMock";
import { motion, AnimatePresence } from "framer-motion";

interface Player {
  avatar: string;
  username: string;
  level: number;
}

interface RankedStatsProps {
  rank: string;
  expeditions: number;
  defeats: number;
}

interface Match {
  outcome: string;
  playtime: string;
  kills: number;
  rooms: number;
}

interface SidebarStatsProps {
  expeditions: number;
  bestTime: string;
  highestKills: number;
  points?: number;
}

interface PlayerData {
  player: Player;
  rankedStats: RankedStatsProps;
  matchHistory: Match[];
  globalStats: SidebarStatsProps;
}

export default function TrackerPage() {
  const [playerData, setPlayerData] = useState<PlayerData | null>(null);
  const [topPlayers, setTopPlayers] = useState<PlayerData[]>([]);

  useEffect(() => {
    const fetchTopPlayers = async () => {
      const { data: rankings, error } = await supabase
        .from("rankings")
        .select("points, user_id")
        .order("points", { ascending: false })
        .limit(3);

      if (error) return console.error("Error cargando rankings:", error);

      const players: PlayerData[] = await Promise.all(
        rankings.map(async (r) => {
          const { data: user } = await supabase
            .from("users")
            .select("username, avatar_url")
            .eq("id", r.user_id)
            .single();

          const playerData = getFullPlayerData(
            r.user_id,
            user?.username || "Desconocido",
            user?.avatar_url,
            r.points
          );

          return playerData;
        })
      );

      setTopPlayers(players);
    };

    fetchTopPlayers();
  }, []);

  const handleSearch = async (username: string) => {
    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("id, username, avatar_url, email")
      .eq("username", username)
      .single();

    if (userError || !userData) return setPlayerData(null);

    const { data: rankingData } = await supabase
      .from("rankings")
      .select("points")
      .eq("user_id", userData.id)
      .single();

    const fetchedData = getFullPlayerData(
      userData.id,
      userData.username,
      userData.avatar_url,
      rankingData?.points || 0
    );

    setPlayerData(fetchedData);
  };

  return (
    <div className="min-h-screen pt-32 bg-gradient-to-b from-black via-gray-900 to-gray-950 text-white">
      <div className="container mx-auto px-4 py-10 pb-24 flex-grow">
        <motion.div
          className="flex flex-col items-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold mb-4">
            🏆 Clasificación de Expedicionistas
          </h1>
          <p className="text-gray-400 mb-6 text-center max-w-xl">
            Revisa los mejores jugadores de la semana en MufelGame o busca tu
            perfil para ver tu progreso.
          </p>
          <SearchBar onSearch={handleSearch} />
        </motion.div>

        <AnimatePresence mode="wait">
          {playerData ? (
            <motion.div
              key="playerData"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
            >
              <div className="md:col-span-1">
                <PlayerInfo player={playerData.player} />
                <SidebarStats stats={playerData.globalStats} />
              </div>
              <div className="md:col-span-2 space-y-6">
                <RankedStats stats={playerData.rankedStats} />
                <MatchHistory matches={playerData.matchHistory} />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="topPlayers"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {topPlayers.map((player, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.1 }}
                  className="bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-700"
                >
                  <PlayerInfo player={player.player} />
                  <SidebarStats stats={player.globalStats} />
                  <RankedStats stats={player.rankedStats} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <Footer />
    </div>
  );
}
