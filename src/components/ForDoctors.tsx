import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Reveal } from "./Reveal";

export async function ForDoctorsCard() {
  const t = await getTranslations("forDoctors");

  return (
    <Reveal className="flex flex-col items-start gap-8 rounded-3xl border border-brand-ink-border bg-brand-ink-surface p-8 sm:p-12 md:flex-row md:items-center md:justify-between">
      <div className="max-w-2xl">
        <span className="text-xs font-semibold uppercase tracking-wide text-teal-400">
          {t("label")}
        </span>
        <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
          {t("title")}
        </h3>
        <p className="mt-4 text-sm leading-relaxed text-slate-400 sm:text-base">{t("body")}</p>
        <Link
          href="/for-doctors"
          className="mt-4 inline-block text-sm font-semibold text-teal-400 underline-offset-4 transition-colors hover:text-teal-300 hover:underline"
        >
          {t("learnMore")} →
        </Link>
      </div>
      <a
        href="mailto:info@auxiodev.com?subject=DocGet%20—%20Doctor%20application"
        className="brand-gradient shrink-0 rounded-full px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-900/20 transition-all hover:scale-[1.03] active:scale-[0.98]"
      >
        {t("cta")}
      </a>
    </Reveal>
  );
}
