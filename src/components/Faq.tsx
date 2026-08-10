"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion } from "motion/react";
import { Reveal, RevealGroup, RevealItem } from "./Reveal";

export function Faq() {
  const t = useTranslations("faq");
  const items = t.raw("items") as { q: string; a: string }[];
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="scroll-mt-16 bg-brand-muted-bg py-20 sm:py-24">
      <div className="mx-auto max-w-3xl px-5 sm:px-6">
        <Reveal>
          <span className="text-xs font-semibold uppercase tracking-wide text-brand-primary">
            {t("eyebrow")}
          </span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-brand-text sm:text-4xl">
            {t("title")}
          </h2>
        </Reveal>

        <RevealGroup className="mt-10 divide-y divide-brand-border overflow-hidden rounded-2xl border border-brand-border bg-white">
          {items.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <RevealItem key={item.q}>
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4.5 text-left transition-colors hover:bg-brand-muted-bg/60 sm:px-6"
                >
                  <span className="text-sm font-semibold text-brand-text sm:text-base">
                    {item.q}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-brand-border text-brand-text-muted"
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M6 1V11M1 6H11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                    </svg>
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-4.5 text-sm leading-relaxed text-brand-text-muted sm:px-6">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
