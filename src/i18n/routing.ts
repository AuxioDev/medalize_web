import { defineRouting } from "next-intl/routing";

export const locales = ["en", "az", "ru", "tr", "zh", "fr"] as const;

export type Locale = (typeof locales)[number];

export const localeLabels: Record<Locale, string> = {
  en: "English",
  az: "Azərbaycan",
  ru: "Русский",
  tr: "Türkçe",
  zh: "中文",
  fr: "Français",
};

export const routing = defineRouting({
  locales,
  defaultLocale: "en",
  localePrefix: "always",
  // The locale is always in the URL (localePrefix: "always"), so a cookie
  // to remember it adds nothing — but writing Set-Cookie on every response
  // is what was forcing Vercel/Next to treat every page as private,
  // no-store instead of letting the otherwise-static marketing pages be
  // served from the edge cache. Accept-Language-based redirect on the
  // localeless "/" entry still works without it.
  localeCookie: false,
});
