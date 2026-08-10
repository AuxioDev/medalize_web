export function LogoMark({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 1024 1024" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="medoroGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1D4ED8" />
          <stop offset="100%" stopColor="#0D9488" />
        </linearGradient>
      </defs>
      <rect width="1024" height="1024" rx="224" fill="url(#medoroGrad)" />
      <path
        fill="#FFFFFF"
        fillRule="evenodd"
        d="M332 608A270 270 0 1 1 692 608L692 887L512 767L332 887Z M467 227L557 227Q557 362 692 362L692 452Q557 452 557 587L467 587Q467 452 332 452L332 362Q467 362 467 227Z"
      />
    </svg>
  );
}

export function Logo({
  className = "",
  wordmarkClassName = "text-brand-text",
}: {
  className?: string;
  wordmarkClassName?: string;
}) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark className="h-8 w-8 shrink-0" />
      <span className={`text-lg font-semibold tracking-tight ${wordmarkClassName}`}>
        Medoro
      </span>
    </span>
  );
}
