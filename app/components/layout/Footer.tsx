'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import type { HomeFooterContactInfo, HomeFooterSocialLink } from '@/lib/services/home.types';

// ─── Brand SVG icons ────────────────────────────────────────────────────────
function SocialIcon({ platform }: { platform: string }) {
  const p = platform.toLowerCase();

  if (p === 'facebook')
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    );

  if (p === 'instagram')
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    );

  if (p === 'linkedin')
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    );

  if (p === 'twitter' || p === 'x')
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.259 5.629L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
      </svg>
    );

  if (p === 'youtube')
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.41 19.1C5.12 19.56 12 19.56 12 19.56s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
        <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="white" />
      </svg>
    );

  if (p === 'tiktok')
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.3 6.3 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.35 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.98A8.21 8.21 0 0 0 21 9.97V6.56a4.86 4.86 0 0 1-1.41.13z" />
      </svg>
    );

  if (p === 'whatsapp')
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
      </svg>
    );

  // Generic fallback
  return (
    <span className="material-symbols-outlined text-lg">link</span>
  );
}

export default function Footer() {
  const [contactInfo, setContactInfo] = useState<HomeFooterContactInfo | null>(null);
  const [socialLinks, setSocialLinks] = useState<HomeFooterSocialLink[]>([
    { platform: 'facebook', url: '#', is_active: 1 },
    { platform: 'linkedin', url: '#', is_active: 1 },
  ]);

  useEffect(() => {
    fetch('/api/home')
      .then((r) => r.json())
      .then((json) => {
        const nested = json?.data?.original?.data;
        if (nested?.footer?.contact_info) setContactInfo(nested.footer.contact_info);
        if (nested?.footer?.social_links?.length) {
          setSocialLinks(nested.footer.social_links.filter((s: HomeFooterSocialLink) => s.is_active === 1));
        }
      })
      .catch(() => {});
  }, []);
  const columnVariants = (delay: number) => ({
    hidden: { 
      opacity: 0, 
      y: 60,
      rotateX: 15,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        delay,
        ease: [0.34, 1.56, 0.64, 1] as const,
        staggerChildren: 0.08,
      },
    },
  });

  const itemVariants = {
    hidden: { 
      opacity: 0,
      x: -15,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      },
    },
  };

  const iconVariants = {
    hidden: { 
      scale: 0,
      rotate: -90,
    },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring" as const,
        stiffness: 200,
        damping: 12,
      },
    },
  };

  const socialVariants = {
    hidden: { 
      scale: 0,
      rotate: 180,
    },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring" as const,
        stiffness: 150,
        damping: 10,
      },
    },
  };

  const bottomVariants = {
    hidden: { 
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      },
    },
  };

  return (
    <footer className="bg-slate-50 dark:bg-[#050607] border-t border-slate-200 dark:border-white/10 px-6 py-16 md:px-20 lg:px-40 relative overflow-hidden">
      {/* FTT Shadow Pattern Background */}
      <div className="absolute inset-0 pointer-events-none select-none opacity-[0.08] dark:opacity-[0.06]">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full flex items-center justify-center">
          <span className="font-brand text-[25rem] md:text-[35rem] lg:text-[45rem] font-black italic tracking-tighter text-[#80804a] dark:text-white whitespace-nowrap">
            F T T
          </span>
        </div>
      </div>
      
      <div className="max-w-[1200px] mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand & About */}
          <motion.div
            className="flex flex-col gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={columnVariants(0)}
            style={{ perspective: 1000 }}
          >
            <motion.div className="flex items-center gap-3" variants={itemVariants}>
              <motion.div className="text-primary" variants={iconVariants}>
                <svg
                  fill="none"
                  viewBox="0 0 48 48"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M36.7273 44C33.9891 44 31.6043 39.8386 30.3636 33.69C29.123 39.8386 26.7382 44 24 44C21.2618 44 18.877 39.8386 17.6364 33.69C16.3957 39.8386 14.0109 44 11.2727 44C7.25611 44 4 35.0457 4 24C4 12.9543 7.25611 4 11.2727 4C14.0109 4 16.3957 8.16144 17.6364 14.31C18.877 8.16144 21.2618 4 24 4C26.7382 4 29.123 8.16144 30.3636 14.31C31.6043 8.16144 33.9891 4 36.7273 4C40.7439 4 44 12.9543 44 24C44 35.0457 40.7439 44 36.7273 44Z"
                    fill="currentColor"
                  ></path>
                </svg>
              </motion.div>
              <span className="text-xl font-black tracking-tighter uppercase text-slate-900 dark:text-white">
                First Team Trucking
              </span>
            </motion.div>
            <motion.p 
              className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed max-w-xs"
              variants={itemVariants}
            >
              Dedicated to efficiency, safety, and our drivers. We are proud to
              be an official Amazon Freight Partner operating out of Indianapolis.
            </motion.p>
            <motion.div className="flex gap-4" variants={itemVariants}>
              {/* Social Links */}
              {socialLinks.map((link, index) => (
                <motion.a
                  key={link.platform}
                  href={link.url || '#'}
                  aria-label={link.platform}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-600 dark:text-steel-gray hover:text-primary hover:bg-slate-200 dark:hover:bg-white/10 transition-all"
                  variants={socialVariants}
                  custom={index}
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <SocialIcon platform={link.platform} />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Contact Details */}
          <motion.div
            className="flex flex-col gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={columnVariants(0.1)}
            style={{ perspective: 1000 }}
          >
            <motion.h4 
              className="text-slate-900 dark:text-white text-xs font-black uppercase tracking-[0.2em]"
              variants={itemVariants}
            >
              Contact Recruitment
            </motion.h4>
            <div className="flex flex-col gap-4">
              <motion.div className="flex items-start gap-3" variants={itemVariants}>
                <motion.span 
                  className="material-symbols-outlined text-primary text-xl"
                  variants={iconVariants}
                >
                  phone_in_talk
                </motion.span>
                <div>
                  {/*phone number */}
                  <p className="text-slate-900 dark:text-white text-sm font-bold">
                    {contactInfo?.phone ?? '(555) 000-0000'}
                  </p>
                  <p className="text-slate-600 dark:text-slate-400 text-xs">
                    Mon-Fri, 9am-5pm EST
                  </p>
                </div>
              </motion.div>
              <motion.div className="flex items-start gap-3" variants={itemVariants}>
                <motion.span 
                  className="material-symbols-outlined text-primary text-xl"
                  variants={iconVariants}
                >
                  mail
                </motion.span>
                <div>
                  {/*email address */}
                  <p className="text-slate-900 dark:text-white text-sm font-bold">
                    {contactInfo?.email ?? 'recruiting@firstteamtrucking.com'}
                  </p>
                  <p className="text-slate-600 dark:text-slate-400 text-xs">
                    Typical response within 24h
                  </p>
                </div>
              </motion.div>
              {contactInfo?.whatsapp && (
                <motion.div className="flex items-start gap-3" variants={itemVariants}>
                  <motion.span
                    className="text-primary flex items-center"
                    variants={iconVariants}
                  >
                    <SocialIcon platform="whatsapp" />
                  </motion.span>
                  <div>
                    <a
                      href={`https://wa.me/${contactInfo.whatsapp.replace(/\D/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-900 dark:text-white text-sm font-bold hover:text-primary transition-colors"
                    >
                      {contactInfo.whatsapp}
                    </a>
                    <p className="text-slate-600 dark:text-slate-400 text-xs">
                      WhatsApp us anytime
                    </p>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Location */}
          <motion.div
            className="flex flex-col gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={columnVariants(0.2)}
            style={{ perspective: 1000 }}
          >
            <motion.h4 
              className="text-slate-900 dark:text-white text-xs font-black uppercase tracking-[0.2em]"
              variants={itemVariants}
            >
              Hub Location
            </motion.h4>
            <div className="flex flex-col gap-4">
              <motion.div className="flex items-start gap-3" variants={itemVariants}>
                <motion.span 
                  className="material-symbols-outlined text-primary text-xl"
                  variants={iconVariants}
                >
                  location_on
                </motion.span>
                <div>
                  <p className="text-slate-900 dark:text-white text-sm font-bold">
                    Indianapolis Logistics Hub
                  </p>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">
                    {contactInfo?.address ?? 'Indianapolis, IN 46241'}
                  </p>
                </div>
              </motion.div>
              
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            className="flex flex-col gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={columnVariants(0.3)}
            style={{ perspective: 1000 }}
          >
            <motion.h4 
              className="text-slate-900 dark:text-white text-xs font-black uppercase tracking-[0.2em]"
              variants={itemVariants}
            >
              Quick Navigation
            </motion.h4>
            <nav className="flex flex-col gap-3">
              <motion.a
                className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white text-sm transition-colors"
                href="#privacy"
                variants={itemVariants}
                whileHover={{ x: 5, color: "rgb(239, 68, 68)" }}
              >
                Privacy Policy
              </motion.a>
              <motion.a
                className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white text-sm transition-colors"
                href="#terms"
                variants={itemVariants}
                whileHover={{ x: 5, color: "rgb(239, 68, 68)" }}
              >
                Terms of Service
              </motion.a>
              <motion.a
                className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white text-sm transition-colors"
                href="#safety"
                variants={itemVariants}
                whileHover={{ x: 5, color: "rgb(239, 68, 68)" }}
              >
                Safety Standards
              </motion.a>
              <motion.a
                className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white text-sm transition-colors"
                href="/benefits"
                variants={itemVariants}
                whileHover={{ x: 5, color: "rgb(239, 68, 68)" }}
              >
                Driver Benefits
              </motion.a>
              <motion.a
                className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white text-sm transition-colors"
                href="#portal"
                variants={itemVariants}
                whileHover={{ x: 5, color: "rgb(239, 68, 68)" }}
              >
                Employee Portal
              </motion.a>
            </nav>
          </motion.div>
        </div>

        {/* Footer Bottom */}
        <motion.div
          className="pt-10 border-t border-slate-200 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={bottomVariants}
        >
          <p className="text-slate-600 dark:text-slate-400 text-xs font-medium">
            © 2024 First Team Trucking. All rights reserved.
            <span className="mx-2 text-slate-400/40 dark:text-white/10">|</span>
            An Independent Amazon Freight Partner.
          </p>
          <div className="flex items-center gap-6 opacity-30 grayscale brightness-200">
            <img
              alt="Amazon Freight Partner Logo"
              className="h-6 object-contain"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBsiZxO7hUvMJVNljcypbPsTMo3ilhUYtQj0hMeOofirsnqwmo8F7ly-IAjg-kCmuOsaD_uGHLxMUcA8PSq60tH6eePb6UlDWOfs57UKkmMY8TKYqF5RrVPNuY-tE8hfijvBEERsgLkZU_BKPhQXuYHofPX-GRVho4VCWOHl-vXNtX528wlg2xrlv9iMwKN0IOpoLJ7rzo_p3s8-dr-VywGr4qvMET3HHrLgxkIHLbe-kaM_RGWRhmbeqP7f0xjad_X5S6i8GFyWYU"
            />
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
