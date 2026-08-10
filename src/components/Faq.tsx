"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

export function Faq() {
  const t = useTranslations("faq");
  const items = t.raw("items") as { q: string; a: string }[];
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="scroll-mt-16 bg-brand-muted-bg py-20 sm:py-24">
      <div className="mx-auto max-w-3xl px-5 sm:px-6">
        <span className="text-xs font-semibold uppercase tracking-wide text-brand-primary">
          {t("eyebrow")}
        </span>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-brand-text sm:text-4xl">
          {t("title")}
        </h2>

        <div className="mt-10 divide-y divide-brand-border overflow-hidden rounded-2xl border border-brand-border bg-white">
          {items.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={item.q}>
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4.5 text-left sm:px-6"
                >
                  <span className="text-sm font-semibold text-brand-text sm:text-base">
                    {item.q}
                  </span>
                  <span
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-brand-border text-brand-text-muted transition-transform ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M6 1V11M1 6H11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                    </svg>
                  </span>
                </button>
                {isOpen && (
                  <div className="px-5 pb-4.5 sm:px-6">
                    <p className="text-sm leading-relaxed text-brand-text-muted">{item.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
