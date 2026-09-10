import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Problem } from "@/components/Problem";
import { HowItWorks } from "@/components/HowItWorks";
import { Specialties } from "@/components/Specialties";
import { WhyDocGet } from "@/components/WhyDocGet";
import { Providers } from "@/components/Providers";
import { WaitlistCta } from "@/components/WaitlistCta";
import { Faq } from "@/components/Faq";
import { Footer } from "@/components/Footer";

// Next 16 Turbopack's static-analysis marks this route "dynamic" (server-
// rendered per request, Cache-Control: no-store) rather than SSG even
// though every child here is pure marketing copy — bisected it down to
// Footer's next-intl getTranslations() calls reading the request-scoped
// locale context rather than the statically-enumerable route param (the
// for-doctors/for-hospitals pages don't trip this, oddly, even reusing the
// same Footer; a plain `revalidate` export doesn't override it either).
// Forcing static rendering is safe here — the locale is already fully
// determined by generateStaticParams, nothing on this page reads real
// per-request state.
export const dynamic = "force-static";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <Problem />
        <HowItWorks />
        <Specialties />
        <WhyDocGet />
        <Providers />
        <WaitlistCta />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
