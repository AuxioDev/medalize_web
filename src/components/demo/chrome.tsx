"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";

// Small shared building blocks for the phone-mockup demo screens — the
// bits of chrome (app bar, avatar, status pill, grid tile, "pressed"
// pulse) that BookingAnimation, DoctorAnimation and HospitalAnimation all
// redraw in slightly different combinations, kept in one place instead of
// copy-pasted three times.

export const DEMO_EASE = [0.22, 1, 0.36, 1] as const;

export function DemoAppBar({ icon, title }: { icon: ReactNode; title: string }) {
  return (
    <div className="flex shrink-0 items-center gap-2 border-b border-brand-border px-4 py-3">
      <span className="text-brand-text">{icon}</span>
      <span className="truncate text-[13px] font-bold">{title}</span>
    </div>
  );
}

export function DemoAvatar({ initial, size = 36 }: { initial: string; size?: number }) {
  return (
    <div
      className="flex shrink-0 items-center justify-center rounded-full bg-brand-primary text-xs font-bold text-white"
      style={{ width: size, height: size }}
    >
      {initial}
    </div>
  );
}

type StatusTone = "amber" | "emerald" | "neutral";

const TONE_CLASSES: Record<StatusTone, string> = {
  amber: "bg-amber-100 text-amber-700",
  emerald: "bg-emerald-100 text-emerald-700",
  neutral: "bg-brand-muted-bg text-brand-text-muted",
};

export function StatusPill({ tone, label }: { tone: StatusTone; label: string }) {
  return (
    <motion.span
      layout
      transition={{ duration: 0.35, ease: DEMO_EASE }}
      className={`inline-flex shrink-0 items-center rounded-full px-2 py-0.5 text-[9px] font-semibold ${TONE_CLASSES[tone]}`}
    >
      {label}
    </motion.span>
  );
}

export function ActionTile({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-1.5 rounded-xl border border-brand-border bg-white py-3 shadow-sm">
      <div className="brand-gradient flex h-7 w-7 items-center justify-center rounded-lg text-white">{icon}</div>
      <span className="text-center text-[8.5px] font-medium leading-tight text-brand-text">{label}</span>
    </div>
  );
}

// The "tapped" gesture used for primary CTAs mid-demo — a quick
// squash-and-release, same curve BookingAnimation used for its Confirm
// button.
export function PressPulse({ children, active }: { children: ReactNode; active: boolean }) {
  return (
    <motion.div
      animate={active ? { scale: [1, 0.94, 1] } : { scale: 1 }}
      transition={{ duration: 0.9, times: [0, 0.5, 1], ease: DEMO_EASE }}
    >
      {children}
    </motion.div>
  );
}

export function DemoScreenFade({ children, screenKey }: { children: ReactNode; screenKey: string }) {
  return (
    <motion.div
      key={screenKey}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: DEMO_EASE }}
      className="flex flex-1 flex-col overflow-hidden"
    >
      {children}
    </motion.div>
  );
}
