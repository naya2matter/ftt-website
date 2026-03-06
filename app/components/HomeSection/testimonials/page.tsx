import TestimonialsCarouselSection from "../../sections/testimonials/TestimonialsCarouselSection";
import TestimonialsCTASection from "../../sections/testimonials/TestimonialsCTASection";
import type { HomeTestimonialsSection, HomeCTA } from "@/lib/services/home.types";

type Props = { testimonialsSection?: HomeTestimonialsSection; cta?: HomeCTA };

export default function Testimonials({ testimonialsSection, cta }: Props) {
  return (
    <div className="relative flex min-h-screen w-full flex-col bg-[#E8E8E0] dark:bg-slate-900 pt-20">
        <TestimonialsCarouselSection data={testimonialsSection} />
        <TestimonialsCTASection cta={cta} />
    </div>
  );
}
