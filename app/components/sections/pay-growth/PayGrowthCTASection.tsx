"use client";

import { motion } from "framer-motion";
import SectionContainer from "@/app/components/layout/SectionContainer";
import Link from "next/link";
import type { HomeCTA } from "@/lib/services/home.types";

const containerVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.34, 1.56, 0.64, 1] as const,
      staggerChildren: 0.2,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.34, 1.56, 0.64, 1] as const,
    },
  },
};

const backgroundVariants = {
  initial: { opacity: 0.05 },
  animate: {
    opacity: [0.05, 0.1, 0.05],
    scale: [1, 1.1, 1],
    transition: {
      duration: 5,
      repeat: Infinity,
      ease: [0.45, 0.05, 0.55, 0.95] as const,
    },
  },
};

export default function PayGrowthCTASection({ cta }: { cta?: HomeCTA }) {
  return (
    <section className="relative w-full bg-[#E8E8E0] dark:bg-slate-900 py-12 sm:py-16 md:py-20 rounded-3xl">
      <SectionContainer size="xl" noPaddingY className="relative overflow-hidden rounded-3xl p-8">
      <motion.div
        className="absolute inset-0 bg-[#E8E8E0] opacity-5 rounded-3xl "
        variants={backgroundVariants}
        initial="initial"
        animate="animate"
      ></motion.div>
      <motion.div
        className="max-w-4xl mx-auto text-center relative z-10 px-4 sm:px-6 lg:px-8 xl:px-0"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <motion.h2
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-slate-900 dark:text-white uppercase mb-4 sm:mb-5 md:mb-6 leading-tight font-black tracking-tight"
          variants={itemVariants}
        >
          {cta?.title ?? (
            <>
              Ready to drive for a team that{" "}
              <span className="text-primary underline decoration-primary/30">
                values your excellence?
              </span>
            </>
          )}
        </motion.h2>
        <motion.p
          className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-gray-400 mb-8 sm:mb-9 md:mb-10"
          variants={itemVariants}
        >
          {cta?.description ?? "Join First Team Trucking today and start your journey toward top-tier performance rewards."}
        </motion.p>
        <motion.div
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center"
          variants={itemVariants}
        >
          <motion.button
            className="bg-primary hover:bg-red-700 text-white px-6 py-3 sm:px-8 sm:py-4 md:px-10 md:py-5 rounded-lg font-black text-base sm:text-lg transition-colors uppercase tracking-wider"
            whileHover={{ scale: 1.08, y: -3 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
                href={cta?.button1_link ?? "/apply-now"}
                className="flex items-center justify-center gap-2"
              >
                {cta?.button1_text ?? "APPLY NOW"}
                <span className="material-symbols-outlined">trending_flat</span>
              </Link>
          </motion.button>
        </motion.div>
      </motion.div>
      </SectionContainer>
    </section>
  );
}
