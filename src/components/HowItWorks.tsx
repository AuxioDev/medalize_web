import { getTranslations } from "next-intl/server";
import { Reveal, RevealGroup, RevealItem } from "./Reveal";

export async function HowItWorks() {
  const t = await getTranslations("how");
  const steps = t.raw("steps") as { label: string; title: string; body: string }[];

  return (
    <section id="how" className="scroll-mt-16 bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <Reveal>
          <span className="text-xs font-semibold uppercase tracking-wide text-brand-primary">
            {t("eyebrow")}
          </span>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight text-brand-text sm:text-4xl">
            {t("title")}
          </h2>
        </Reveal>

        <RevealGroup className="mt-14 grid gap-10 sm:grid-cols-3 sm:gap-6">
          {steps.map((step, i) => (
            <RevealItem key={step.title} className="relative">
              <div className="flex items-center gap-3">
                <span className="brand-gradient flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white">
                  {i + 1}
                </span>
                <span className="text-xs font-semibold uppercase tracking-wide text-brand-text-muted">
                  {step.label}
                </span>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-brand-text">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-brand-text-muted">{step.body}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
