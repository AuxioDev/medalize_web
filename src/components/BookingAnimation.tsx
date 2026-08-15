"use client";

import { useMemo } from "react";
import { useLocale, useTranslations } from "next-intl";
import { AnimatePresence, motion } from "motion/react";
import { specialties, type SpecialtyId } from "@/data/specialties";
import { WEEKDAY_SHORT, formatFullDate, formatMonthYear, formatShortDate } from "@/data/bookingDemoDates";
import type { Locale } from "@/i18n/routing";
import { usePhaseLoop } from "./demo/usePhaseLoop";
import {
  CalendarIcon,
  ChevronIcon,
  HeartIcon,
  PinIcon,
  SearchIcon,
  SortIcon,
  StarIcon,
} from "./demo/icons";

// Recreates the real app flow (same layout, same brand tokens as
// globals.css) as a small looping demo — a static screenshot can't show
// the actual specialty → doctor → date → slot → confirm sequence in
// motion, so this redraws it using the site's own translations, matching
// whichever language the site is set to.
const EASE = [0.22, 1, 0.36, 1] as const;

const SPECIALTY_ORDER: SpecialtyId[] = [
  "general_practice",
  "cardiology",
  "dermatology",
  "pediatrics",
  "neurology",
];
const SELECTED_SPECIALTY: SpecialtyId = "pediatrics";
const RATING_PILLS = ["2+", "3+", "4+", "5+"];

type Cell = { d: number; muted: boolean; today?: boolean; target?: boolean };

const CELLS: Cell[] = [
  ...[26, 27, 28, 29, 30, 31].map((d) => ({ d, muted: true })),
  { d: 1, muted: true },
  ...[2, 3, 4, 5, 6, 7, 8].map((d) => ({ d, muted: true })),
  { d: 9, muted: true },
  { d: 10, muted: true },
  { d: 11, muted: false, today: true },
  { d: 12, muted: false },
  { d: 13, muted: false },
  { d: 14, muted: false, target: true },
  { d: 15, muted: false },
  ...[16, 17, 18, 19, 20, 21, 22].map((d) => ({ d, muted: false })),
  ...[23, 24, 25, 26, 27, 28, 29].map((d) => ({ d, muted: false })),
  { d: 30, muted: false },
  { d: 31, muted: false },
  ...[1, 2, 3, 4, 5].map((d) => ({ d, muted: true })),
];

const SLOTS = ["09:00", "13:30", "16:00"];
const SELECTED_SLOT = 1;

// 0 specialty · 1 doctor list · 2 calendar idle · 3 date selected
// 4 slots appear · 5 slot selected · 6 confirm + press · 7 success
const DURATIONS = [2100, 1900, 1300, 1200, 1200, 1000, 1600, 2400];

export function BookingAnimation() {
  // Confirming (phase 6) is the single most informative frame — slot
  // chosen and the confirm card visible — so it's what a
  // prefers-reduced-motion visitor sees, statically, instead of the loop.
  const { phase, ref } = usePhaseLoop(DURATIONS, 6);
  const t = useTranslations("bookingDemo");
  const locale = useLocale() as Locale;

  // Aug 14, 2026 is a Friday — weekday index 5 (Sun=0..Sat=6).
  const monthYear = useMemo(() => formatMonthYear(locale), [locale]);
  const weekdayLabels = WEEKDAY_SHORT[locale];
  const fullDateLabel = useMemo(() => formatFullDate(locale, 14, 5), [locale]);
  const shortDateLabel = useMemo(() => formatShortDate(locale, 14, 5), [locale]);

  const specialtyChosen = phase >= 0;
  const showDoctorCard = phase >= 1;
  const showBooking = phase >= 2;
  const dateChosen = phase >= 3;
  const slotsVisible = phase >= 4 && phase <= 6;
  const slotChosen = phase >= 5;
  const confirming = phase === 6;
  const success = phase === 7;

  return (
    <div ref={ref} className="flex h-full w-full flex-col bg-white text-brand-text">
      <AnimatePresence mode="wait" initial={false}>
        {!showBooking ? (
          <motion.div
            key="search"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="flex flex-1 flex-col"
          >
            <div className="flex shrink-0 items-center gap-2 border-b border-brand-border px-4 py-3">
              <span className="text-brand-text-muted">
                <ChevronIcon />
              </span>
              <SearchIcon className="text-brand-text shrink-0" />
              <span className="truncate text-[13px] font-bold">{t("findDoctorTitle")}</span>
            </div>

            <div className="px-4 pt-2.5">
              <div className="flex items-center gap-2 rounded-xl border border-brand-border bg-white px-3 py-2">
                <SearchIcon className="shrink-0 text-brand-text-muted" />
                <span className="truncate text-[10px] text-brand-text-muted">{t("searchPlaceholder")}</span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 px-4 pt-1.5">
              <div className="flex flex-1 items-center gap-1.5 rounded-xl border border-brand-border bg-white px-3 py-2">
                <PinIcon className="shrink-0 text-brand-text-muted" />
                <span className="flex-1 truncate text-[10px] text-brand-text-muted">{t("cityFieldPlaceholder")}</span>
                <ChevronIcon dir="down" />
              </div>
              <span className="brand-gradient shrink-0 rounded-xl px-3 py-2 text-[10px] font-semibold text-white">
                {t("searchButtonLabel")}
              </span>
            </div>

            <div className="flex flex-wrap gap-1.5 px-4 pt-2.5">
              {SPECIALTY_ORDER.map((id) => {
                const isSelected = id === SELECTED_SPECIALTY && specialtyChosen;
                return (
                  <motion.span
                    key={id}
                    animate={{
                      backgroundColor: isSelected ? "#2563EB" : "#FFFFFF",
                      color: isSelected ? "#FFFFFF" : "#0F172A",
                      borderColor: isSelected ? "#2563EB" : "#E2E8F0",
                    }}
                    transition={{ duration: 0.4, ease: EASE }}
                    className="rounded-full border px-2.5 py-1 text-[9.5px] font-medium"
                  >
                    {specialties[id][locale]}
                  </motion.span>
                );
              })}
            </div>

            <div className="flex flex-wrap gap-1.5 px-4 pt-1.5">
              {RATING_PILLS.map((r) => (
                <span
                  key={r}
                  className="flex items-center gap-0.5 rounded-full border border-brand-border bg-white px-2 py-0.5 text-[9px] font-medium text-brand-text-muted"
                >
                  <StarIcon className="text-amber-400" />
                  {r}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between px-4 pt-2.5 text-[9.5px]">
              <span className="flex items-center gap-1 font-medium text-brand-text-muted">
                <SortIcon />
                {t("sortByLabel")}
              </span>
              <span className="flex items-center gap-0.5 font-semibold text-brand-primary">
                {t("relevanceLabel")}
                <ChevronIcon dir="down" />
              </span>
            </div>

            <div className="flex-1 px-4 pt-2.5">
              <AnimatePresence>
                {showDoctorCard && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      scale: [1, 1.02, 1],
                      backgroundColor: ["#FFFFFF", "#EFF6FF", "#FFFFFF"],
                    }}
                    transition={{ duration: 0.5, ease: EASE, delay: 0.15 }}
                    className="rounded-2xl border border-brand-border p-3 shadow-sm"
                  >
                    <div className="flex items-start gap-2.5">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-primary text-xs font-bold text-white">
                        E
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-[11px] font-bold">{t("doctorName")}</p>
                        <p className="truncate text-[10px] font-medium text-brand-primary">{t("doctorTitle")}</p>
                        <p className="mt-1 flex items-center gap-1 text-[9px] text-brand-text-muted">
                          <PinIcon />
                          {t("cityLabel")}
                        </p>
                        <p className="mt-0.5 text-[9px] text-brand-text-muted">{t("noRatingsYet")}</p>
                        <p className="mt-0.5 flex items-center gap-1 text-[9px] font-medium text-emerald-600">
                          <CalendarIcon className="h-2.5 w-2.5" />
                          {t("availableToday")}
                        </p>
                      </div>
                      <HeartIcon className="mt-0.5 shrink-0 text-brand-text-muted" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="booking"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="flex flex-1 flex-col overflow-hidden"
          >
            {!success ? (
              <>
                <div className="flex shrink-0 items-center gap-2 border-b border-brand-border px-4 py-3">
                  <span className="text-brand-text-muted">
                    <ChevronIcon />
                  </span>
                  <CalendarIcon className="text-brand-text shrink-0" />
                  <span className="truncate text-[13px] font-bold">
                    {t("bookHeaderPrefix")} — {t("doctorName")}
                  </span>
                </div>

                <div className="flex shrink-0 items-center justify-between bg-brand-muted-bg px-4 py-2.5 text-brand-primary">
                  <ChevronIcon />
                  <span className="truncate text-[12px] font-semibold text-brand-text">{monthYear}</span>
                  <ChevronIcon dir="right" />
                </div>

                <div className="grid shrink-0 grid-cols-7 px-2 pt-2 text-center text-[9px] font-medium text-brand-text-muted">
                  {weekdayLabels.map((w, i) => (
                    <span key={i} className="truncate">
                      {w}
                    </span>
                  ))}
                </div>

                <div className="grid shrink-0 grid-cols-7 gap-y-0.5 px-2 pb-2 pt-1">
                  {CELLS.map((cell, i) => {
                    const isSelected = cell.target && dateChosen;
                    return (
                      <div key={i} className="flex items-center justify-center py-1">
                        <motion.span
                          animate={{
                            backgroundColor: isSelected ? "#2563EB" : cell.today ? "#DBEAFE" : "rgba(0,0,0,0)",
                            color: isSelected ? "#FFFFFF" : cell.today ? "#1D4ED8" : cell.muted ? "#CBD5E1" : "#0F172A",
                            scale: isSelected ? [1, 1.25, 1] : 1,
                          }}
                          transition={{ duration: 0.45, ease: EASE }}
                          className="flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-medium"
                        >
                          {cell.d}
                        </motion.span>
                      </div>
                    );
                  })}
                </div>

                <div className="flex flex-1 flex-col bg-brand-muted-bg px-4 pt-4">
                  <AnimatePresence mode="wait">
                    {!slotsVisible ? (
                      <motion.div
                        key="placeholder"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-1 flex-col items-center justify-center gap-2 pb-10 text-center"
                      >
                        <CalendarIcon className="h-6 w-6 text-brand-primary" />
                        <p className="text-[11px] font-semibold">{t("pickDateTitle")}</p>
                        <p className="text-[9px] text-brand-text-muted">{t("pickDateSubtitle")}</p>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="slots"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3, ease: EASE }}
                        className="flex-1"
                      >
                        <p className="mb-2.5 flex items-center gap-1.5 text-[10px] font-semibold capitalize text-brand-primary">
                          <CalendarIcon className="h-3 w-3" />
                          {fullDateLabel}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {SLOTS.map((slot, i) => {
                            const chosen = slotChosen && i === SELECTED_SLOT;
                            return (
                              <motion.span
                                key={slot}
                                initial={{ opacity: 0, y: 6 }}
                                animate={{
                                  opacity: 1,
                                  y: 0,
                                  backgroundColor: chosen ? "#2563EB" : "#FFFFFF",
                                  color: chosen ? "#FFFFFF" : "#0F172A",
                                  borderColor: chosen ? "#2563EB" : "#E2E8F0",
                                }}
                                transition={{ duration: 0.3, delay: i * 0.08, ease: EASE }}
                                className="rounded-full border px-3 py-1.5 text-[10px] font-semibold shadow-sm"
                              >
                                {slot}
                              </motion.span>
                            );
                          })}
                        </div>

                        <AnimatePresence>
                          {confirming && (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.3, ease: EASE }}
                              className="mt-4 rounded-xl border border-brand-border bg-white p-3 shadow-sm"
                            >
                              <p className="truncate text-[10px] font-semibold">{t("doctorName")}</p>
                              <p className="truncate text-[9px] text-brand-text-muted">
                                {shortDateLabel} · {SLOTS[SELECTED_SLOT]}
                              </p>
                              <motion.div
                                animate={{ scale: [1, 0.94, 1] }}
                                transition={{ duration: 0.9, times: [0, 0.5, 1], ease: EASE }}
                                className="brand-gradient mt-2.5 rounded-full py-1.5 text-center text-[10px] font-semibold text-white"
                              >
                                {t("confirmButton")}
                              </motion.div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.35, ease: EASE }}
                className="flex flex-1 flex-col items-center justify-center gap-3 bg-brand-muted-bg px-6 text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 320, damping: 16, delay: 0.1 }}
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500 text-white"
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <motion.path
                      d="M4 10.5L8 14.5L16 6"
                      stroke="white"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.4, delay: 0.35, ease: EASE }}
                    />
                  </svg>
                </motion.div>
                <motion.p
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.3 }}
                  className="text-[13px] font-bold"
                >
                  {t("successTitle")}
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.3 }}
                  className="truncate text-[10px] text-brand-text-muted"
                >
                  {t("doctorName")} · {shortDateLabel} · {SLOTS[SELECTED_SLOT]}
                </motion.p>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
