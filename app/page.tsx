import { Nav } from "@/components/sections/nav";
import { Hero } from "@/components/sections/hero";
import { Marquee } from "@/components/marquee";
import { Flagship } from "@/components/sections/flagship";
import { Range } from "@/components/sections/range";
import { Calibration } from "@/components/sections/calibration";
import { Scene } from "@/components/sections/scene";
import { Order } from "@/components/sections/order";
import { Footer } from "@/components/sections/footer";

export default function Page() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <Marquee />
        <Flagship />
        <Range />
        <Calibration />
        <Scene />
        <Order />
      </main>
      <Footer />
    </>
  );
}
