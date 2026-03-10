
'use client';

import { motion } from 'framer-motion';
import SectionContainer from '@/app/components/layout/SectionContainer';
import type { HomeCTA } from '@/lib/services/home.types';

export default function ApplyCTABannerSection({ cta }: { cta?: HomeCTA }) {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const titleLineVariants = {
    hidden: { 
      opacity: 0, 
      rotateX: -30,
      y: 40,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      rotateX: 0,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.34, 1.56, 0.64, 1] as const,
      },
    },
  };

  const highlightVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.8,
      rotateY: -25,
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: {
        duration: 0.9,
        delay: 0.2,
        ease: [0.34, 1.56, 0.64, 1] as const,
      },
    },
  };

  const textVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      filter: "blur(10px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.7,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      },
    },
  };

  const buttonContainerVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.7,
      rotateX: 20,
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotateX: 0,
      transition: {
        type: "spring" as const,
        stiffness: 120,
        damping: 15,
      },
    },
  };

  const badgeVariants = {
    hidden: { 
      opacity: 0,
      y: 20,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.34, 1.56, 0.64, 1] as const,
      },
    },
  };

  const iconVariants = {
    hidden: { 
      scale: 0,
      rotate: -180,
    },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring" as const,
        stiffness: 200,
        damping: 12,
        delay: 0.1,
      },
    },
  };

  return (
    <section className="relative w-full bg-[#E8E8E0] dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800 py-24 md:py-32 overflow-hidden">
      <SectionContainer size="xl" noPaddingY>
      <motion.div
        className="max-w-[840px] mx-auto space-y-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        style={{ perspective: 1000 }}
      >
        <div className="text-slate-900 dark:text-white text-4xl md:text-6xl font-black leading-tight tracking-[-0.033em] uppercase">
          <motion.div variants={titleLineVariants}>
            {cta?.title }
          </motion.div>
          {!cta?.title && (
            <motion.span 
              className="text-primary inline-block"
              variants={highlightVariants}
              style={{ display: 'inline-block' }}
            >
              Career Forward?
            </motion.span>
          )}
        </div>
        
        <motion.p
          className="text-slate-600 dark:text-slate-400 text-start sm:text-lg md:text-xl font-medium max-w-[650px]  leading-relaxed"
          variants={textVariants}
        >
          {cta?.description }
        </motion.p>
        
        <motion.div 
          className="pt-6" 
          variants={buttonContainerVariants}
          style={{ perspective: 1000 }}
        >
          <motion.button 
            className="group relative inline-flex items-center justify-center px-12 py-5 font-black tracking-widest text-white bg-primary rounded-lg overflow-hidden transition-all duration-300 shadow-2xl shadow-primary/20"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 25px 50px -12px rgba(239, 68, 68, 0.4)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.span 
              className="text-2xl uppercase"
              initial={{ x: 0 }}
              whileHover={{ x: [0, -5, 5, 0] }}
              transition={{ duration: 0.4 }}
            >
              {cta?.button1_text }
            </motion.span>
          </motion.button>
        </motion.div>
        
        <motion.div
          className="flex items-center justify-center gap-2 text-slate-600 dark:text-slate-400 text-sm font-bold uppercase tracking-widest pt-4"
          variants={badgeVariants}
        >
          <motion.span 
            className="material-symbols-outlined text-primary text-lg"
            variants={iconVariants}
          >
            verified
          </motion.span>
          Amazon Freight Partner Program
        </motion.div>
      </motion.div>
      </SectionContainer>
    </section>
  );
}
