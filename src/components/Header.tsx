"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Logo } from "./Logo";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function Header() {
  const t = useTranslations("header");
  const [open, setOpen] = useState(false);

  const links = [
    { href: "#how", label: t("nav.how") },
    { href: "#specialties", label: t("nav.specialties") },
    { href: "#why", label: t("nav.why") },
    { href: "#doctors", label: t("nav.doctors") },
    { href: "#faq", label: t("nav.faq") },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-brand-border/70 bg-white/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-6">
        <a href="#top" className="shrink-0">
          <Logo />
        </a>

        <nav className="hidden items-center gap-7 lg:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-brand-text-muted transition-colors hover:text-brand-text"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <LanguageSwitcher />
          <a
            href="#waitlist"
            className="brand-gradient rounded-full px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-blue-900/10 transition-opacity hover:opacity-90"
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
            <path d="M0 1H18M0 7H18M0 13H18" stroke="#0F172A" strokeWidth="1.6" />
          </svg>
        </button>
      </div>

      {open && (
        <div className="border-t border-brand-border bg-white px-5 py-4 lg:hidden">
          <nav className="flex flex-col gap-1">
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
          <div className="mt-3 flex items-center justify-between gap-3 border-t border-brand-border pt-3">
            <LanguageSwitcher />
            <a
              href="#waitlist"
              onClick={() => setOpen(false)}
              className="brand-gradient rounded-full px-4 py-2 text-sm font-semibold text-white"
            >
              {t("cta")}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
