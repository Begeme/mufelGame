"use client";
import Image from "next/image";

interface Player {
  avatar: string;
  username: string;
  level: number;
}

export default function PlayerInfo({ player }: { player: Player }) {
  return (
    <div className="bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-700 text-center text-white">
      <div className="relative w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-4 border-yellow-500">
        <Image
          src={player.avatar}
          alt={`Avatar de ${player.username}`}
          fill
          className="object-cover"
        />
      </div>
      <h2 className="text-xl font-bold">{player.username}</h2>
      <p className="text-gray-400 text-sm">Nivel {player.level}</p>
    </div>
  );
}
