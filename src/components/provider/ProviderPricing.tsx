import { getTranslations } from "next-intl/server";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";

type Tier = { name: string; price: string; period: string; description: string; features: string[] };

// Two-tier pricing grid shared by /for-doctors (Başlanğıc / Peşəkar) and
// /for-hospitals (Klinika / Klinika Plus) — figures sourced from
// medalize_be/apps/subscriptions/plans.py (PLAN_PRICES / PLAN_LIMITS /
// HOSPITAL_PLAN_LIMITS), not invented, so this page never promises a price
// or limit the backend doesn't actually enforce.
export async function ProviderPricing({ namespace }: { namespace: string }) {
  const t = await getTranslations(`${namespace}.pricing`);
  const tiers = t.raw("tiers") as Tier[];

  return (
    <section id="pricing" className="scroll-mt-16 bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-5xl px-5 sm:px-6">
        <Reveal>
          <span className="text-xs font-semibold uppercase tracking-wide text-brand-primary">
            {t("eyebrow")}
          </span>
          <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight text-brand-text sm:text-4xl">
            {t("title")}
          </h2>
        </Reveal>

        <RevealGroup className="mt-12 grid gap-6 sm:grid-cols-2">
          {tiers.map((tier, i) => (
            <RevealItem key={tier.name}>
              <div
                className={`h-full rounded-3xl border p-8 ${
                  i === 1 ? "border-brand-primary/30 bg-brand-primary/5" : "border-brand-border bg-brand-card"
                }`}
              >
                <h3 className="text-lg font-semibold text-brand-text">{tier.name}</h3>
                <p className="mt-1 text-sm text-brand-text-muted">{tier.description}</p>
                <p className="mt-5 flex items-baseline gap-1">
                  <span className="text-3xl font-semibold tracking-tight text-brand-text">{tier.price}</span>
                  <span className="text-sm font-medium text-brand-text-muted">AZN{tier.period}</span>
                </p>
                <ul className="mt-6 space-y-2.5">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm text-brand-text">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        className="mt-0.5 shrink-0 text-brand-secondary"
                        aria-hidden="true"
                      >
                        <path
                          d="M2.5 8.5L6 12L13.5 4"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal delay={0.1}>
          <p className="mt-8 text-center text-xs leading-relaxed text-brand-text-muted">{t("note")}</p>
        </Reveal>
      </div>
    </section>
  );
}
