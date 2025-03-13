import Hero from "../../components/ui/page/Hero";
import News from "../../components/ui/page/News";
import Stats from "../../components/ui/page/Stats";
import GameModes from "../../components/ui/page/GameModes";
import Ranking from "../../components/ui/page/Ranking";
import Events from "../../components/ui/page/Events";
import Shop from "../../components/ui/page/Shop";
import Testimonials from "../../components/ui/page/Testimonials";
import Footer from "../../components/ui/Footer";

export default function Home() {
  return (
    <div>
      <Hero />
      <News />
      <Stats />
      <GameModes />
      <Ranking />
      <Events />
      <Shop />
      <Testimonials />
      <Footer />
    </div>
  );
}
