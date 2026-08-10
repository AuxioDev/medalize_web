"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion } from "motion/react";
import { Logo } from "./Logo";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function Header() {
  const t = useTranslations("header");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#how", label: t("nav.how") },
    { href: "#specialties", label: t("nav.specialties") },
    { href: "#why", label: t("nav.why") },
    { href: "#providers", label: t("nav.providers") },
    { href: "#faq", label: t("nav.faq") },
  ];

  return (
    <motion.header
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`sticky top-0 z-40 border-b bg-white/85 backdrop-blur-md transition-shadow duration-300 ${
        scrolled ? "border-brand-border/70 shadow-sm" : "border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-6">
        <a href="#top" className="shrink-0">
          <Logo />
        </a>

        <nav className="hidden items-center gap-7 lg:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group relative text-sm font-medium text-brand-text-muted transition-colors hover:text-brand-text"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-brand-primary transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <LanguageSwitcher />
          <a
            href="#waitlist"
            className="brand-gradient rounded-full px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-blue-900/10 transition-all hover:scale-[1.04] hover:opacity-90 active:scale-[0.97]"
          >
            {t("cta")}
          </a>
        </div>

        <button
          type="button"
          aria-label="Menu"
          onClick={() => setOpen((v) => !v)}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-brand-border lg:hidden"
        >
          <svg width="18" height="14" viewBox="0 0 18 14" fill="none">
            <motion.line
              x1="0"
              y1="1"
              x2="18"
              y2="1"
              stroke="#0F172A"
              strokeWidth="1.6"
              style={{ originX: "9px", originY: "1px" }}
              animate={open ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            />
            <motion.line
              x1="0"
              y1="7"
              x2="18"
              y2="7"
              stroke="#0F172A"
              strokeWidth="1.6"
              animate={{ opacity: open ? 0 : 1 }}
              transition={{ duration: 0.15 }}
            />
            <motion.line
              x1="0"
              y1="13"
              x2="18"
              y2="13"
              stroke="#0F172A"
              strokeWidth="1.6"
              style={{ originX: "9px", originY: "13px" }}
              animate={open ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            />
          </svg>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-brand-border bg-white lg:hidden"
          >
            <nav className="flex flex-col gap-1 px-5 py-4">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-2 py-2.5 text-sm font-medium text-brand-text hover:bg-brand-muted-bg"
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <div className="flex items-center justify-between gap-3 border-t border-brand-border px-5 pb-4 pt-3">
              <LanguageSwitcher />
              <a
                href="#waitlist"
                onClick={() => setOpen(false)}
                className="brand-gradient rounded-full px-4 py-2 text-sm font-semibold text-white"
              >
                {t("cta")}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
