"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  // Fetch CMS logo
  useEffect(() => {
    fetch("/api/home")
      .then((r) => r.json())
      .then((json) => {
        const logo = json?.data?.original?.data?.site_metadata?.logo;
        if (logo) setLogoUrl(logo);
      })
      .catch(() => {});
  }, []);

  // Handle hash scrolling on page load
  useEffect(() => {
    const hash = window.location.hash;
    if (hash && pathname === "/") {
      const sectionId = hash.replace("#", "");
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          const navbarHeight = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition =
            elementPosition + window.pageYOffset - navbarHeight;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
      }, 100);
    }
  }, [pathname]);

  const handleSmoothScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string,
  ) => {
    e.preventDefault();

    // If not on home page, navigate to home first
    if (pathname !== "/") {
      router.push(`/#${sectionId}`);
      return;
    }

    // Smooth scroll to section
    const element = document.getElementById(sectionId);
    if (element) {
      const navbarHeight = 80; // Approximate navbar height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <header className="fixed top-0 z-50 w-full border-b border-slate-200 dark:border-white/5 bg-white/80 dark:bg-charcoal/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 py-3 md:py-4">
        {/* Logo */}
        <motion.a
          href="/#home"
          onClick={(e) => handleSmoothScroll(e, "home")}
          className="flex items-center gap-2 sm:gap-3 shrink-0"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          {logoUrl ? (
            <Image
              src={logoUrl}
              alt="First Team Trucking Logo"
              width={64}
              height={64}
              className="w-14 sm:w-16"
            />
          ) : (
            <>
              {/* Light mode fallback */}
              <Image
                src="/FTT-Logo.png"
                alt="First Team Trucking Logo"
                width={64}
                height={64}
                className="w-14 sm:w-16 dark:hidden"
              />
              {/* Dark mode fallback */}
              <Image
                src="/FFT-Logo-white.png"
                alt="First Team Trucking Logo"
                width={64}
                height={64}
                className="w-14 sm:w-16 hidden dark:block"
              />
            </>
          )}

        </motion.a>

        {/* Desktop Navigation (ONLY xl+) */}
        <nav className="hidden xl:flex flex-1 justify-center gap-6 px-6">
          {[
            { href: "/#home", label: "Home", sectionId: "home" },
            { href: "/#about", label: "About Us", sectionId: "about" },

            { href: "/gallery", label: "Gallery", sectionId: null },
          ].map((item) => (
            <motion.a
              key={item.href}
              href={item.href}
              onClick={(e) =>
                item.sectionId
                  ? handleSmoothScroll(e, item.sectionId)
                  : undefined
              }
              className="text-sm font-semibold text-slate-700 dark:text-white/70 transition-colors hover:text-primary whitespace-nowrap"
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
            >
              {item.label}
            </motion.a>
          ))}
        </nav>

        {/* CTA + Mobile Toggle */}
        <div className="flex items-center gap-3">
          {/* CTA ONLY xl+ */}
          <motion.a
            href="/apply-now"
            className="hidden xl:flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-bold uppercase tracking-wider text-white transition-all hover:bg-primary/90"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Apply Now
          </motion.a>

          {/* Hamburger until xl */}
          <motion.button
            className="xl:hidden text-slate-900 dark:text-white p-2 hover:bg-slate-100 dark:hover:bg-white/10 rounded-lg transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            whileTap={{ scale: 0.95 }}
          >
            <span className="material-symbols-outlined text-[28px]">
              {mobileMenuOpen ? "close" : "menu"}
            </span>
          </motion.button>
        </div>
      </div>

      {/* Mobile / Tablet Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="xl:hidden absolute top-full left-0 w-full bg-white/95 dark:bg-charcoal/95 backdrop-blur-md border-b border-slate-200 dark:border-white/5 shadow-lg"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <nav className="flex flex-col p-4 sm:p-6">
              {[
                { label: "Home", sectionId: "home", href: "/#home" },
                { label: "About Us", sectionId: "about", href: "/#about" },
                { label: "Gallery", sectionId: null, href: "/gallery" },

              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => {
                    if (item.sectionId) {
                      handleSmoothScroll(e, item.sectionId);
                      setMobileMenuOpen(false);
                    } else {
                      setMobileMenuOpen(false);
                    }
                  }}
                  className="py-3 px-2 text-base font-semibold text-slate-700 dark:text-white/70 hover:text-primary rounded-lg hover:bg-slate-50 dark:hover:bg-white/5"
                >
                  {item.label}
                </a>
              ))}

              <a
                href="/apply-now"
                className="mt-4 flex items-center justify-center rounded-lg bg-primary px-5 py-3 text-sm font-bold uppercase tracking-wider text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                Apply Now
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
