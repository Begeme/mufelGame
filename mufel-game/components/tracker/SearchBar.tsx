"use client";
import { useState } from "react";

export default function SearchBar({ onSearch }: { onSearch: (username: string) => void }) {
  const [username, setUsername] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      onSearch(username);
    }
  };

  return (
    <div className="flex justify-center my-6">
      <form onSubmit={handleSearch} className="flex bg-gray-800 p-2 rounded-lg">
        <input
          type="text"
          placeholder="Buscar jugador..."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="p-2 bg-gray-900 text-white rounded-l-lg focus:outline-none"
        />
        <button type="submit" className="bg-yellow-500 px-4 py-2 rounded-r-lg text-black font-bold">
          Buscar
        </button>
      </form>
    </div>
  );
}