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
  const triggerRef = useRef<HTMLButtonElement>(null);
  const itemRefs = useRef<Array<HTMLButtonElement | null>>([]);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  function closeAndFocusTrigger() {
    setOpen(false);
    triggerRef.current?.focus();
  }

  // Menu pattern (button + role="menu"/"menuitem"), not the listbox pattern
  // this used to reach for: listbox needs aria-selected plus roving
  // tabindex to be correct, and none of that existed. Every item here is a
  // real, individually-focusable <button>, so arrow keys just move actual
  // DOM focus between them — simpler to get right than a fake single-tab-
  // stop listbox, and just as operable with a keyboard.
  useEffect(() => {
    if (!open) return;
    const activeIndex = Math.max(routing.locales.indexOf(locale), 0);
    itemRefs.current[activeIndex]?.focus();

    function onKeyDown(e: KeyboardEvent) {
      const count = routing.locales.length;
      const currentIndex = itemRefs.current.findIndex((el) => el === document.activeElement);
      if (e.key === "Escape") {
        e.preventDefault();
        closeAndFocusTrigger();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        itemRefs.current[(currentIndex + 1 + count) % count]?.focus();
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        itemRefs.current[(currentIndex - 1 + count) % count]?.focus();
      } else if (e.key === "Home") {
        e.preventDefault();
        itemRefs.current[0]?.focus();
      } else if (e.key === "End") {
        e.preventDefault();
        itemRefs.current[count - 1]?.focus();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <div className="relative" ref={ref}>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        className={`flex h-10 items-center gap-1.5 rounded-full px-4 text-[13.5px] font-semibold transition-colors ${
          dark
            ? "border border-brand-ink-border text-brand-ink-text hover:bg-brand-ink-surface-alt"
            : "bg-brand-muted-bg text-brand-text hover:bg-brand-border/70"
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
            role="menu"
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
            {routing.locales.map((l, i) => (
              <li key={l} role="none">
                <button
                  ref={(el) => {
                    itemRefs.current[i] = el;
                  }}
                  type="button"
                  role="menuitem"
                  aria-current={l === locale ? "true" : undefined}
                  onClick={() => {
                    closeAndFocusTrigger();
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
