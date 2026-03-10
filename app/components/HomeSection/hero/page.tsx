import HeroSection from "../../sections/home/HeroSection";
import type { HomeHeroSection } from "@/lib/services/home.types";

type Props = { heroSection?: HomeHeroSection };

export default function Hero({ heroSection }: Props) {
  return (
    <div className="relative flex min-h-screen w-full flex-col">
        <HeroSection data={heroSection} />
    </div>
  );
}
