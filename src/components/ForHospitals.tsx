import { getTranslations } from "next-intl/server";
import { Reveal, RevealGroup, RevealItem } from "./Reveal";

const icons = [
  // user-plus — invite your roster
  <svg key="invite" width="20" height="20" viewBox="0 0 20 20" fill="none">
    <circle cx="8" cy="6.5" r="3" stroke="currentColor" strokeWidth="1.5" />
    <path
      d="M2.5 17C2.5 13.4 4.9 11 8 11C11.1 11 13.5 13.4 13.5 17"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path d="M16.5 6V11M14 8.5H19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>,
  // clock — centralized hours
  <svg key="hours" width="20" height="20" viewBox="0 0 20 20" fill="none">
    <circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M10 5.5V10L13 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>,
  // eye-off — privacy-safe overview
  <svg key="privacy" width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path
      d="M2.5 10.5C4 6.8 6.8 4.8 10 4.8C13.2 4.8 16 6.8 17.5 10.5C16 14.2 13.2 16.2 10 16.2C6.8 16.2 4 14.2 2.5 10.5Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <circle cx="10" cy="10.5" r="2.4" stroke="currentColor" strokeWidth="1.5" />
    <path d="M3.5 3.5L16.5 17.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>,
];

export async function ForHospitalsCard() {
  const t = await getTranslations("forHospitals");
  const features = t.raw("features") as { title: string; body: string }[];

  return (
    <Reveal className="rounded-3xl border border-brand-ink-border bg-brand-ink-surface p-8 sm:p-12">
      <div className="max-w-2xl">
        <span className="text-xs font-semibold uppercase tracking-wide text-teal-400">
          {t("label")}
        </span>
        <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
          {t("title")}
        </h3>
        <p className="mt-4 text-sm leading-relaxed text-slate-400 sm:text-base">{t("body")}</p>
      </div>

      <RevealGroup className="mt-8 grid gap-5 sm:grid-cols-3">
        {features.map((feature, i) => (
          <RevealItem key={feature.title}>
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-teal-400">
              {icons[i]}
            </div>
            <h4 className="mt-3 text-sm font-semibold text-white">{feature.title}</h4>
            <p className="mt-1.5 text-xs leading-relaxed text-slate-400">{feature.body}</p>
          </RevealItem>
        ))}
      </RevealGroup>

      <div className="mt-8 flex flex-col gap-4 border-t border-brand-ink-border pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-md text-xs leading-relaxed text-slate-500">{t("pricingNote")}</p>
        <a
          href="mailto:info@auxiodev.com?subject=DocLine%20—%20Hospital%20inquiry"
          className="brand-gradient shrink-0 rounded-full px-6 py-3 text-center text-sm font-semibold text-white shadow-lg shadow-blue-900/20 transition-all hover:scale-[1.03] active:scale-[0.98]"
        >
          {t("cta")}
        </a>
      </div>
    </Reveal>
  );
}
