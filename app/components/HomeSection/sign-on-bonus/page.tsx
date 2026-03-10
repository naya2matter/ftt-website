import BonusCTASection from "../../sections/sign-on-bonus/BonusCTASection";
import BonusHeroSection from "../../sections/sign-on-bonus/BonusHeroSection";
import type { HomeOfferSection, HomeCTA } from "@/lib/services/home.types";

type Props = { offerSection?: HomeOfferSection; cta?: HomeCTA };

export default function SignOnBonus({ offerSection, cta }: Props) {
    return(
        <main className="min-h-screen bg-[#E8E8E0] dark:bg-slate-900 w-full pt-20">
          <BonusHeroSection data={offerSection} />
          <BonusCTASection cta={cta} />
        </main>
    )
}