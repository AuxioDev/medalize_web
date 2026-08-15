import { getTranslations } from "next-intl/server";
import { Reveal, RevealGroup, RevealItem } from "./Reveal";

const icons = [
  // shield-check — verified doctors
  <svg key="shield" width="22" height="22" viewBox="0 0 22 22" fill="none">
    <path
      d="M11 2.5 18.5 5.5V10.5C18.5 15 15.4 18.4 11 19.5C6.6 18.4 3.5 15 3.5 10.5V5.5L11 2.5Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <path d="M8 11 10.2 13.2 14.5 8.8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>,
  // star — real reviews
  <svg key="star" width="22" height="22" viewBox="0 0 22 22" fill="none">
    <path
      d="M11 2.5 13.5 8.2 19.7 8.8 15 12.9 16.4 19 11 15.8 5.6 19 7 12.9 2.3 8.8 8.5 8.2 11 2.5Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
  </svg>,
  // users — family
  <svg key="users" width="22" height="22" viewBox="0 0 22 22" fill="none">
    <circle cx="8" cy="7" r="2.8" stroke="currentColor" strokeWidth="1.5" />
    <path d="M2.8 18C2.8 14.8 5.1 12.6 8 12.6C10.9 12.6 13.2 14.8 13.2 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="15.5" cy="8" r="2.2" stroke="currentColor" strokeWidth="1.5" />
    <path d="M13.6 18C13.6 15.3 15.4 13.4 17.7 13.4C19.7 13.4 19.2 15.5 19.2 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>,
  // map-pin — nationwide
  <svg key="map" width="22" height="22" viewBox="0 0 22 22" fill="none">
    <path
      d="M11 19.5S17.5 13.9 17.5 8.9C17.5 5.3 14.6 2.5 11 2.5C7.4 2.5 4.5 5.3 4.5 8.9C4.5 13.9 11 19.5 11 19.5Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <circle cx="11" cy="8.8" r="2.3" stroke="currentColor" strokeWidth="1.5" />
  </svg>,
];

export async function WhyDocGet() {
  const t = await getTranslations("why");
  const cards = t.raw("cards") as { title: string; body: string }[];

  return (
    <section id="why" className="scroll-mt-16 bg-white py-20 sm:py-24">
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

        <RevealGroup className="mt-12 grid gap-4 sm:grid-cols-2">
          {cards.map((card, i) => (
            <RevealItem
              key={card.title}
              className="rounded-2xl border border-brand-border bg-brand-card p-6 transition-all hover:-translate-y-1 hover:border-brand-primary/30 hover:shadow-md"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary">
                {icons[i]}
              </div>
              <h3 className="mt-4 text-base font-semibold text-brand-text">{card.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-brand-text-muted">{card.body}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
