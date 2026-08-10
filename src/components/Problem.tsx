import { getTranslations } from "next-intl/server";
import { Reveal, RevealGroup, RevealItem } from "./Reveal";

export async function Problem() {
  const t = await getTranslations("problem");
  const cards = t.raw("cards") as { title: string; body: string }[];

  return (
    <section className="bg-brand-ink py-20 text-brand-ink-text sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <Reveal>
          <span className="text-xs font-semibold uppercase tracking-wide text-teal-400">
            {t("eyebrow")}
          </span>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
            {t("title")}
          </h2>
        </Reveal>
        <Reveal delay={0.14}>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-400">
            {t("body")}
          </p>
        </Reveal>

        <RevealGroup className="mt-12 grid gap-4 sm:grid-cols-3">
          {cards.map((card) => (
            <RevealItem
              key={card.title}
              className="rounded-2xl border border-brand-ink-border bg-brand-ink-surface p-6 transition-colors hover:border-teal-400/30"
            >
              <h3 className="text-base font-semibold text-white">{card.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{card.body}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
