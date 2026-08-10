"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { AnimatePresence, motion } from "motion/react";
import type { Locale } from "@/i18n/routing";
import { specialties, specialtyOrder } from "@/data/specialties";
import { Reveal, RevealGroup, RevealItem } from "./Reveal";

export function Specialties() {
  const t = useTranslations("specialties");
  const locale = useLocale() as Locale;
  const [active, setActive] = useState(specialtyOrder[1]);

  return (
    <section id="specialties" className="scroll-mt-16 bg-brand-muted-bg py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <Reveal>
          <span className="text-xs font-semibold uppercase tracking-wide text-brand-primary">
            {t("eyebrow")}
          </span>
          <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight text-brand-text sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-brand-text-muted">
            {t("subtitle")}
          </p>
        </Reveal>

        <RevealGroup className="mt-8 flex flex-wrap gap-2.5" stagger={0.03}>
          {specialtyOrder.map((id) => {
            const isActive = id === active;
            return (
              <RevealItem key={id}>
                <button
                  type="button"
                  onClick={() => setActive(id)}
                  className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? "text-white"
                      : "border border-brand-border bg-white text-brand-text hover:border-brand-primary/40"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="specialtyPill"
                      className="absolute inset-0 rounded-full bg-brand-primary shadow-sm"
                      transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    />
                  )}
                  <span className="relative">{specialties[id][locale]}</span>
                </button>
              </RevealItem>
            );
          })}
        </RevealGroup>

        <Reveal delay={0.1} className="mt-8 overflow-hidden rounded-2xl border border-brand-border bg-white p-6 sm:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-wrap items-center justify-between gap-4"
            >
              <div>
                <h3 className="text-xl font-semibold text-brand-text">
                  {specialties[active][locale]}
                </h3>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-brand-text-muted">
                  {t("detailBody")}
                </p>
              </div>
              <a
                href="#waitlist"
                className="brand-gradient shrink-0 rounded-full px-5 py-2.5 text-sm font-semibold text-white transition-all hover:scale-[1.03] hover:opacity-90 active:scale-[0.98]"
              >
                {t("cta")}
              </a>
            </motion.div>
          </AnimatePresence>
        </Reveal>
      </div>
    </section>
  );
}
