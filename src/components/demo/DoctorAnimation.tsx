"use client";

import { useMemo } from "react";
import { useLocale, useTranslations } from "next-intl";
import { AnimatePresence, motion } from "motion/react";
import { formatShortDate, weekdaysMondayFirst } from "@/data/bookingDemoDates";
import type { Locale } from "@/i18n/routing";
import { usePhaseLoop } from "./usePhaseLoop";
import { ChevronIcon, CheckIcon, ClockIcon, MapPinDropIcon, PeopleIcon, PinIcon } from "./icons";
import { DemoAppBar, DemoAvatar, DemoScreenFade, DEMO_EASE, PressPulse, StatusPill } from "./chrome";

// Recreates the doctor-side app for the /for-doctors marketing page, the
// same way BookingAnimation recreates the patient flow for the homepage
// hero — two real screens from medalize_mb's doctor feature
// (doctor_home_screen.dart and add_edit_workplace_screen.dart +
// working_hours_fields.dart), redrawn with the site's own tokens so a
// visiting doctor sees their own workflow, not the patient's.
//
// 0-3: home — a pending booking request arrives and gets confirmed.
// 4-7: workplace — adding a location, days, hours, and publishing it.
const DURATIONS = [1800, 1900, 1000, 1800, 1900, 1500, 1400, 2200];

const WEEKDAY_ACTIVE = [true, true, true, true, true, false, false]; // Mon–Fri

export function DoctorAnimation() {
  // Phase 3 — the request just confirmed, stats already ticked — is the
  // single frame that reads best without motion.
  const { phase, ref } = usePhaseLoop(DURATIONS, 3);
  const t = useTranslations("doctorDemo");
  const locale = useLocale() as Locale;
  const weekdays = weekdaysMondayFirst(locale);
  // Same demo date as BookingAnimation (Aug 14, 2026 — a Friday, weekday
  // index 5), so both mockups agree if a visitor compares them.
  const shortDateLabel = useMemo(() => formatShortDate(locale, 14, 5), [locale]);

  const showHome = phase <= 3;
  const requestVisible = phase >= 1;
  const pressing = phase === 2;
  const confirmed = phase >= 3;

  const showCity = phase >= 4;
  const daysCount = phase >= 5 ? WEEKDAY_ACTIVE.filter(Boolean).length : 0;
  const hoursVisible = phase >= 6;
  const saving = phase === 7;

  const monthCount = confirmed ? 13 : 12;
  const pendingCount = confirmed ? 2 : 3;

  return (
    <div ref={ref} className="flex h-full w-full flex-col bg-white text-brand-text">
      <AnimatePresence mode="wait" initial={false}>
        {showHome ? (
          <DemoScreenFade screenKey="home">
            <DemoAppBar icon={<PeopleIcon className="h-4 w-4" />} title="DocGet" />

            <div className="px-4 pt-3">
              <p className="text-[12px] font-bold">{t("greeting")}</p>
              <p className="text-[9.5px] text-brand-text-muted">{t("subtitle")}</p>
            </div>

            <div className="grid grid-cols-3 gap-1.5 px-4 pt-3">
              <StatCard value={monthCount} label={t("statMonth")} />
              <StatCard value={48} label={t("statPatients")} />
              <StatCard value={pendingCount} label={t("statPending")} />
            </div>

            <p className="px-4 pt-4 text-[10.5px] font-bold">{t("pendingHeading")}</p>

            <div className="flex-1 px-4 pt-2">
              <AnimatePresence>
                {requestVisible && !confirmed && (
                  <motion.div
                    key="request"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: 40 }}
                    transition={{ duration: 0.4, ease: DEMO_EASE }}
                    className="rounded-2xl border border-brand-border p-3 shadow-sm"
                  >
                    <div className="flex items-center gap-2.5">
                      <DemoAvatar initial={t("patientName").charAt(0)} />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-[10.5px] font-bold">{t("patientName")}</p>
                        <p className="mt-0.5 flex items-center gap-1 text-[9px] text-brand-text-muted">
                          <ClockIcon className="h-2.5 w-2.5" />
                          {shortDateLabel} · 13:30
                        </p>
                      </div>
                      <StatusPill tone="amber" label={t("statusPending")} />
                    </div>
                    <div className="mt-3 flex gap-2">
                      <span className="flex-1 rounded-full border border-brand-border py-1.5 text-center text-[9.5px] font-semibold text-brand-text-muted">
                        {t("declineButton")}
                      </span>
                      <div className="flex-1">
                        <PressPulse active={pressing}>
                          <span className="brand-gradient block rounded-full py-1.5 text-center text-[9.5px] font-semibold text-white">
                            {t("confirmButton")}
                          </span>
                        </PressPulse>
                      </div>
                    </div>
                  </motion.div>
                )}
                {confirmed && (
                  <motion.div
                    key="confirmed"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: "spring", stiffness: 320, damping: 18 }}
                    className="flex flex-col items-center gap-2 pt-6 text-center"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500 text-white">
                      <CheckIcon className="h-4 w-4" />
                    </div>
                    <StatusPill tone="emerald" label={t("statusConfirmed")} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </DemoScreenFade>
        ) : (
          <DemoScreenFade screenKey="workplace">
            <DemoAppBar icon={<ChevronIcon />} title={t("workplaceHeading")} />

            <div className="px-4 pt-3">
              <label className="text-[9px] font-semibold uppercase tracking-wide text-brand-text-muted">
                {t("workplaceName")}
              </label>
              <div className="mt-1 flex items-center gap-2 rounded-xl border border-brand-border bg-white px-3 py-2">
                <span className="truncate text-[11px] font-semibold">{t("workplaceName")}</span>
              </div>
              <AnimatePresence>
                {showCity && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, ease: DEMO_EASE }}
                    className="mt-2 flex items-center gap-1.5 text-[10px] text-brand-text-muted"
                  >
                    <PinIcon className="shrink-0" />
                    {t("cityLabel")}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <AnimatePresence>
              {showCity && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, ease: DEMO_EASE }}
                  className="relative mx-4 mt-3 h-16 shrink-0 overflow-hidden rounded-xl bg-brand-muted-bg"
                >
                  <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(90deg,transparent_31%,rgba(37,99,235,0.15)_31%,rgba(37,99,235,0.15)_33%,transparent_33%),linear-gradient(0deg,transparent_46%,rgba(37,99,235,0.15)_46%,rgba(37,99,235,0.15)_48%,transparent_48%)] [background-size:20px_20px]" />
                  <motion.div
                    initial={{ y: -14, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.15, duration: 0.4, ease: DEMO_EASE }}
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full text-brand-primary"
                  >
                    <MapPinDropIcon />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            <p className="px-4 pt-4 text-[9px] font-semibold uppercase tracking-wide text-brand-text-muted">
              {t("workingDaysLabel")}
            </p>
            <div className="flex gap-1.5 px-4 pt-1.5">
              {weekdays.map((label, i) => {
                const active = i < daysCount && WEEKDAY_ACTIVE[i];
                return (
                  <motion.span
                    key={label}
                    animate={{
                      backgroundColor: active ? "#2563EB" : "#FFFFFF",
                      color: active ? "#FFFFFF" : "#0F172A",
                      borderColor: active ? "#2563EB" : "#E2E8F0",
                    }}
                    transition={{ duration: 0.3, delay: i * 0.08, ease: DEMO_EASE }}
                    className="flex h-7 w-7 items-center justify-center rounded-full border text-[9px] font-semibold"
                  >
                    {label}
                  </motion.span>
                );
              })}
            </div>

            <AnimatePresence>
              {hoursVisible && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, ease: DEMO_EASE }}
                  className="mt-3 flex items-center gap-2 px-4"
                >
                  <span className="flex items-center gap-1.5 rounded-full bg-brand-muted-bg px-2.5 py-1 text-[9.5px] font-semibold">
                    <ClockIcon className="h-3 w-3 text-brand-primary" />
                    09:00 – 17:00
                  </span>
                  <span className="rounded-full bg-brand-muted-bg px-2.5 py-1 text-[9.5px] font-semibold text-brand-text-muted">
                    {t("visitLengthValue")}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex-1 px-4 pt-5">
              <AnimatePresence mode="wait">
                {!saving ? (
                  <motion.div key="save" exit={{ opacity: 0 }}>
                    <PressPulse active={hoursVisible}>
                      <span className="brand-gradient block rounded-full py-2 text-center text-[10.5px] font-semibold text-white">
                        {t("saveButton")}
                      </span>
                    </PressPulse>
                  </motion.div>
                ) : (
                  <motion.div
                    key="published"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, ease: DEMO_EASE }}
                    className="flex flex-col items-center gap-2 pt-2 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 320, damping: 16, delay: 0.1 }}
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500 text-white"
                    >
                      <CheckIcon className="h-4 w-4" />
                    </motion.div>
                    <p className="text-[11.5px] font-bold">{t("publishedTitle")}</p>
                    <p className="max-w-[180px] text-[9.5px] text-brand-text-muted">{t("publishedSubtitle")}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </DemoScreenFade>
        )}
      </AnimatePresence>
    </div>
  );
}

// A stat that "ticks" — crossfades to its new value with a small upward
// slide, the same beat as the pending-request card confirming below it.
function StatCard({ value, label }: { value: number; label: string }) {
  return (
    <div className="overflow-hidden rounded-xl border border-brand-border bg-white px-2 py-2.5">
      <div className="relative h-4 text-[13px] font-bold">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.p
            key={value}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.3, ease: DEMO_EASE }}
            className="absolute inset-0"
          >
            {value}
          </motion.p>
        </AnimatePresence>
      </div>
      <p className="mt-0.5 truncate text-[8px] text-brand-text-muted">{label}</p>
    </div>
  );
}
