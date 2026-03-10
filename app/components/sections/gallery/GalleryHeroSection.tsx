'use client';

import { motion } from 'framer-motion';
import SectionContainer from '@/app/components/layout/SectionContainer';
import type { GallerySection } from '@/lib/services/gallery.types';

interface GalleryHeroSectionProps {
  data?: GallerySection | null;
}

export default function GalleryHeroSection({ data }: GalleryHeroSectionProps) {
  const hook = data?.hook ?? 'Life at First Team';
  const title = data?.title ?? 'Life at FTT';
  const description =
    data?.description ??
    'Explore the professional environment, our state-of-the-art Amazon-branded fleet, and the dedicated team driving excellence from our Indianapolis facility.';
  const containerVariants = {
    hidden: { opacity: 0, y: 60, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
        staggerChildren: 0.15,
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
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      },
    },
  };

  const badgeVariants = {
    hidden: { opacity: 0, scale: 0.8, rotate: -10 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.5,
        ease: [0.34, 1.56, 0.64, 1] as const,
      },
    },
  };

  return (
    <section className="relative w-full overflow-hidden bg-[#E8E8E0] dark:bg-slate-900 py-16 md:py-20">
      <SectionContainer size="xl" noPaddingY>
      <motion.div
        className="flex flex-col items-center text-center mb-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <motion.div
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-4"
          variants={badgeVariants}
        >
          {/* Badge */}
          <span className="material-symbols-outlined text-sm">photo_camera</span>
          {hook}
        </motion.div> 
        {/* Heading */}
        <motion.h1
          className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 text-slate-900 dark:text-white"
          variants={itemVariants}
        >
          {title}
        </motion.h1>
        {/* Description */}
        <motion.p
          className="max-w-2xl text-lg text-slate-600 dark:text-slate-400 font-medium"
          variants={itemVariants}
        >
          {description}
        </motion.p>
      </motion.div>
      </SectionContainer>
    </section>
  );
}
