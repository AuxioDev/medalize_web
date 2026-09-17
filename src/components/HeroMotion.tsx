"use client";

import { motion, useInView, useMotionValue, useSpring, type Variants } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.11, delayChildren: 0.05 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

export function HeroStagger({ children }: { children: ReactNode }) {
  // initial={false}, not initial="hidden": with "hidden" here, SSR ships
  // every child inline-styled to opacity:0 (motion computes the initial
  // variant server-side, since there's no IntersectionObserver on the
  // server). That held the hero's own text invisible until React hydrated
  // and Motion could animate it back in — the site's actual LCP element.
  // false skips the mount transition and renders straight at "show".
  return (
    <motion.div initial={false} animate="show" variants={container}>
      {children}
    </motion.div>
  );
}

export function HeroItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div className={className} variants={item}>
      {children}
    </motion.div>
  );
}

export function PhoneReveal({ children }: { children: ReactNode }) {
  // Same fix as HeroStagger above: initial={false} instead of the object
  // form, so the phone mockup — also above the fold — doesn't SSR at
  // opacity:0 while waiting for JS.
  return (
    <motion.div
      initial={false}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ duration: 0.75, ease: EASE, delay: 0.2 }}
    >
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 5, ease: "easeInOut", repeat: Infinity, delay: 1 }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

// Parses a leading numeric run so "75+" animates 0→75 and keeps the "+" suffix,
// "100%" animates 0→100 and keeps "%", etc.
function splitNumeric(raw: string): { prefix: string; digits: number; suffix: string } {
  const match = raw.match(/^(\D*)(\d+)(.*)$/);
  if (!match) return { prefix: "", digits: 0, suffix: raw };
  const [, prefix, digits, suffix] = match;
  return { prefix, digits: Number(digits), suffix };
}

export function AnimatedStat({ value, delay = 0 }: { value: string; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const { prefix, digits, suffix } = splitNumeric(value);
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { duration: 1200, bounce: 0 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (inView) {
      const t = setTimeout(() => motionValue.set(digits), delay * 1000);
      return () => clearTimeout(t);
    }
  }, [inView, digits, delay, motionValue]);

  useEffect(() => spring.on("change", (v) => setDisplay(Math.round(v))), [spring]);

  return (
    <span ref={ref}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}
