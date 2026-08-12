import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Logo } from "@/components/Logo";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { PulseTrace } from "@/components/PulseLoader";

// Compact header for share-link landing pages: no anchor nav (there's
// nothing on this route to jump to), just a way back home and a language
// switcher — unlike the full marketing Header, which is sticky and lists
// in-page sections.
export function ProfileHeader() {
  return (
    <header className="border-b border-brand-border bg-white">
      <div className="mx-auto flex h-16 max-w-2xl items-center justify-between px-5 sm:px-6">
        <Link href="/" className="shrink-0">
          <Logo />
        </Link>
        <LanguageSwitcher />
      </div>
    </header>
  );
}

// The brand's EKG-trace mark, reused at a small scale as a section divider
// between a profile's identity block and its details — the same signature
// already used for the loading state (PulseLoader.tsx), not a new motif.
export function ProfileDivider() {
  return (
    <div className="my-8 flex justify-center text-brand-secondary/70" aria-hidden="true">
      <PulseTrace className="h-5 w-40 sm:w-48" />
    </div>
  );
}

export async function WaitlistCtaCard() {
  const t = await getTranslations("profile");
  return (
    <div className="mt-10 rounded-2xl border border-brand-border bg-brand-card p-6 text-center sm:p-8">
      <span className="text-xs font-semibold uppercase tracking-wide text-brand-primary">
        {t("comingSoonEyebrow")}
      </span>
      <div className="mt-4">
        <Link
          href="/#waitlist"
          className="brand-gradient inline-flex rounded-full px-6 py-3 text-sm font-semibold text-white shadow-sm shadow-blue-900/10 transition-all hover:scale-[1.03] hover:opacity-90 active:scale-[0.97]"
        >
          {t("ctaWaitlist")}
        </Link>
      </div>
    </div>
  );
}

export function VerifiedBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-brand-secondary/10 px-2.5 py-1 text-xs font-semibold text-brand-secondary-dark">
      <svg width="12" height="12" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        <path
          d="M11 2.5 18.5 5.5V10.5C18.5 15 15.4 18.4 11 19.5C6.6 18.4 3.5 15 3.5 10.5V5.5L11 2.5Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path d="M8 11 10.2 13.2 14.5 8.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {label}
    </span>
  );
}

export function RatingLine({
  rating,
  reviewCount,
  noRatingsLabel,
  reviewsSuffix,
}: {
  rating: number | null;
  reviewCount: number;
  noRatingsLabel: string;
  reviewsSuffix: string;
}) {
  if (rating === null) {
    return <p className="mt-1 text-sm text-brand-text-muted">{noRatingsLabel}</p>;
  }
  return (
    <p className="mt-1 flex items-center justify-center gap-1 text-sm text-brand-text-muted sm:justify-start">
      <svg width="14" height="14" viewBox="0 0 22 22" fill="currentColor" className="text-amber-400" aria-hidden="true">
        <path d="M11 2.5 13.5 8.2 19.7 8.8 15 12.9 16.4 19 11 15.8 5.6 19 7 12.9 2.3 8.8 8.5 8.2 11 2.5Z" />
      </svg>
      <span className="font-medium text-brand-text">{rating.toFixed(1)}</span>
      <span>
        · {reviewCount} {reviewsSuffix}
      </span>
    </p>
  );
}
