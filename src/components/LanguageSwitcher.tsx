"use client";

import { useLocale } from "next-intl";
import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, localeLabels, type Locale } from "@/i18n/routing";

export function LanguageSwitcher({ dark = false }: { dark?: boolean }) {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium transition-colors ${
          dark
            ? "border-brand-ink-border text-brand-ink-text hover:bg-brand-ink-surface-alt"
            : "border-brand-border text-brand-text hover:bg-brand-muted-bg"
        }`}
      >
        {locale.toUpperCase()}
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        >
          <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>
      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
            className={`absolute right-0 z-50 mt-2 w-40 origin-top-right overflow-hidden rounded-xl border py-1 shadow-lg ${
              dark
                ? "border-brand-ink-border bg-brand-ink-surface"
                : "border-brand-border bg-white"
            }`}
          >
            {routing.locales.map((l) => (
              <li key={l}>
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    router.replace(pathname, { locale: l });
                  }}
                  className={`flex w-full items-center justify-between px-3 py-2 text-sm transition-colors ${
                    l === locale
                      ? "font-semibold text-brand-primary"
                      : dark
                        ? "text-brand-ink-text hover:bg-brand-ink-surface-alt"
                        : "text-brand-text hover:bg-brand-muted-bg"
                  }`}
                >
                  {localeLabels[l]}
                  <span className="text-xs uppercase opacity-60">{l}</span>
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
