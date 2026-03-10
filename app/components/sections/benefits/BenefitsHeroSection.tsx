"use client";

import { motion } from "framer-motion";
import SectionContainer from "@/app/components/layout/SectionContainer";
import Link from "next/link";
import type { HomeBenefitsSection } from "@/lib/services/home.types";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const badgeVariants = {
  hidden: { opacity: 0, scale: 0, rotate: 90 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring" as const,
      stiffness: 200,
      damping: 15,
    },
  },
};

const titleVariants = {
  hidden: { opacity: 0, rotateX: -90, y: 40 },
  visible: {
    opacity: 1,
    rotateX: 0,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.34, 1.56, 0.64, 1] as const,
    },
  },
};

const textVariants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  },
};

const buttonContainerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      staggerChildren: 0.1,
    },
  },
};

const buttonVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.34, 1.56, 0.64, 1] as const,
    },
  },
};

const listItemVariants = {
  hidden: { opacity: 0, scale: 0.7, y: 30 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 150,
      damping: 18,
    },
  },
};

export default function BenefitsHeroSection({ data }: { data?: HomeBenefitsSection }) {
  const items = data?.items && data.items.length > 0
    ? data.items
    : [
        { text: "" },
        { text: "" },
        { text: "" },
        { text: "" },
        { text: "" },
      ];
  const animDelay = (i: number) => 0.2 + i * 0.08;
  return (
    <section className="relative w-full bg-[#E8E8E0] dark:bg-slate-900 ">
      <SectionContainer
        size="xl"
        noPaddingY
        className="relative w-full overflow-hidden"
      >
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
          <div className="absolute inset-0 bg-linear-to-r from-white/70 dark:from-background-dark via-transparent to-white/70 dark:to-background-dark"></div>
        </div>
        <motion.div
          className="relative z-10 max-w-3xl px-4 sm:px-6 lg:px-8 xl:px-0"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <motion.div
            className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-primary/10 border border-primary/20 rounded-full mb-4 sm:mb-5 md:mb-6"
            variants={badgeVariants}
          >
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
            {/* Badge */}
            <span className="text-primary text-[10px] sm:text-xs font-bold uppercase tracking-wider">
              {data?.hook ?? "Official Amazon Freight Partner"}
            </span>
          </motion.div>
          {/* Heading */}
          <motion.h1
            className="text-slate-900 dark:text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black leading-[1.1] tracking-tight mb-4 sm:mb-5 md:mb-6"
            variants={titleVariants}
            style={{ transformPerspective: 1000 }}
          >
            {data?.title ?? (
              <>
                Drive with the Best:{" "}
                <span className="text-primary">First Team Trucking</span>
              </>
            )}
          </motion.h1>
          <motion.div
            className="mb-6 sm:mb-8 md:mb-10 max-w-2xl"
            variants={textVariants}
          >
            <motion.ul
              className="grid grid-cols-1 sm:grid-cols-2 gap-3"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ staggerChildren: 0.08, delayChildren: 0.1 }}
            >
              {items.map((item, i) => (
                <motion.li
                  key={i}
                  variants={listItemVariants}
                  className="flex items-start gap-2"
                >
                  <motion.span
                    className="material-symbols-outlined text-primary text-lg sm:text-xl mt-0.5 flex-shrink-0"
                    whileInView={{ rotate: 360, scale: [0.8, 1.2, 1] }}
                    transition={{ duration: 0.5, delay: animDelay(i) }}
                    viewport={{ once: true }}
                  >
                    check_circle
                  </motion.span>
                  {/* List Item Text */}
                  <span className="text-sm sm:text-base md:text-lg text-slate-700 dark:text-slate-300">
                    {item.text}
                  </span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
          <motion.div
            className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4"
            variants={buttonContainerVariants}
          >
            
            
          </motion.div>
        </motion.div>
      </SectionContainer>
    </section>
  );
}
