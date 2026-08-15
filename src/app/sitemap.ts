import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return routing.locales.flatMap((locale) => [
    { url: `https://medoroapp.com/${locale}`, lastModified },
    { url: `https://medoroapp.com/${locale}/for-doctors`, lastModified },
    { url: `https://medoroapp.com/${locale}/for-hospitals`, lastModified },
  ]);
}
