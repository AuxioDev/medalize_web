import { getTranslations } from "next-intl/server";
import { Reveal } from "./Reveal";

export async function ForDoctors() {
  const t = await getTranslations("forDoctors");

  return (
    <section id="doctors" className="scroll-mt-16 bg-brand-ink py-20 text-brand-ink-text sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <Reveal className="flex flex-col items-start gap-8 rounded-3xl border border-brand-ink-border bg-brand-ink-surface p-8 sm:p-12 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-wide text-teal-400">
              {t("eyebrow")}
            </span>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              {t("title")}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-400 sm:text-base">
              {t("body")}
            </p>
          </div>
          <a
            href="mailto:support@auxiodev.com?subject=Medoro%20—%20Doctor%20application"
            className="brand-gradient shrink-0 rounded-full px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-900/20 transition-all hover:scale-[1.03] active:scale-[0.98]"
          >
            {t("cta")}
          </a>
        </Reveal>
      </div>
    </section>
  );
}
