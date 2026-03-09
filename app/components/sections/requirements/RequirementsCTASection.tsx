"use client";

import { motion } from "framer-motion";
import SectionContainer from "@/app/components/layout/SectionContainer";
import type { HomeCTA } from "@/lib/services/home.types";

const ctaVariants = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  },
};

export default function TestimonialsCTASection({ cta }: { cta?: HomeCTA }) {
  return (
    <section className="relative w-full bg-[#E8E8E0] dark:bg-slate-900 py-12 md:py-16 bg-linear-to-b from-transparent  to-primary/5">
      <SectionContainer size="xl" noPaddingY>
      <motion.div
        className="text-center  pt-6 md:pt-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={ctaVariants}
      >
      <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-6">
        {cta?.title ?? "Ready to Join the Team?"}
      </h2>
      <p className="text-slate-600 dark:text-slate-400 max-w-xl mx-auto mb-10 text-lg">
        {cta?.description ?? "Experience the First Team Trucking difference today. Competitive pay, modern equipment, and a culture that cares."}
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <button className="w-full sm:w-auto px-8 py-4 bg-primary text-white font-bold rounded-lg hover:bg-red-700 transition-colors shadow-lg shadow-primary/20">
          {cta?.button1_text ?? "Apply Now"}
        </button>
        {(cta?.button2_text ?? true) && (
          <button className="w-full sm:w-auto px-8 py-4 bg-slate-100 hover:bg-slate-200 text-slate-900 dark:bg-white dark:hover:bg-gray-100 dark:text-black font-bold rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">
            {cta?.button2_text ?? "Learn More"}
          </button>
        )}
      </div>
      </motion.div>
      </SectionContainer>
    </section>
  );
}
