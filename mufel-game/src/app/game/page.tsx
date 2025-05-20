"use client";

import Navbar from "../../../components/ui/Navbar";
import Footer from "../../../components/ui/Footer";
import Introduction from "../../../components/game/Introduction";
import HowToPlay from "../../../components/game/HowToPlay";
import GameModes from "../../../components/game/GameModes";
import Lore from "../../../components/game/Lore";
import Media from "../../../components/game/Media";
import FadeInSection from "../../../components/ui/FadeInSection";

export default function GamePage() {
  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Navbar />
      <main className="flex-grow pt-20">
        <FadeInSection>
          <Introduction />
        </FadeInSection>
        <FadeInSection>
          <HowToPlay />
        </FadeInSection>
        <FadeInSection>
          <GameModes />
        </FadeInSection>
        <FadeInSection>
          <Lore />
        </FadeInSection>
        <FadeInSection>
          <Media />
        </FadeInSection>
      </main>
      <Footer />
    </div>
  );
}
