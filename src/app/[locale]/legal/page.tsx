import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

type Params = Promise<{ locale: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "legal" });

  return {
    title: t("title"),
    description: t("privacyIntro"),
    alternates: {
      canonical: `/${locale}/legal`,
      languages: Object.fromEntries(routing.locales.map((l) => [l, `/${l}/legal`])),
    },
    openGraph: {
      title: t("title"),
      description: t("privacyIntro"),
      url: `https://docget.az/${locale}/legal`,
      siteName: "DocGet",
      locale,
      type: "website",
    },
  };
}

// Public mirror of the in-app Legal screen (medalize_mb's LegalScreen), so
// the App Store / Play Console listing forms have a URL to point at outside
// the app itself. Both read from the same `legal.*` source content per
// locale (mobile's lib/i18n/*.i18n.json, copied into src/messages/*.json)
// so the two surfaces can't drift apart.
const SECTION_KEYS = [
  "identity",
  "health",
  "professional",
  "location",
  "device",
  "payment",
  "family",
  "purposes",
  "legalBasis",
  "thirdParties",
  "retention",
  "rights",
  "security",
  "permissions",
  "children",
] as const;

export default async function LegalPage({ params }: { params: Params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "legal" });

  return (
    <>
      <Header links={[]} homeHref="/" />
      <main className="flex-1">
        <div className="mx-auto max-w-3xl px-5 py-16 sm:px-6 sm:py-24">
          <p className="text-xs font-semibold uppercase tracking-wide text-brand-text-muted">
            {t("controllerNotice")}
          </p>

          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-brand-text sm:text-4xl">
            {t("privacyTitle")}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-brand-text-muted">{t("privacyIntro")}</p>

          <div className="mt-10 space-y-8">
            {SECTION_KEYS.map((key) => (
              <section key={key}>
                <h2 className="text-lg font-semibold text-brand-text">{t(`sections.${key}.title`)}</h2>
                <p className="mt-2 text-sm leading-relaxed text-brand-text-muted">
                  {t(`sections.${key}.body`)}
                </p>
              </section>
            ))}
          </div>

          <h2 className="mt-16 text-2xl font-semibold tracking-tight text-brand-text">{t("termsTitle")}</h2>
          <p className="mt-4 text-sm leading-relaxed text-brand-text-muted">{t("termsIntro")}</p>
          <p className="mt-3 text-sm leading-relaxed text-brand-text-muted">{t("termsBody")}</p>

          <p className="mt-16 border-t border-black/5 pt-6 text-center text-sm text-brand-text-muted">
            {t("contact")}
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
