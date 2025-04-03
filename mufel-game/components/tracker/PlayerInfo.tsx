"use client";
import Image from "next/image";

interface Player {
  avatar: string;
  username: string;
  level: number;
}

export default function PlayerInfo({ player }: { player: Player }) {
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center text-white">
      <Image 
        src={player.avatar} 
        alt="Avatar del jugador" 
        width={100} 
        height={100} 
        className="mx-auto rounded-full"
      />
      <h2 className="text-2xl font-bold mt-2">{player.username}</h2>
      <p className="text-gray-400">Nivel {player.level}</p>
    </div>
  );
}
