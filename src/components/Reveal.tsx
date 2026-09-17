"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

// Whether `el` already has any part on-screen right now. Used at mount to
// decide whether a Reveal should even bother hiding-then-animating: if the
// answer is yes, the content is already what the user sees, so there is
// nothing to reveal — flipping it to hidden and back would just flash.
function isInViewport(el: Element) {
  const rect = el.getBoundingClientRect();
  return rect.top < window.innerHeight && rect.bottom > 0;
}

// Reveal/RevealGroup used to render their motion.div with initial="hidden"
// unconditionally, which Motion resolves server-side (no
// IntersectionObserver exists on the server) into an inline
// style="opacity:0" — shipped in the HTML itself. That's fine for the
// scroll-reveal effect once JS is running, but it means every one of these
// sections is permanently blank content if JS is slow, blocked, or fails to
// load — not a themed loading state, just gone.
//
// The fix: server and first client paint always render the plain,
// fully-visible div below (matches "opacity:1 in the markup" — the safe
// default). Only after mount does an effect check each element — if it's
// already in the viewport, leave it alone (it's already showing correctly,
// no reveal needed). If it's below the fold, *now* switch it to the
// animated variant, off-screen where the user can't see the switch; when
// they scroll to it, whileInView fires the reveal exactly as before.
function useEnhanceWhenOffscreen(disabled: boolean) {
  const ref = useRef<HTMLDivElement>(null);
  const [enhanced, setEnhanced] = useState(false);

  useEffect(() => {
    if (disabled) return;
    const el = ref.current;
    if (!el || isInViewport(el)) return;
    setEnhanced(true);
  }, [disabled]);

  return { ref, enhanced };
}

export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduceMotion = useReducedMotion();
  const { ref, enhanced } = useEnhanceWhenOffscreen(!!reduceMotion);

  if (reduceMotion || !enhanced) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={item}
      transition={{ duration: 0.6, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

export function RevealGroup({
  children,
  className,
  stagger = 0.09,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
}) {
  const reduceMotion = useReducedMotion();
  const { ref, enhanced } = useEnhanceWhenOffscreen(!!reduceMotion);
  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: stagger, delayChildren: 0.03 } },
  };

  if (reduceMotion || !enhanced) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={container}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div className={className} variants={item}>
      {children}
    </motion.div>
  );
}
