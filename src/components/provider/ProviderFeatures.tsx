import type { ReactNode } from "react";
import { getTranslations } from "next-intl/server";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";

// A light-background feature grid — distinct from the homepage's dark
// ForHospitals.tsx card (which lives inside the #providers teaser and
// needs to read as a preview), since this section IS the full page for
// that audience. `icons` is positional, matching `namespace`'s `features`
// array order.
export async function ProviderFeatures({ namespace, icons }: { namespace: string; icons: ReactNode[] }) {
  const t = await getTranslations(namespace);
  const features = t.raw("features") as { title: string; body: string }[];

  return (
    <section id="features" className="scroll-mt-16 bg-brand-muted-bg py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <Reveal>
          <h2 className="max-w-2xl text-3xl font-semibold tracking-tight text-brand-text sm:text-4xl">
            {t("featuresTitle")}
          </h2>
        </Reveal>

        <RevealGroup className="mt-12 grid gap-5 sm:grid-cols-3">
          {features.map((feature, i) => (
            <RevealItem key={feature.title}>
              <div className="h-full rounded-2xl border border-brand-border bg-white p-6">
                <div className="brand-gradient flex h-10 w-10 items-center justify-center rounded-xl text-white">
                  {icons[i]}
                </div>
                <h3 className="mt-4 text-base font-semibold text-brand-text">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-brand-text-muted">{feature.body}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
