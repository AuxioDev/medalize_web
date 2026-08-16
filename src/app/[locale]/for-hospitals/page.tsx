import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { CompassIcon, GridIcon, Header, InfoCircleIcon, TagIcon } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Faq } from "@/components/Faq";
import { WaitlistCta } from "@/components/WaitlistCta";
import { PhoneMockup } from "@/components/PhoneMockup";
import { HospitalAnimation } from "@/components/demo/HospitalAnimation";
import { ProviderHero } from "@/components/provider/ProviderHero";
import { ProviderSteps } from "@/components/provider/ProviderSteps";
import { ProviderFeatures } from "@/components/provider/ProviderFeatures";
import { ProviderPricing } from "@/components/provider/ProviderPricing";

type Params = Promise<{ locale: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "hospitalPage.meta" });

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `/${locale}/for-hospitals`,
      languages: Object.fromEntries(routing.locales.map((l) => [l, `/${l}/for-hospitals`])),
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: `https://docget.az/${locale}/for-hospitals`,
      siteName: "DocGet",
      locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
    },
  };
}

// Same three glyphs as the homepage's ForHospitals.tsx teaser card (invite,
// hours, privacy) — this page is the full version of that card's promise,
// so it keeps the same visual identity rather than introducing new icons.
const FEATURE_ICONS = [
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
  <svg key="hours" width="20" height="20" viewBox="0 0 20 20" fill="none">
    <circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M10 5.5V10L13 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>,
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

export default async function ForHospitalsPage({ params }: { params: Params }) {
  const { locale } = await params;
  const tp = await getTranslations({ locale, namespace: "hospitalPage" });

  const navLinks = [
    { href: "#how", label: tp("stepsEyebrow"), icon: <CompassIcon /> },
    { href: "#features", label: tp("navFeaturesLabel"), icon: <GridIcon /> },
    { href: "#pricing", label: tp("pricing.eyebrow"), icon: <TagIcon /> },
    { href: "#faq", label: tp("faq.eyebrow"), icon: <InfoCircleIcon /> },
  ];

  return (
    <>
      <Header links={navLinks} homeHref="/" />
      <main className="flex-1">
        <ProviderHero
          namespace="hospitalPage"
          mockup={
            <PhoneMockup>
              <HospitalAnimation />
            </PhoneMockup>
          }
        />
        <ProviderSteps namespace="hospitalPage" />
        <ProviderFeatures namespace="hospitalPage" icons={FEATURE_ICONS} />
        <ProviderPricing namespace="hospitalPage" />
        <Faq namespace="hospitalPage.faq" />
        <WaitlistCta />
      </main>
      <Footer />
    </>
  );
}
