"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useLocale, useTranslations } from "next-intl";
import { AnimatePresence, motion } from "motion/react";
import { Logo } from "./Logo";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { routing, localeLabels, type Locale } from "@/i18n/routing";

const EASE = [0.22, 1, 0.36, 1] as const;

// Small icon set for the nav pills — one glyph per link, matching each
// item's meaning rather than a generic bullet. Kept as inline SVGs at the
// same 16px scale used across the rest of the site's small UI icons.
export function CompassIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M15.3 8.7 12.8 13l-4.3 2.3 2.5-4.3 4.3-2.3Z" />
    </svg>
  );
}

export function GridIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
    </svg>
  );
}

export function ShieldIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3 19 6v6c0 4.5-3 8-7 9-4-1-7-4.5-7-9V6l7-3Z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

export function BriefcaseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </svg>
  );
}

export function TagIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 11.5 11.5 3H19a2 2 0 0 1 2 2v7.5L12.5 21 3 11.5Z" />
      <circle cx="15.3" cy="8.7" r="1.3" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function InfoCircleIcon({ char = "?" }: { char?: string }) {
  return (
    <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-[1.6px] border-current text-[10px] font-extrabold leading-none">
      {char}
    </span>
  );
}

type NavLink = { href: string; label: string; icon?: ReactNode };

// The homepage passes nothing and gets its usual in-page anchor nav. The
// /for-doctors and /for-hospitals pages pass their own section anchors
// (#how, #features, #pricing, #faq — all on that same page) plus
// homeHref="/" so the logo routes back to the homepage instead of trying
// to scroll to a #top section that doesn't exist there.
export function Header({ links: linksProp, homeHref = "#top" }: { links?: NavLink[]; homeHref?: string }) {
  const t = useTranslations("header");
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Full-screen mobile panel: lock background scroll while it's open, the
  // same way the panel it's modeled on does.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const links: NavLink[] = linksProp ?? [
    { href: "#how", label: t("nav.how"), icon: <CompassIcon /> },
    { href: "#specialties", label: t("nav.specialties"), icon: <GridIcon /> },
    { href: "#why", label: t("nav.why"), icon: <ShieldIcon /> },
    { href: "#providers", label: t("nav.providers"), icon: <BriefcaseIcon /> },
    { href: "#faq", label: t("nav.faq"), icon: <InfoCircleIcon /> },
  ];
  const isRoute = homeHref.startsWith("/");

  return (
    <>
      <motion.header
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="sticky top-0 z-40 px-3 sm:px-5"
      >
        <motion.div
          animate={{
            height: scrolled ? 62 : 76,
            marginTop: scrolled ? 8 : 14,
            backgroundColor: scrolled ? "rgba(255,255,255,0.94)" : "rgba(255,255,255,0.78)",
            boxShadow: scrolled
              ? "0 12px 36px rgba(15,23,42,0.10)"
              : "0 8px 28px rgba(15,23,42,0.05)",
          }}
          transition={{ duration: 0.35, ease: EASE }}
          className="mx-auto flex max-w-6xl items-center justify-between rounded-full border border-white/60 pl-4 pr-3 backdrop-blur-xl sm:pl-6 sm:pr-4"
        >
          {isRoute ? (
            <Link href={homeHref} className="shrink-0">
              <Logo />
            </Link>
          ) : (
            <a href={homeHref} className="shrink-0">
              <Logo />
            </a>
          )}

          <nav className="hidden flex-1 items-center justify-center gap-2 lg:flex">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="flex items-center gap-2 whitespace-nowrap rounded-full bg-brand-muted-bg px-4 py-2.5 text-[13.5px] font-semibold text-brand-text-muted transition-all hover:-translate-y-px hover:bg-brand-border/70 hover:text-brand-text"
              >
                <span className="opacity-70">{link.icon}</span>
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden shrink-0 items-center gap-2 lg:flex">
            <LanguageSwitcher />
            <a
              href="#waitlist"
              className="nav-cta-pulse brand-gradient rounded-full px-5 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-[1.04] active:scale-[0.97]"
            >
              {t("cta")}
            </a>
          </div>

          <button
            type="button"
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors hover:bg-brand-muted-bg lg:hidden"
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
                transition={{ duration: 0.25, ease: EASE }}
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
                transition={{ duration: 0.25, ease: EASE }}
              />
            </svg>
          </button>
        </motion.div>
      </motion.header>

      {/* Full-screen mobile menu — slides in from the right and covers the
          viewport, rather than pushing content down under the bar. */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: EASE }}
            className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-white px-6 pb-8 pt-6 lg:hidden"
          >
            <div className="mb-4 flex items-center justify-between border-b border-brand-border pb-5">
              {isRoute ? (
                <Link href={homeHref} onClick={() => setOpen(false)}>
                  <Logo />
                </Link>
              ) : (
                <a href={homeHref} onClick={() => setOpen(false)}>
                  <Logo />
                </a>
              )}
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-muted-bg text-brand-text transition-colors hover:bg-brand-border"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M1 1L15 15M15 1L1 15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <nav className="flex flex-col">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="group flex items-center justify-between gap-3 border-b border-brand-border py-4 text-lg font-semibold text-brand-text transition-colors hover:text-brand-primary"
                >
                  <span className="flex items-center gap-3">
                    <span className="text-brand-text-muted">{link.icon}</span>
                    {link.label}
                  </span>
                  <span className="text-brand-text-muted opacity-40 transition-all group-hover:translate-x-1 group-hover:opacity-100">
                    →
                  </span>
                </a>
              ))}
            </nav>

            <div className="mt-6 rounded-2xl bg-brand-muted-bg p-5">
              <p className="text-[11px] font-extrabold uppercase tracking-wider text-brand-text-muted">
                {t("langLabel")}
              </p>
              <div className="mt-3 flex gap-2">
                {routing.locales.map((l) => (
                  <button
                    key={l}
                    type="button"
                    onClick={() => {
                      setOpen(false);
                      router.replace(pathname, { locale: l });
                    }}
                    className={`flex-1 rounded-xl border px-2 py-3 text-center text-sm font-bold transition-all ${
                      l === locale
                        ? "border-brand-primary bg-white text-brand-primary shadow-sm"
                        : "border-brand-border bg-white/60 text-brand-text-muted"
                    }`}
                  >
                    {localeLabels[l]}
                  </button>
                ))}
              </div>
            </div>

            <a
              href="#waitlist"
              onClick={() => setOpen(false)}
              className="brand-gradient mt-auto flex w-full items-center justify-center rounded-full py-3.5 text-sm font-semibold text-white"
            >
              {t("cta")}
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
