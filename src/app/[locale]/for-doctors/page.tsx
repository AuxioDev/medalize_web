import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { CompassIcon, GridIcon, Header, InfoCircleIcon, TagIcon } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Faq } from "@/components/Faq";
import { WaitlistCta } from "@/components/WaitlistCta";
import { PhoneMockup } from "@/components/PhoneMockup";
import { DoctorAnimation } from "@/components/demo/DoctorAnimation";
import { ProviderHero } from "@/components/provider/ProviderHero";
import { ProviderSteps } from "@/components/provider/ProviderSteps";
import { ProviderFeatures } from "@/components/provider/ProviderFeatures";
import { ProviderPricing } from "@/components/provider/ProviderPricing";

type Params = Promise<{ locale: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "doctorPage.meta" });

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `/${locale}/for-doctors`,
      languages: Object.fromEntries(routing.locales.map((l) => [l, `/${l}/for-doctors`])),
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: `https://medoroapp.com/${locale}/for-doctors`,
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

// Percent-tag ("flat subscription, no commission"), schedule, and chat —
// matching ForHospitals.tsx's pattern of small inline SVGs sized for a
// feature card rather than pulling in an icon library for three glyphs.
const FEATURE_ICONS = [
  <svg key="commission" width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path
      d="M3 10L10 3H16C16.55 3 17 3.45 17 4V10L10 17L3 10Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <circle cx="13" cy="7" r="1.3" fill="currentColor" />
  </svg>,
  <svg key="schedule" width="20" height="20" viewBox="0 0 20 20" fill="none">
    <rect x="2.5" y="4" width="15" height="13.5" rx="2" stroke="currentColor" strokeWidth="1.5" />
    <path d="M2.5 8H17.5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M6.5 2V5M13.5 2V5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>,
  <svg key="chat" width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path
      d="M2.5 5.5C2.5 4.4 3.4 3.5 4.5 3.5H15.5C16.6 3.5 17.5 4.4 17.5 5.5V12C17.5 13.1 16.6 14 15.5 14H8L4 17V14H4.5C3.4 14 2.5 13.1 2.5 12V5.5Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
  </svg>,
];

export default async function ForDoctorsPage({ params }: { params: Params }) {
  const { locale } = await params;
  const tp = await getTranslations({ locale, namespace: "doctorPage" });

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
          namespace="doctorPage"
          mockup={
            <PhoneMockup>
              <DoctorAnimation />
            </PhoneMockup>
          }
        />
        <ProviderSteps namespace="doctorPage" />
        <ProviderFeatures namespace="doctorPage" icons={FEATURE_ICONS} />
        <ProviderPricing namespace="doctorPage" />
        <Faq namespace="doctorPage.faq" />
        <WaitlistCta />
      </main>
      <Footer />
    </>
  );
}
