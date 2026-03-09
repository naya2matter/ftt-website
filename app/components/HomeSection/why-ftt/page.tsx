import WhyFTTHeroSection from "../../sections/why-ftt/WhyFTTHeroSection";
import type { HomeWhyUsSection } from "@/lib/services/home.types";

type Props = { whyUsSection?: HomeWhyUsSection };

export default function WhyFTT({ whyUsSection }: Props) {
  return (
    <div className="relative flex w-full flex-col overflow-x-hidden bg-[#E8E8E0] dark:bg-slate-900">
      <main className="flex-1 w-full pt-20">
        <WhyFTTHeroSection data={whyUsSection} />
      </main>
    </div>
      
  );
}