import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Logo } from "@/components/Logo";

// Rendered whenever notFound() is called anywhere under [locale] — the
// doctor/hospital share-preview pages are the first callers (an unverified
// or unknown id), but this doubles as the site's only 404 page generally,
// which didn't exist before (Next's unstyled default rendered instead).
export default async function NotFound() {
  const t = await getTranslations("notFound");

  return (
    <div className="flex min-h-[70vh] flex-1 flex-col items-center justify-center gap-6 px-5 text-center">
      <Logo />
      <div>
        <h1 className="text-2xl font-semibold text-brand-text">{t("title")}</h1>
        <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-brand-text-muted">{t("body")}</p>
      </div>
      <Link
        href="/"
        className="brand-gradient rounded-full px-6 py-3 text-sm font-semibold text-white shadow-sm shadow-blue-900/10 transition-all hover:scale-[1.03] hover:opacity-90 active:scale-[0.97]"
      >
        {t("cta")}
      </Link>
    </div>
  );
}
