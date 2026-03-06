"use client";

import { motion } from "framer-motion";
import SectionContainer from "@/app/components/layout/SectionContainer";
import Link from "next/link";
import type { HomeCTA } from "@/lib/services/home.types";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const dropVariants = {
  hidden: { opacity: 0, y: -50, rotateX: -90 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: 0.7,
      ease: [0.34, 1.56, 0.64, 1] as const,
    },
  },
};

const buttonContainerVariants = {
  hidden: { opacity: 0, y: -30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.34, 1.56, 0.64, 1] as const,
      staggerChildren: 0.1,
    },
  },
};

const buttonVariants = {
  hidden: { opacity: 0, scale: 0.8, rotateZ: -10 },
  visible: {
    opacity: 1,
    scale: 1,
    rotateZ: 0,
    transition: {
      type: "spring" as const,
      stiffness: 150,
      damping: 12,
    },
  },
};

export default function BonusCTASection({ cta }: { cta?: HomeCTA }) {
  return (
    <section className="relative w-full bg-[#E8E8E0] dark:bg-slate-900 py-10 sm:py-12 md:py-14 lg:py-16">
      <SectionContainer size="xl" noPaddingY>
        <motion.div
          className="text-center space-y-5 sm:space-y-6 md:space-y-7 lg:space-y-8 pt-10 sm:pt-12 md:pt-14 lg:pt-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white px-4 sm:px-6 lg:px-8 xl:px-0"
            variants={dropVariants}
          >
            {cta?.title ?? (
              <>
                Ready to join the{" "}
                <span className="text-primary tracking-tight">First Team Trucking?</span>
              </>
            )}
          </motion.h2>
          <motion.p
            className="text-slate-600 dark:text-gray-400 text-sm sm:text-base md:text-lg lg:text-xl max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-0"
            variants={dropVariants}
          >
            {cta?.description ?? "Applications are processed within 48 hours. Start your journey towards a stable career with competitive rewards today."}
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 px-4 sm:px-6 lg:px-8 xl:px-0"
            variants={buttonContainerVariants}
          >
            <motion.button
              className="bg-primary hover:bg-red-700 text-white px-6 py-3 sm:px-8 sm:py-4 md:px-10 md:py-5 rounded-lg text-sm sm:text-base md:text-lg font-bold transition-colors shadow-lg shadow-primary/20 "
              variants={buttonVariants}
              whileHover={{ scale: 1.05, y: -2 }}
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
            <motion.button
              className="bg-slate-100 hover:bg-slate-200 text-slate-900 dark:bg-white dark:hover:bg-gray-100 dark:text-black px-6 py-3 sm:px-8 sm:py-4 md:px-10 md:py-5 rounded-lg text-sm sm:text-base md:text-lg font-bold transition-colors"
              variants={buttonVariants}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href={cta?.button2_link ?? "#"}
                className="flex items-center justify-center gap-2"
              >
                {cta?.button2_text ?? "Contact Us"}
                <span className="material-symbols-outlined">call</span>
              </Link>
            </motion.button>
          </motion.div>
        </motion.div>
      </SectionContainer>
    </section>
  );
}
