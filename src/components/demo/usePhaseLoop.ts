"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";

/**
 * Drives a phone-mockup demo's phase index: phase i is shown for
 * `durations[i]` ms, then advances (wrapping back to 0), forever — the same
 * `setTimeout` chain BookingAnimation used inline, pulled out so every demo
 * screen (booking, doctor, hospital) shares it instead of re-deriving it.
 *
 * Two behaviors layered on top of the bare loop:
 * - `prefers-reduced-motion`: the loop never starts; phase is pinned at
 *   `staticPhase` (the single frame that best represents the flow).
 * - Out of view: the loop pauses via IntersectionObserver (`useInView`)
 *   rather than burning timers on an off-screen phone — attach `ref` to the
 *   demo's root element.
 */
export function usePhaseLoop(durations: number[], staticPhase = 0) {
  const [phase, setPhase] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "200px" });
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || !inView) return;
    const timer = setTimeout(() => setPhase((p) => (p + 1) % durations.length), durations[phase]);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, inView, reducedMotion]);

  return { phase: reducedMotion ? staticPhase : phase, ref };
}
