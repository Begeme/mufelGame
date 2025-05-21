"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

interface PlayerEntry {
  username: string;
  points: number;
}

export default function TopRoguelike() {
  const [ranking, setRanking] = useState<PlayerEntry[]>([]);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchRanking = async () => {
      const { data: rankingData, error } = await supabase
        .from("rankings")
        .select("points, user_id")
        .order("points", { ascending: false })
        .limit(10);

      if (error) {
        console.error("Error al cargar ranking:", error.message);
        return;
      }

      const players: PlayerEntry[] = await Promise.all(
        rankingData.map(async (entry) => {
          const { data: user } = await supabase
            .from("users")
            .select("username")
            .eq("id", entry.user_id)
            .single();

          return {
            username: user?.username || "Desconocido",
            points: entry.points,
          };
        })
      );

      setRanking(players);
    };

    fetchRanking();
  }, []);

  return (
    <section className="relative py-16 -mt-10 bg-gradient-to-b from-black via-gray-900 to-black overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-black to-transparent z-0" />

      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent z-0" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-white">
        <motion.h2
          className="text-4xl font-bold text-center mb-10 text-yellow-400"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {t("ranking.title")}
        </motion.h2>

        <motion.div
          className="overflow-hidden rounded-2xl shadow-lg border border-gray-700 bg-gray-800"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <table className="w-full text-sm sm:text-base">
            <thead className="bg-gray-900 text-yellow-500">
              <tr>
                <th className="px-4 py-3 text-left">{t("ranking.posicion")}</th>
                <th className="px-4 py-3 text-left">{t("ranking.jugador")}</th>
                <th className="px-4 py-3 text-right">{t("ranking.puntos")}</th>
              </tr>
            </thead>
            <tbody>
              {ranking.map((jugador, index) => (
                <motion.tr
                  key={index}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.05,
                  }}
                  viewport={{ once: false }}
                  className={`border-b border-gray-700 ${
                    index === 0
                      ? "bg-yellow-500 text-black font-bold"
                      : "hover:bg-gray-700 transition"
                  }`}
                >
                  <td className="px-4 py-3">{index + 1}</td>
                  <td className="px-4 py-3">
                    {index === 0 ? (
                      <motion.span
                        className="font-bold inline-block"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{
                          duration: 0.8,
                          repeat: Infinity,
                          repeatDelay: 5,
                          ease: "easeInOut",
                        }}
                      >
                        {jugador.username}
                      </motion.span>
                    ) : (
                      jugador.username
                    )}
                  </td>
                  <td
                    className={`px-4 py-3 text-right ${
                      index === 0 ? "text-black" : "text-yellow-400"
                    }`}
                  >
                    {jugador.points.toLocaleString()}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </section>
  );
}
