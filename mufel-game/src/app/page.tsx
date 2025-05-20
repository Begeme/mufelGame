"use client";

import { useUser } from "../../context/UserContext";

import Hero from "../../components/ui/page/Hero";
import News from "../../components/ui/page/News";
import Stats from "../../components/ui/page/Stats";
import GameModes from "../../components/ui/page/GameModes";
import Testimonials from "../../components/ui/page/Testimonials";
import Footer from "../../components/ui/Footer";
import FeaturedMerch from "../../components/ui/FeaturedMerch";
import TopRoguelike from "../../components/ui/TopRoguelike";
import FadeInSection from "../../components/ui/FadeInSection";

export default function Home() {
  const context = useUser();

  if (context === "loading") return null;

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <main className="flex-grow">
        <Hero />
        <FadeInSection>
          <News />
        </FadeInSection>
        <FadeInSection>
          <Stats />
        </FadeInSection>
        <FadeInSection>
          <GameModes />
        </FadeInSection>
        <FadeInSection>
          <TopRoguelike />
        </FadeInSection>
        <FadeInSection>
          <FeaturedMerch />
        </FadeInSection>
        <FadeInSection>
          <Testimonials />
        </FadeInSection>
      </main>
      <Footer />
    </div>
  );
}
