"use client";

import { motion } from "framer-motion";
import SectionContainer from "@/app/components/layout/SectionContainer";
import Link from "next/link";
import type { HomeCTA } from "@/lib/services/home.types";

const containerVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: [0.34, 1.56, 0.64, 1] as const,
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.34, 1.56, 0.64, 1] as const,
    },
  },
};

const buttonContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const buttonVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.34, 1.56, 0.64, 1] as const,
    },
  },
};

const badgeVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (index: number) => ({
    opacity: 0.5,
    scale: 1,
    transition: {
      duration: 0.5,
      delay: index * 0.1,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  }),
};

export default function BenefitsCTASection({ cta }: { cta?: HomeCTA }) {
  return (
    <section className="relative w-full bg-[#E8E8E0] dark:bg-slate-900 py-12 sm:py-16 md:py-20 lg:pt-50">
      <SectionContainer size="xl" noPaddingY>
        <motion.div
          className="max-w-4xl mx-auto text-center p-4 sm:p-6 lg:p-8 xl:p-20 bg-linear-to-b from-transparent rounded-2xl sm:rounded-3xl to-primary/5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <motion.h2
            className="text-slate-900 dark:text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-3 sm:mb-4 md:mb-6"
            variants={itemVariants}
          >
            {cta?.title ?? "Ready to Join the First Team?"}
          </motion.h2>
          <motion.p
            className="text-slate-600 dark:text-slate-400 text-sm sm:text-base md:text-lg mb-6 sm:mb-8 md:mb-10"
            variants={itemVariants}
          >
            {cta?.description ?? "Applications take less than 10 minutes. Our recruitment team will review your profile and reach out within 24-48 hours."}
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
            variants={buttonContainerVariants}
          >
            <motion.button
              className="w-full sm:w-auto bg-primary hover:bg-red-700 text-white px-6 py-3 sm:px-8 sm:py-4 md:px-10 md:py-5 rounded-lg text-sm sm:text-base md:text-lg font-black transition-colors shadow-xl shadow-primary/20 min-h-12"
              variants={buttonVariants}
              whileHover={{ scale: 1.05, y: -3 }}
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
              className="w-full sm:w-auto bg-slate-100 hover:bg-slate-200 text-slate-900 border border-slate-200 dark:bg-white/5 dark:hover:bg-white/10 dark:text-white dark:border-white/10 px-6 py-3 sm:px-8 sm:py-4 md:px-10 md:py-5 rounded-lg text-sm sm:text-base md:text-lg font-bold transition-colors flex items-center justify-center gap-2 min-h-12"
              variants={buttonVariants}
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="material-symbols-outlined text-lg sm:text-xl">
                call
              </span>
              {cta?.button2_text ?? "Call Recruitment"}
            </motion.button>
          </motion.div>
          <motion.div
            className="mt-8 sm:mt-10 md:mt-12 flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <motion.div
              className="flex items-center gap-1.5 sm:gap-2 text-slate-900 dark:text-white font-bold tracking-tighter text-base sm:text-lg md:text-xl lg:text-2xl"
              custom={0}
              variants={badgeVariants}
              whileHover={{ scale: 1.1, opacity: 1 }}
            >
              <span className="material-symbols-outlined text-xl sm:text-2xl md:text-3xl">
                verified_user
              </span>
              SAFETY FIRST
            </motion.div>
            <motion.div
              className="flex items-center gap-1.5 sm:gap-2 text-slate-900 dark:text-white font-bold tracking-tighter text-base sm:text-lg md:text-xl lg:text-2xl"
              custom={1}
              variants={badgeVariants}
              whileHover={{ scale: 1.1, opacity: 1 }}
            >
              <span className="material-symbols-outlined text-xl sm:text-2xl md:text-3xl">
                local_shipping
              </span>
              AMAZON PARTNER
            </motion.div>
          </motion.div>
        </motion.div>
      </SectionContainer>
    </section>
  );
}
