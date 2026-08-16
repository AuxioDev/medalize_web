import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return routing.locales.flatMap((locale) => [
    { url: `https://docget.az/${locale}`, lastModified },
    { url: `https://docget.az/${locale}/for-doctors`, lastModified },
    { url: `https://docget.az/${locale}/for-hospitals`, lastModified },
  ]);
}
