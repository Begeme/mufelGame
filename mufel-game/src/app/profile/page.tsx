"use client";

import { useUser } from "../../../context/UserContext";
import Footer from "../../../components/ui/Footer";
import Image from "next/image";

export default function ProfilePage() {
  const context = useUser();
  const user = context !== "loading" ? context.user : null;

  if (context === "loading") return null;

  if (!user) {
    return (
      <div className="pt-24 p-6 text-white text-center">
        <h1 className="text-2xl font-bold">Debes iniciar sesión para ver tu perfil</h1>
      </div>
    );
  }

  const stats = {
    level: 42,
    rank: "Oro III",
    played: {
      roguelike: 120,
      plataformas: 85,
    },
  };

  const latestMatches = [
    { mode: "Roguelike", result: "Victoria", time: "4:32", date: "2025-03-30" },
    { mode: "Plataformas", result: "Derrota", time: "10:12", date: "2025-03-29" },
    { mode: "Roguelike", result: "Victoria", time: "5:03", date: "2025-03-27" },
  ];

  const achievements = [
    // Plataformas
    "Completar el plataformas sin morir",
    "Completar el plataformas 10 veces",
    "Completar el plataformas 25 veces",
    "Completar el plataformas 50 veces",
    "Matar 50 enemigos en plataformas",
    "Matar 100 enemigos en plataformas",
    "Matar 250 enemigos en plataformas",
    // Roguelike
    "Completar el roguelike en menos de 5 minutos",
    "Completar el roguelike 10 veces",
    "Completar el roguelike 25 veces",
    "Completar el roguelike 50 veces",
    "Matar 50 enemigos en roguelike",
    "Matar 100 enemigos en roguelike",
    "Matar 250 enemigos en roguelike",
  ];

  return (
    <div className="min-h-screen pt-20 flex flex-col justify-between text-white">
      <div className="container mx-auto py-10 flex-grow px-4">
        <h1 className="text-3xl font-bold mb-8 text-center">👤 Mi Perfil</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          <div className="bg-gray-800 rounded-xl p-6 shadow-md text-center space-y-4">
            <Image
              src="/img/logo-mufel.jpeg"
              alt="Avatar"
              width={96}
              height={96}
              className="mx-auto rounded-full"
            />
            <p className="text-xl font-semibold">{user.username}</p>
            <hr className="border-gray-600 my-2" />
            <p><strong>Nivel:</strong> {stats.level}</p>
            <p><strong>Rango:</strong> {stats.rank}</p>
            <p><strong>Roguelike:</strong> {stats.played.roguelike} partidas</p>
            <p><strong>Plataformas:</strong> {stats.played.plataformas} partidas</p>
          </div>

          <div className="md:col-span-2 bg-gray-800 rounded-xl p-6 shadow-md space-y-4">
            <h2 className="text-xl font-semibold mb-2">🕹️ Últimas partidas</h2>
            {latestMatches.map((match, idx) => (
              <div
                key={idx}
                className="bg-gray-900 p-4 rounded-lg border border-gray-700 flex justify-between items-center"
              >
                <div>
                  <p className="font-bold">{match.mode}</p>
                  <p className="text-sm text-gray-400">{match.date}</p>
                </div>
                <div className="text-right">
                  <p className={match.result === "Victoria" ? "text-green-400" : "text-red-400"}>
                    {match.result}
                  </p>
                  <p className="text-sm">{match.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-5xl mx-auto mb-10">
          <h2 className="text-xl font-semibold mb-4 text-center">🏅 Logros</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {achievements.map((name, idx) => (
              <div
                key={idx}
                className="bg-gray-900 border border-gray-700 rounded-xl p-4 flex flex-col items-center text-center opacity-60"
              >
                <span className="text-4xl mb-2">🔒</span>
                <p className="font-bold text-sm">¿¿¿???</p>
                <p className="text-xs text-gray-500">Desbloquéalo para ver</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
