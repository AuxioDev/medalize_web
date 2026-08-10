import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Problem } from "@/components/Problem";
import { HowItWorks } from "@/components/HowItWorks";
import { Specialties } from "@/components/Specialties";
import { WhyMedoro } from "@/components/WhyMedoro";
import { Providers } from "@/components/Providers";
import { WaitlistCta } from "@/components/WaitlistCta";
import { Faq } from "@/components/Faq";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <Problem />
        <HowItWorks />
        <Specialties />
        <WhyMedoro />
        <Providers />
        <WaitlistCta />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
