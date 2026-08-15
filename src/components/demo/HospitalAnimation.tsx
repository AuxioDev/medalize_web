"use client";

import { useLocale, useTranslations } from "next-intl";
import { AnimatePresence, motion } from "motion/react";
import { weekdaysMondayFirst } from "@/data/bookingDemoDates";
import type { Locale } from "@/i18n/routing";
import { usePhaseLoop } from "./usePhaseLoop";
import {
  BuildingIcon,
  CalendarIcon,
  ClockIcon,
  EyeOffIcon,
  PeopleIcon,
  SearchIcon,
  UserPlusIcon,
} from "./icons";
import { ActionTile, DemoAppBar, DemoAvatar, DemoScreenFade, DEMO_EASE, StatusPill } from "./chrome";

// Recreates the clinic-side app for the /for-hospitals marketing page —
// three real screens from medalize_mb's hospital feature
// (hospital_home_screen.dart, hospital_invite_doctor_screen.dart,
// hospital_doctors_screen.dart + link_request_card.dart, and
// hospital_appointments_screen.dart), redrawn with the site's own tokens.
//
// 0: home — the clinic's action grid.
// 1-2: invite a doctor from the directory.
// 3-4: approve a doctor's join request.
// 5: centralized working hours.
// 6-7: today's schedule, with the privacy note that sells the whole model —
//      patient identity never reaches the clinic's dashboard.
const DURATIONS = [1700, 1800, 1400, 1800, 1600, 1800, 2000, 2200];

const WEEKDAY_ACTIVE = [true, true, true, true, true, false, false]; // Mon–Fri

type Screen = "home" | "invite" | "doctors" | "hours" | "appointments";

function screenFor(phase: number): Screen {
  if (phase === 0) return "home";
  if (phase <= 2) return "invite";
  if (phase <= 4) return "doctors";
  if (phase === 5) return "hours";
  return "appointments";
}

export function HospitalAnimation() {
  // Phase 6 — today's schedule with the privacy note already visible — is
  // the single frame that best sells "we manage the roster, not the chart."
  const { phase, ref } = usePhaseLoop(DURATIONS, 7);
  const t = useTranslations("hospitalDemo");
  const locale = useLocale() as Locale;
  const weekdays = weekdaysMondayFirst(locale);
  const screen = screenFor(phase);

  const requestVisible = phase === 3;
  const approved = phase === 4;
  const privacyNoteVisible = phase >= 7;

  return (
    <div ref={ref} className="flex h-full w-full flex-col bg-white text-brand-text">
      <AnimatePresence mode="wait" initial={false}>
        {screen === "home" && (
          <DemoScreenFade screenKey="home">
            <DemoAppBar icon={<BuildingIcon className="h-4 w-4" />} title="DocGet" />
            <div className="px-4 pt-3">
              <p className="text-[12px] font-bold">{t("clinicName")}</p>
              <p className="text-[9.5px] text-brand-text-muted">{t("subtitle")}</p>
            </div>
            <div className="grid grid-cols-2 gap-2 px-4 pt-4">
              <ActionTile icon={<PeopleIcon className="h-4 w-4" />} label={t("doctorsTile")} />
              <ActionTile icon={<UserPlusIcon className="h-4 w-4" />} label={t("inviteTile")} />
              <ActionTile icon={<CalendarIcon className="h-4 w-4" />} label={t("appointmentsTile")} />
              <ActionTile icon={<BuildingIcon className="h-4 w-4" />} label={t("profileTile")} />
            </div>
          </DemoScreenFade>
        )}

        {screen === "invite" && (
          <DemoScreenFade screenKey="invite">
            <DemoAppBar icon={<UserPlusIcon className="h-4 w-4" />} title={t("inviteTile")} />
            <div className="px-4 pt-3">
              <div className="flex items-center gap-2 rounded-xl border border-brand-border bg-white px-3 py-2">
                <SearchIcon className="shrink-0 text-brand-text-muted" />
                <span className="truncate text-[10px] text-brand-text-muted">{t("searchPlaceholder")}</span>
              </div>
            </div>
            <div className="flex-1 px-4 pt-3">
              <CandidateRow
                name={t("candidateName1")}
                specialty={t("candidateSpecialty1")}
                invited={phase >= 2}
                inviteLabel={t("inviteButton")}
                invitedLabel={t("invitedLabel")}
              />
            </div>
          </DemoScreenFade>
        )}

        {screen === "doctors" && (
          <DemoScreenFade screenKey="doctors">
            <DemoAppBar icon={<PeopleIcon className="h-4 w-4" />} title={t("doctorsTile")} />
            <div className="flex shrink-0 gap-4 border-b border-brand-border px-4 pt-1">
              {[
                { label: t("tabConfirmed"), active: approved },
                { label: t("tabRequests"), active: !approved },
                { label: t("tabInvited"), active: false },
              ].map((tab) => (
                <span
                  key={tab.label}
                  className={`relative pb-2.5 text-[10px] font-semibold ${
                    tab.active ? "text-brand-primary" : "text-brand-text-muted"
                  }`}
                >
                  {tab.label}
                  {tab.active && <span className="absolute inset-x-0 -bottom-px h-[2px] rounded-full bg-brand-primary" />}
                </span>
              ))}
            </div>
            <div className="flex-1 px-4 pt-3">
              <AnimatePresence mode="wait">
                {!approved ? (
                  <motion.div
                    key="request"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: 40 }}
                    transition={{ duration: 0.35, ease: DEMO_EASE }}
                    className="rounded-2xl border border-brand-border p-3 shadow-sm"
                  >
                    <div className="flex items-center gap-2.5">
                      <DemoAvatar initial={t("candidateName1").replace("Dr. ", "").charAt(0)} />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-[10.5px] font-bold">{t("candidateName1")}</p>
                        <p className="truncate text-[9px] text-brand-text-muted">{t("requestedToJoin")}</p>
                      </div>
                    </div>
                    {requestVisible && (
                      <div className="mt-3 flex gap-2">
                        <span className="flex-1 rounded-full border border-brand-border py-1.5 text-center text-[9.5px] font-semibold text-brand-text-muted">
                          {t("rejectAction")}
                        </span>
                        <span className="brand-gradient flex-1 rounded-full py-1.5 text-center text-[9.5px] font-semibold text-white">
                          {t("approveAction")}
                        </span>
                      </div>
                    )}
                  </motion.div>
                ) : (
                  <motion.div
                    key="approved"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: "spring", stiffness: 320, damping: 18 }}
                    className="flex items-center gap-2.5 rounded-2xl border border-brand-border p-3 shadow-sm"
                  >
                    <DemoAvatar initial={t("candidateName1").replace("Dr. ", "").charAt(0)} />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[10.5px] font-bold">{t("candidateName1")}</p>
                      <p className="truncate text-[9px] text-brand-text-muted">{t("candidateSpecialty1")}</p>
                    </div>
                    <StatusPill tone="emerald" label={t("tabConfirmed")} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </DemoScreenFade>
        )}

        {screen === "hours" && (
          <DemoScreenFade screenKey="hours">
            <DemoAppBar icon={<ClockIcon className="h-4 w-4" />} title={t("hoursHeading")} />
            <div className="px-4 pt-3">
              <div className="flex items-center gap-2.5 rounded-xl border border-brand-border bg-white p-3 shadow-sm">
                <DemoAvatar initial={t("candidateName1").replace("Dr. ", "").charAt(0)} size={32} />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[10px] font-bold">{t("candidateName1")}</p>
                  <p className="truncate text-[8.5px] text-brand-text-muted">{t("hoursLocation")}</p>
                </div>
              </div>
            </div>
            <div className="flex gap-1.5 px-4 pt-3">
              {weekdays.map((label, i) => {
                const active = WEEKDAY_ACTIVE[i];
                return (
                  <motion.span
                    key={label}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      backgroundColor: active ? "#2563EB" : "#FFFFFF",
                      color: active ? "#FFFFFF" : "#0F172A",
                      borderColor: active ? "#2563EB" : "#E2E8F0",
                    }}
                    transition={{ duration: 0.3, delay: i * 0.06, ease: DEMO_EASE }}
                    className="flex h-7 w-7 items-center justify-center rounded-full border text-[9px] font-semibold"
                  >
                    {label}
                  </motion.span>
                );
              })}
            </div>
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.3, ease: DEMO_EASE }}
              className="mt-3 flex items-center gap-2 px-4"
            >
              <span className="flex items-center gap-1.5 rounded-full bg-brand-muted-bg px-2.5 py-1 text-[9.5px] font-semibold">
                <ClockIcon className="h-3 w-3 text-brand-primary" />
                09:00 – 17:00
              </span>
            </motion.div>
          </DemoScreenFade>
        )}

        {screen === "appointments" && (
          <DemoScreenFade screenKey="appointments">
            <DemoAppBar icon={<CalendarIcon className="h-4 w-4" />} title={t("appointmentsHeading")} />
            <div className="flex-1 space-y-2 px-4 pt-3">
              {["09:30", "11:00", "14:15"].map((time, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.08, ease: DEMO_EASE }}
                  className="flex items-center justify-between rounded-xl border border-brand-border bg-white p-2.5"
                >
                  <div className="min-w-0">
                    <p className="truncate text-[10px] font-semibold">{t("candidateName1")}</p>
                    <p className="truncate text-[8.5px] text-brand-text-muted">
                      {t("candidateSpecialty1")} · {time}
                    </p>
                  </div>
                  <span className="shrink-0 text-[9px] font-semibold text-brand-text-muted">{t("patientMasked")}</span>
                </motion.div>
              ))}
            </div>
            <AnimatePresence>
              {privacyNoteVisible && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, ease: DEMO_EASE }}
                  className="mx-4 mb-4 flex items-center gap-2 rounded-xl bg-brand-secondary/10 px-3 py-2.5 text-brand-secondary-dark"
                >
                  <EyeOffIcon className="h-4 w-4 shrink-0" />
                  <span className="text-[9px] font-medium leading-snug">{t("privacyNote")}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </DemoScreenFade>
        )}
      </AnimatePresence>
    </div>
  );
}

function CandidateRow({
  name,
  specialty,
  invited,
  inviteLabel,
  invitedLabel,
}: {
  name: string;
  specialty: string;
  invited: boolean;
  inviteLabel: string;
  invitedLabel: string;
}) {
  return (
    <div className="flex items-center gap-2.5 rounded-xl border border-brand-border bg-white p-2.5 shadow-sm">
      <DemoAvatar initial={name.replace("Dr. ", "").charAt(0)} size={32} />
      <div className="min-w-0 flex-1">
        <p className="truncate text-[10px] font-bold">{name}</p>
        <p className="truncate text-[8.5px] text-brand-text-muted">{specialty}</p>
      </div>
      {invited ? (
        <StatusPill tone="emerald" label={invitedLabel} />
      ) : (
        <span className="shrink-0 text-[9.5px] font-semibold text-brand-primary">{inviteLabel}</span>
      )}
    </div>
  );
}
