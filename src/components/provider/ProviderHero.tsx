import type { ReactNode } from "react";
import { getTranslations } from "next-intl/server";
import { AnimatedStat, HeroItem, HeroStagger, PhoneReveal } from "@/components/HeroMotion";

// Same hero layout as the homepage's Hero.tsx (copy + stat badges on the
// left, a phone mockup on the right with the same entrance/float motion),
// parameterized by i18n namespace so /for-doctors and /for-hospitals reuse
// it instead of duplicating the section. `mockup` is the already-composed
// <PhoneMockup><...Animation /></PhoneMockup> for that audience.
export async function ProviderHero({ namespace, mockup }: { namespace: string; mockup: ReactNode }) {
  const t = await getTranslations(`${namespace}.hero`);

  const badges = [
    { value: t("badge1Value"), label: t("badge1Label") },
    { value: t("badge2Value"), label: t("badge2Label") },
    { value: t("badge3Value"), label: t("badge3Label") },
  ];

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 -z-10 h-[560px] bg-gradient-to-b from-blue-50 via-teal-50/40 to-transparent" />

      <div className="mx-auto grid max-w-6xl gap-12 px-5 pb-16 pt-14 sm:px-6 sm:pt-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:pb-24 lg:pt-24">
        <HeroStagger>
          <HeroItem>
            <span className="inline-flex items-center rounded-full border border-brand-primary/20 bg-brand-primary/5 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wide text-brand-primary">
              {t("eyebrow")}
            </span>
          </HeroItem>

          <HeroItem>
            <h1 className="mt-5 text-4xl font-semibold tracking-tight text-brand-text sm:text-5xl lg:text-[3.25rem] lg:leading-[1.08]">
              {t("title")}
            </h1>
          </HeroItem>

          <HeroItem>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-brand-text-muted sm:text-lg">
              {t("subtitle")}
            </p>
          </HeroItem>

          <HeroItem className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#waitlist"
              className="brand-gradient rounded-full px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-900/15 transition-all hover:scale-[1.03] hover:shadow-xl active:scale-[0.98]"
            >
              {t("ctaPrimary")}
            </a>
            <a
              href="#how"
              className="rounded-full border border-brand-border px-6 py-3 text-sm font-semibold text-brand-text transition-all hover:scale-[1.03] hover:bg-brand-muted-bg active:scale-[0.98]"
            >
              {t("ctaSecondary")}
            </a>
          </HeroItem>

          <HeroItem>
            <dl className="mt-10 grid max-w-lg grid-cols-3 gap-4 border-t border-brand-border pt-6">
              {badges.map((badge, i) => (
                <div key={badge.label}>
                  <dt className="sr-only">{badge.label}</dt>
                  <dd className="text-2xl font-semibold text-brand-text">
                    <AnimatedStat value={badge.value} delay={0.5 + i * 0.15} />
                  </dd>
                  <dd className="mt-0.5 text-xs leading-snug text-brand-text-muted">
                    {badge.label}
                  </dd>
                </div>
              ))}
            </dl>
          </HeroItem>
        </HeroStagger>

        <PhoneReveal>{mockup}</PhoneReveal>
      </div>
    </section>
  );
}
