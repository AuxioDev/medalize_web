import { getTranslations } from "next-intl/server";
import { LogoMark } from "./Logo";

export async function PhoneMockup() {
  const t = await getTranslations("hero.mock");

  return (
    <div className="relative mx-auto w-full max-w-[300px]">
      <div className="absolute -inset-8 -z-10 rounded-[3rem] bg-gradient-to-br from-blue-200/50 via-teal-100/40 to-transparent blur-2xl" />

      <div className="rounded-[2.5rem] border-[6px] border-brand-ink bg-brand-ink p-2 shadow-2xl shadow-blue-900/20">
        <div className="overflow-hidden rounded-[1.8rem] bg-brand-muted-bg">
          <div className="brand-gradient flex items-center gap-2 px-5 pb-6 pt-8 text-white">
            <LogoMark className="h-6 w-6" />
            <span className="text-sm font-semibold">Medoro</span>
          </div>

          <div className="-mt-4 space-y-3 px-4 pb-6">
            <div className="rounded-2xl bg-white p-3 shadow-sm">
              <p className="mb-1.5 text-[11px] font-medium text-brand-text-muted">
                {t("searchLabel")}
              </p>
              <div className="flex items-center gap-2 rounded-xl bg-brand-muted-bg px-3 py-2">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0 text-brand-text-muted">
                  <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.4" />
                  <path d="M13 13L9.5 9.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                </svg>
                <span className="truncate text-xs text-brand-text-muted">
                  {t("searchPlaceholder")}
                </span>
              </div>
            </div>

            <div className="rounded-2xl bg-white p-3 shadow-sm">
              <div className="flex items-start gap-2.5">
                <div className="brand-gradient flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-semibold text-white">
                  AM
                </div>
                <div className="min-w-0">
                  <p className="truncate text-xs font-semibold text-brand-text">
                    {t("resultTitle")}
                  </p>
                  <p className="truncate text-[11px] text-brand-text-muted">
                    {t("resultSubtitle")}
                  </p>
                  <p className="mt-0.5 truncate text-[11px] text-brand-secondary-dark">
                    {t("resultMeta")}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-white p-3 shadow-sm">
              <div className="flex items-center justify-between gap-2">
                <div className="min-w-0">
                  <p className="truncate text-[11px] text-brand-text-muted">
                    {t("bookLabel")}
                  </p>
                  <p className="truncate text-xs font-semibold text-brand-text">
                    {t("bookValue")}
                  </p>
                </div>
                <span className="brand-gradient shrink-0 rounded-full px-3 py-1.5 text-[11px] font-semibold text-white">
                  {t("bookCta")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
