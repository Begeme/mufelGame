"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "../../../../lib/supabaseClient";
import { getFullPlayerData } from "@/utils/playerMock";
import Footer from "../../../../components/ui/Footer";
import { motion } from "framer-motion";
import Image from "next/image";

interface PublicProfileData {
  player: {
    avatar: string;
    username: string;
    level: number;
  };
  rankedStats: {
    rank: string;
    expeditions: number;
    defeats: number;
  };
  globalStats: {
    expeditions: number;
    bestTime: string;
    highestKills: number;
    points: number;
  };
  matchHistory: {
    outcome: string;
    playtime: string;
    kills: number;
    rooms: number;
  }[];
}

const achievements = [
  "Completar el plataformas sin morir",
  "Completar el plataformas 10 veces",
  "Completar el plataformas 25 veces",
  "Completar el plataformas 50 veces",
  "Matar 50 enemigos en plataformas",
  "Matar 100 enemigos en plataformas",
  "Matar 250 enemigos en plataformas",
  "Completar el roguelike en menos de 5 minutos",
  "Completar el roguelike 10 veces",
  "Completar el roguelike 25 veces",
  "Completar el roguelike 50 veces",
  "Matar 50 enemigos en roguelike",
  "Matar 100 enemigos en roguelike",
  "Matar 250 enemigos en roguelike",
];

export default function PublicProfilePage() {
  const { username } = useParams() as { username: string };
  const [userData, setUserData] = useState<PublicProfileData | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const { data: user, error } = await supabase
        .from("users")
        .select("id, username, avatar_url")
        .eq("username", username)
        .single();

      if (error || !user) return;

      const { data: ranking } = await supabase
        .from("rankings")
        .select("points")
        .eq("user_id", user.id)
        .single();

      const mock = getFullPlayerData(
        user.id,
        user.username,
        user.avatar_url,
        ranking?.points || 0
      );

      setUserData(mock);
    };

    fetchProfile();
  }, [username]);

  if (!userData) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Cargando perfil de {username}...
      </div>
    );
  }

  const { player, rankedStats, globalStats, matchHistory } = userData;

  const stats = {
    level: player.level,
    rank: rankedStats.rank,
    played: {
      roguelike: rankedStats.expeditions,
      plataformas: Math.floor(rankedStats.expeditions * 0.6),
    },
  };

  const latestMatches = matchHistory.map((m, idx) => ({
    mode: idx % 2 === 0 ? "Roguelike" : "Plataformas",
    result: m.outcome,
    time: m.playtime,
    date: `2025-03-${30 - idx}`,
    kills: m.kills,
    rooms: m.rooms,
  }));

  return (
    <div className="min-h-screen pt-24 text-white bg-gradient-to-b from-black via-gray-900 to-gray-950">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-10"
      >
        <h1 className="text-4xl font-bold mb-10 text-center">
          👤 Perfil de {player.username}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-gray-800 rounded-2xl p-6 shadow-lg text-left space-y-4 border border-gray-700 md:col-span-1 md:min-w-[280px] md:max-w-sm w-full">
            <div className="flex justify-center">
              <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-yellow-500 shadow-md">
                <Image
                  src={player.avatar}
                  alt="Avatar del jugador"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <ul className="space-y-2 text-base text-gray-300">
              <li>
                <strong>🏆 Nivel:</strong> {stats.level}
              </li>
              <li>
                <strong>🎖️ Rango:</strong> {stats.rank}
              </li>
              <li>
                <strong>🔥 Roguelike:</strong> {stats.played.roguelike} partidas
              </li>
              <li>
                <strong>🧗 Plataformas:</strong> {stats.played.plataformas} partidas
              </li>
              <li>
                <strong>💎 Puntos:</strong> {globalStats.points}
              </li>
            </ul>
          </div>

          <div className="md:col-span-2 bg-gray-800 rounded-2xl p-6 shadow-lg space-y-4 border border-gray-700">
            <h2 className="text-2xl font-semibold mb-3">🕹️ Últimas partidas</h2>

            {latestMatches.map((match, idx) => (
              <div
                key={idx}
                className="bg-gray-900 p-4 rounded-xl border border-gray-700 flex flex-col md:flex-row justify-between items-center hover:border-yellow-500 transition"
              >
                <div className="w-full md:w-1/2 mb-2 md:mb-0">
                  <p
                    className={`font-semibold text-lg ${
                      match.result === "Victoria"
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    {match.result}
                  </p>
                  <p className="text-sm text-gray-400">
                    {match.mode} — {match.date}
                  </p>
                </div>

                <div className="w-full md:w-1/2 flex flex-wrap justify-end gap-4 text-sm text-gray-300 text-right">
                  <p>
                    <strong>Tiempo:</strong> {match.time}
                  </p>
                  <p>
                    <strong>Enemigos:</strong> {match.kills}
                  </p>
                  <p>
                    <strong>Salas:</strong> {match.rooms}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="max-w-6xl mx-auto mb-16"
        >
          <h2 className="text-2xl font-semibold mb-6 text-center">🏅 Logros</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {achievements.map((name, idx) => (
              <div
                key={idx}
                className="bg-gray-900 border border-gray-700 rounded-xl p-6 flex flex-col items-center text-center opacity-50 hover:opacity-80 transition"
              >
                <span className="text-4xl mb-2">🔒</span>
                <p className="font-bold text-sm">¿¿¿???</p>
                <p className="text-xs text-gray-500">Desbloquéalo para ver</p>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
      <Footer />
    </div>
  );
}
