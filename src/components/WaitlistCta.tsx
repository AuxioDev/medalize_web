import { getTranslations } from "next-intl/server";
import { WaitlistForm } from "./WaitlistForm";

export async function WaitlistCta() {
  const t = await getTranslations("waitlist");

  return (
    <section id="waitlist" className="scroll-mt-16 relative overflow-hidden">
      <div className="brand-gradient py-20 sm:py-24">
        <div className="mx-auto max-w-3xl px-5 text-center sm:px-6">
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/85">
            {t("subtitle")}
          </p>
          <div className="mt-8">
            <WaitlistForm />
          </div>
        </div>
      </div>
    </section>
  );
}
