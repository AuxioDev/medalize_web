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
});
