import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getPublicHospital, getPublicHospitalDoctors } from "@/lib/publicProfiles";
import { Footer } from "@/components/Footer";
import {
  ProfileHeader,
  ProfileDivider,
  WaitlistCtaCard,
  RatingLine,
} from "@/components/profile/ProfileChrome";

type Params = Promise<{ locale: string; id: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale, id } = await params;
  const hospital = await getPublicHospital(id, locale);
  if (!hospital) return {};

  const t = await getTranslations({ locale, namespace: "profile" });
  const title = t("hospitalPageTitle", { name: hospital.name, city: hospital.city_display });
  const description = t("hospitalMetaDescription", { name: hospital.name, city: hospital.city_display });

  return {
    title,
    description,
    alternates: { canonical: `/${locale}/hospital/${id}` },
    openGraph: {
      title,
      description,
      url: `https://medoroapp.com/${locale}/hospital/${id}`,
      type: "website",
      images: hospital.logo ? [hospital.logo] : undefined,
    },
    twitter: {
      card: hospital.logo ? "summary" : "summary_large_image",
      title,
      description,
      images: hospital.logo ? [hospital.logo] : undefined,
    },
  };
}

export default async function HospitalProfilePage({ params }: { params: Params }) {
  const { locale, id } = await params;
  const [hospital, doctors] = await Promise.all([
    getPublicHospital(id, locale),
    getPublicHospitalDoctors(id, locale),
  ]);
  if (!hospital) notFound();

  const t = await getTranslations("profile");

  return (
    <>
      <ProfileHeader />
      <main className="flex-1 bg-white">
        <div className="mx-auto max-w-2xl px-5 py-12 sm:px-6 sm:py-16">
          <div className="flex flex-col items-center text-center sm:flex-row sm:items-start sm:text-left sm:gap-6">
            {hospital.logo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={hospital.logo}
                alt={hospital.name}
                width={96}
                height={96}
                className="h-24 w-24 shrink-0 rounded-2xl object-cover ring-4 ring-brand-card"
              />
            ) : (
              <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl bg-brand-muted-bg text-2xl font-semibold text-brand-text-muted ring-4 ring-brand-card">
                {hospital.name.charAt(0)}
              </div>
            )}

            <div className="mt-4 sm:mt-1">
              <h1 className="text-2xl font-semibold tracking-tight text-brand-text sm:text-3xl">
                {hospital.name}
              </h1>
              {hospital.city_display && (
                <p className="mt-1 text-base text-brand-text-muted">{hospital.city_display}</p>
              )}
            </div>
          </div>

          <ProfileDivider />

          {(hospital.address || hospital.city_display) && (
            <section>
              <h2 className="text-sm font-semibold uppercase tracking-wide text-brand-text-muted">
                {t("hospitalLocationHeading")}
              </h2>
              <p className="mt-2 text-base leading-relaxed text-brand-text">
                {[hospital.address, hospital.city_display, hospital.region_display]
                  .filter(Boolean)
                  .join(", ")}
              </p>
            </section>
          )}

          {doctors && doctors.length > 0 && (
            <section className="mt-8">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-brand-text-muted">
                {t("hospitalDoctorsHeading")}
              </h2>
              <ul className="mt-3 space-y-3">
                {doctors.map((doctor) => {
                  const name = `${doctor.first_name} ${doctor.last_name}`.trim();
                  return (
                    <li key={doctor.id}>
                      <Link
                        href={`/doctor/${doctor.id}`}
                        className="flex items-center gap-3 rounded-xl border border-brand-border bg-brand-card p-3 transition-colors hover:border-brand-primary/30"
                      >
                        {doctor.avatar_url ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={doctor.avatar_url}
                            alt={name}
                            width={44}
                            height={44}
                            className="h-11 w-11 shrink-0 rounded-full object-cover"
                          />
                        ) : (
                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-muted-bg text-sm font-semibold text-brand-text-muted">
                            {doctor.first_name.charAt(0)}
                            {doctor.last_name.charAt(0)}
                          </div>
                        )}
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium text-brand-text">
                            {t("doctorDisplayName", { name })}
                          </p>
                          <p className="truncate text-xs text-brand-text-muted">
                            {doctor.specialization_display}
                          </p>
                        </div>
                        <div className="ml-auto shrink-0 text-right">
                          <RatingLine
                            rating={doctor.average_rating}
                            reviewCount={doctor.review_count}
                            noRatingsLabel={t("noRatingsYet")}
                            reviewsSuffix={t("reviewsSuffix")}
                          />
                        </div>
                      </Link>
                    </li>
                  );
                })}
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
