const PULSE_PATH =
  "M0,30 L35,30 L48,18 L60,30 L75,30 L88,48 L102,6 L116,50 L128,30 L160,30";

export function PulseTrace({ className = "h-6 w-24" }: { className?: string }) {
  return (
    <svg viewBox="0 0 160 60" className={className} preserveAspectRatio="none" aria-hidden="true">
      <path
        d={PULSE_PATH}
        fill="none"
        stroke="currentColor"
        strokeWidth={4}
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={0.22}
      />
      <path
        d={PULSE_PATH}
        fill="none"
        stroke="currentColor"
        strokeWidth={4}
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength={1000}
        className="pulse-sweep"
      />
    </svg>
  );
}

export function PulseLoader() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3 text-brand-primary">
      <PulseTrace className="h-12 w-48" />
      <span className="sr-only">Loading</span>
    </div>
  );
}
