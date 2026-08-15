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
        d="M150,512 L350,512 L400,437 L450,512 L505,512 L545,682 L598,150 L651,700 L704,512 L874,512"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth={56}
        strokeLinecap="round"
        strokeLinejoin="round"
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
        DocGet
      </span>
    </span>
  );
}
