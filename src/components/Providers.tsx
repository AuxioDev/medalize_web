import { getTranslations } from "next-intl/server";
import { Reveal } from "./Reveal";
import { ForDoctorsCard } from "./ForDoctors";
import { ForHospitalsCard } from "./ForHospitals";

export async function Providers() {
  const t = await getTranslations("providers");

  return (
    <section id="providers" className="scroll-mt-16 bg-brand-ink py-20 text-brand-ink-text sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <Reveal>
          <span className="text-xs font-semibold uppercase tracking-wide text-teal-400">
            {t("eyebrow")}
          </span>
          <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
            {t("title")}
          </h2>
        </Reveal>

        <div className="mt-10 flex flex-col gap-6">
          <ForDoctorsCard />
          <ForHospitalsCard />
        </div>
      </div>
    </section>
  );
}
