import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { getPublicDoctor } from "@/lib/publicProfiles";
import { Footer } from "@/components/Footer";
import {
  ProfileHeader,
  ProfileDivider,
  WaitlistCtaCard,
  VerifiedBadge,
  RatingLine,
} from "@/components/profile/ProfileChrome";

type Params = Promise<{ locale: string; id: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale, id } = await params;
  const doctor = await getPublicDoctor(id, locale);
  if (!doctor) return {};

  const t = await getTranslations({ locale, namespace: "profile" });
  const name = `${doctor.first_name} ${doctor.last_name}`.trim();
  const title = t("doctorPageTitle", { name, specialty: doctor.specialization_display });
  const description = t("doctorMetaDescription", { name, specialty: doctor.specialization_display });

  return {
    title,
    description,
    alternates: { canonical: `/${locale}/doctor/${id}` },
    openGraph: {
      title,
      description,
      url: `https://docget.az/${locale}/doctor/${id}`,
      type: "profile",
      images: doctor.avatar_url ? [doctor.avatar_url] : undefined,
    },
    twitter: {
      card: doctor.avatar_url ? "summary" : "summary_large_image",
      title,
      description,
      images: doctor.avatar_url ? [doctor.avatar_url] : undefined,
    },
  };
}

export default async function DoctorProfilePage({ params }: { params: Params }) {
  const { locale, id } = await params;
  const doctor = await getPublicDoctor(id, locale);
  if (!doctor) notFound();

  const t = await getTranslations("profile");
  const rawName = `${doctor.first_name} ${doctor.last_name}`.trim();
  const name = t("doctorDisplayName", { name: rawName });
  const subtitle = [doctor.specialization_display, doctor.primary_workplace?.city_display]
    .filter(Boolean)
    .join(" · ");

  return (
    <>
      <ProfileHeader />
      <main className="flex-1 bg-white">
        <div className="mx-auto max-w-2xl px-5 py-12 sm:px-6 sm:py-16">
          <div className="flex flex-col items-center text-center sm:flex-row sm:items-start sm:text-left sm:gap-6">
            {doctor.avatar_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={doctor.avatar_url}
                alt={name}
                width={96}
                height={96}
                className="h-24 w-24 shrink-0 rounded-full object-cover ring-4 ring-brand-card"
              />
            ) : (
              <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-brand-muted-bg text-2xl font-semibold text-brand-text-muted ring-4 ring-brand-card">
                {doctor.first_name.charAt(0)}
                {doctor.last_name.charAt(0)}
              </div>
            )}

            <div className="mt-4 sm:mt-1">
              <h1 className="text-2xl font-semibold tracking-tight text-brand-text sm:text-3xl">{name}</h1>
              {subtitle && <p className="mt-1 text-base text-brand-text-muted">{subtitle}</p>}
              <div className="mt-2 flex flex-wrap items-center justify-center gap-2 sm:justify-start">
                <VerifiedBadge label={t("verifiedBadge")} />
              </div>
              <RatingLine
                rating={doctor.average_rating}
                reviewCount={doctor.review_count}
                noRatingsLabel={t("noRatingsYet")}
                reviewsSuffix={t("reviewsSuffix")}
              />
            </div>
          </div>

          <ProfileDivider />

          {doctor.bio && (
            <section>
              <h2 className="text-sm font-semibold uppercase tracking-wide text-brand-text-muted">
                {t("bioHeading")}
              </h2>
              <p className="mt-2 text-base leading-relaxed text-brand-text">{doctor.bio}</p>
            </section>
          )}

          {doctor.workplaces.length > 0 && (
            <section className={doctor.bio ? "mt-8" : undefined}>
              <h2 className="text-sm font-semibold uppercase tracking-wide text-brand-text-muted">
                {t("workplacesHeading")}
              </h2>
              <ul className="mt-3 space-y-3">
                {doctor.workplaces.map((wp) => (
                  <li
                    key={wp.id}
                    className="rounded-xl border border-brand-border bg-brand-card p-4 text-sm"
                  >
                    <p className="font-medium text-brand-text">{wp.hospital_name || wp.name}</p>
                    <p className="mt-0.5 text-brand-text-muted">
                      {[wp.address, wp.city_display].filter(Boolean).join(", ")}
                    </p>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <WaitlistCtaCard />
        </div>
      </main>
      <Footer />
    </>
  );
}
