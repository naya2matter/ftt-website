
import { fetchHomeData } from "@/lib/services/home.service";
import Hero from "../components/HomeSection/hero/page";
import OwnerMessage from "../components/HomeSection/owner-message/page";
import Testimonials from "../components/HomeSection/testimonials/page";
import WhyFTT from "../components/HomeSection/why-ftt/page";
import SignOnBonus from "../components/HomeSection/sign-on-bonus/page";
import PayGrowth from "../components/HomeSection/pay-growth/page";
import Benefits from "../components/HomeSection/benefits/page";
import Requirements from "../components/HomeSection/requirements/page";

export default async function Home() {
  const homeData = await fetchHomeData();

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
      <div id="home">
        <Hero heroSection={homeData?.hero_section} />
      </div>
      <div id="about">
        <OwnerMessage founderSection={homeData?.founder_section} />
      </div>
      <div id="testimonials">
        <Testimonials
          testimonialsSection={homeData?.testimonials_section}
          cta={homeData?.ctas?.[0]}
        />
      </div>
      <div id="why-ftt">
        <WhyFTT whyUsSection={homeData?.why_us_section} />
      </div>
      <div id="sign-on-bonus">
        <SignOnBonus
          offerSection={homeData?.offer_section}
          cta={homeData?.ctas?.[1]}
        />
      </div>
      <div id="pay-growth">
        <PayGrowth
          temptationSection={homeData?.temptation_section}
          cta={homeData?.ctas?.[2]}
        />
      </div>
      <div id="benefits">
        <Benefits
          benefitsSection={homeData?.benefits_section}
          cta={homeData?.ctas?.[3]}
        />
      </div>
      <div id="requirements">
        <Requirements
          needsSection={homeData?.needs_section}
          cta={homeData?.ctas?.[4]}
        />
      </div>
    </div>
  );
}
