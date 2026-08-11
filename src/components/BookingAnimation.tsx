"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

// Recreates the real booking screen captured from the app (same layout,
// same brand tokens as globals.css) as a small looping demo — a real
// screenshot is static, this is the only way to show the actual
// select-a-date → pick-a-slot → confirm flow in motion.
const EASE = [0.22, 1, 0.36, 1] as const;

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

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const SLOTS = ["09:00", "13:30", "16:00"];
const SELECTED_SLOT = 1;

// phase: 0 calendar idle · 1 date selected · 2 slots appear · 3 slot selected
// 4 confirm + press · 5 success
const DURATIONS = [1500, 1300, 1300, 1100, 1700, 2600];

function ChevronIcon({ dir = "left" }: { dir?: "left" | "right" }) {
  return (
    <svg width="7" height="12" viewBox="0 0 7 12" fill="none" className={dir === "right" ? "rotate-180" : ""}>
      <path d="M6 1L1 6L6 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CalendarIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={className}>
      <rect x="1.5" y="2.8" width="13" height="11.7" rx="1.8" stroke="currentColor" strokeWidth="1.4" />
      <path d="M1.5 6.2H14.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M4.5 1V3.6M11.5 1V3.6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

export function BookingAnimation() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setPhase((p) => (p + 1) % DURATIONS.length), DURATIONS[phase]);
    return () => clearTimeout(timer);
  }, [phase]);

  const dateChosen = phase >= 1;
  const slotsVisible = phase >= 2 && phase <= 4;
  const slotChosen = phase >= 3;
  const confirming = phase === 4;
  const success = phase === 5;

  return (
    <div className="flex h-full w-full flex-col bg-white text-brand-text">
      <div className="flex shrink-0 items-center gap-2 border-b border-brand-border px-4 py-3">
        <span className="text-brand-text-muted">
          <ChevronIcon />
        </span>
        <CalendarIcon className="text-brand-text shrink-0" />
        <span className="truncate text-[13px] font-bold">Book — Dr. Nigar Quliyeva</span>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        {!success ? (
          <motion.div
            key="booking"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="flex flex-1 flex-col overflow-hidden"
          >
            <div className="flex shrink-0 items-center justify-between bg-brand-muted-bg px-4 py-2.5 text-brand-primary">
              <ChevronIcon />
              <span className="text-[12px] font-semibold text-brand-text">August 2026</span>
              <ChevronIcon dir="right" />
            </div>

            <div className="grid shrink-0 grid-cols-7 px-2 pt-2 text-center text-[9px] font-medium text-brand-text-muted">
              {WEEKDAYS.map((w) => (
                <span key={w}>{w}</span>
              ))}
            </div>

            <div className="grid shrink-0 grid-cols-7 gap-y-0.5 px-2 pb-2 pt-1">
              {CELLS.map((cell, i) => {
                const isTarget = cell.target;
                const isSelected = isTarget && dateChosen;
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
                    <p className="text-[11px] font-semibold">Pick a date</p>
                    <p className="text-[9px] text-brand-text-muted">Available time slots will appear here</p>
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
                    <p className="mb-2.5 flex items-center gap-1.5 text-[10px] font-semibold text-brand-primary">
                      <CalendarIcon className="h-3 w-3" />
                      Friday, 14 August 2026
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
                          <p className="text-[10px] font-semibold">Dr. Nigar Quliyeva</p>
                          <p className="text-[9px] text-brand-text-muted">Fri, 14 Aug · 13:30</p>
                          <motion.div
                            animate={{ scale: [1, 0.94, 1] }}
                            transition={{ duration: 0.9, times: [0, 0.5, 1], ease: EASE }}
                            className="brand-gradient mt-2.5 rounded-full py-1.5 text-center text-[10px] font-semibold text-white"
                          >
                            Confirm Appointment
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
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
              Appointment booked!
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.3 }}
              className="text-[10px] text-brand-text-muted"
            >
              Dr. Nigar Quliyeva · Fri, 14 Aug · 13:30
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
