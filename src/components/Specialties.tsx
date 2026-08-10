"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import type { Locale } from "@/i18n/routing";
import { specialties, specialtyOrder } from "@/data/specialties";

export function Specialties() {
  const t = useTranslations("specialties");
  const locale = useLocale() as Locale;
  const [active, setActive] = useState(specialtyOrder[1]);

  return (
    <section id="specialties" className="scroll-mt-16 bg-brand-muted-bg py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <span className="text-xs font-semibold uppercase tracking-wide text-brand-primary">
          {t("eyebrow")}
        </span>
        <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight text-brand-text sm:text-4xl">
          {t("title")}
        </h2>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-brand-text-muted">
          {t("subtitle")}
        </p>

        <div className="mt-8 flex flex-wrap gap-2.5">
          {specialtyOrder.map((id) => {
            const isActive = id === active;
            return (
              <button
                key={id}
                type="button"
                onClick={() => setActive(id)}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "border-transparent bg-brand-primary text-white shadow-sm"
                    : "border-brand-border bg-white text-brand-text hover:border-brand-primary/40"
                }`}
              >
                {specialties[id][locale]}
              </button>
            );
          })}
        </div>

        <div className="mt-8 rounded-2xl border border-brand-border bg-white p-6 sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
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
              className="brand-gradient shrink-0 rounded-full px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              {t("cta")}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
