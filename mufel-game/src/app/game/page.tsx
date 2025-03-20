"use client";
import Navbar from "../../../components/ui/Navbar";
import Footer from "../../../components/ui/Footer";
import Introduction from "../../../components/game/Introduction";
import HowToPlay from "../../../components/game/HowToPlay";
import GameModes from "../../../components/game/GameModes";
import Lore from "../../../components/game/Lore";
import Media from "../../../components/game/Media";

export default function GamePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-black text-white pt-20">
        <Introduction />
        <HowToPlay />
        <GameModes />
        <Lore />
        <Media />
      </main>
      <Footer />
    </div>
  );
}
