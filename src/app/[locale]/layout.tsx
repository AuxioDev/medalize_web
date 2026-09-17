import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { hasLocale } from "next-intl";
import { NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import Script from "next/script";
import { routing, type Locale } from "@/i18n/routing";
import "../globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic", "latin-ext"],
  // Explicit even though "swap" is next/font's own default — states the
  // intent (show fallback text immediately, swap once Inter loads) instead
  // of relying on a default nobody wrote down.
  display: "swap",
});

// manifest.ts already declares theme_color: "#2563eb" for the installed
// PWA case, but that alone never reaches the browser chrome (address bar,
// task switcher) — only a real <meta name="theme-color"> does, which only
// this export generates. Two entries, not one, so the address bar matches
// whichever palette globals.css's prefers-color-scheme block just picked.
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#2563eb" },
    { media: "(prefers-color-scheme: dark)", color: "#0b1120" },
  ],
  viewportFit: "cover",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  return {
    metadataBase: new URL("https://docget.az"),
    title: {
      default: t("title"),
      template: `%s · DocGet`,
    },
    description: t("description"),
    alternates: {
      canonical: `/${locale}`,
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, `/${l}`]),
      ),
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: `https://docget.az/${locale}`,
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

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale as Locale);

  return (
    <html lang={locale} className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-brand-surface text-brand-text">
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
        {/* Plausible: privacy-friendly, cookie-free — no consent banner
            needed. The queue shim lets WaitlistForm call window.plausible(…)
            for the signup event even if it fires before the real script has
            loaded. Requires "docget.az" to be added as a site in the
            Plausible account for data to actually show up anywhere. */}
        <Script id="plausible-init" strategy="beforeInteractive">
          {`window.plausible = window.plausible || function () { (window.plausible.q = window.plausible.q || []).push(arguments) }`}
        </Script>
        <Script
          defer
          data-domain="docget.az"
          src="https://plausible.io/js/script.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
