// Shared inline-SVG icon set for the phone-mockup demo screens
// (BookingAnimation, DoctorAnimation, HospitalAnimation). Kept as tiny
// hand-drawn SVGs — same approach as the rest of the site — rather than an
// icon library, since each demo screen only needs a handful at a fixed,
// very small size (readable inside a ~250px-wide phone frame).

export function ChevronIcon({ dir = "left" }: { dir?: "left" | "right" | "down" }) {
  if (dir === "down") {
    return (
      <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
        <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  return (
    <svg width="7" height="12" viewBox="0 0 7 12" fill="none" className={dir === "right" ? "rotate-180" : ""}>
      <path d="M6 1L1 6L6 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function CalendarIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={className}>
      <rect x="1.5" y="2.8" width="13" height="11.7" rx="1.8" stroke="currentColor" strokeWidth="1.4" />
      <path d="M1.5 6.2H14.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M4.5 1V3.6M11.5 1V3.6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

export function SearchIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" className={className}>
      <circle cx="5.5" cy="5.5" r="4.2" stroke="currentColor" strokeWidth="1.4" />
      <path d="M12 12L9 9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

export function PinIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="10" height="12" viewBox="0 0 10 12" fill="none" className={className}>
      <path
        d="M5 11.3S9 7.9 9 4.5C9 2.3 7.2 0.7 5 0.7C2.8 0.7 1 2.3 1 4.5C1 7.9 5 11.3 5 11.3Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
      <circle cx="5" cy="4.5" r="1.3" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}

export function StarIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="9" height="9" viewBox="0 0 9 9" fill="currentColor" className={className}>
      <path d="M4.5 0.5L5.6 3.1L8.4 3.4L6.3 5.3L6.9 8.1L4.5 6.6L2.1 8.1L2.7 5.3L0.6 3.4L3.4 3.1Z" />
    </svg>
  );
}

export function SortIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" className={className}>
      <path d="M2.5 1.5V9.5M2.5 1.5L0.8 3.2M2.5 1.5L4.2 3.2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8.5 9.5V1.5M8.5 9.5L6.8 7.8M8.5 9.5L10.2 7.8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function HeartIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="15" height="14" viewBox="0 0 15 14" fill="none" className={className}>
      <path
        d="M7.5 13S1 9.1 1 4.6C1 2.6 2.6 1 4.5 1C5.7 1 6.8 1.6 7.5 2.6C8.2 1.6 9.3 1 10.5 1C12.4 1 14 2.6 14 4.6C14 9.1 7.5 13 7.5 13Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PeopleIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="14" height="12" viewBox="0 0 14 12" fill="none" className={className}>
      <circle cx="5" cy="3.2" r="2.2" stroke="currentColor" strokeWidth="1.3" />
      <path d="M1 11.2C1 8.5 2.8 6.8 5 6.8C7.2 6.8 9 8.5 9 11.2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M9.2 2.4C10.3 2.6 11.1 3.5 11.1 4.6C11.1 5.5 10.5 6.3 9.7 6.6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M10.6 7.4C11.9 7.8 12.8 9.1 12.8 11.2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

export function CheckIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="12" height="10" viewBox="0 0 12 10" fill="none" className={className}>
      <path d="M1.2 5.2L4.4 8.4L10.8 1.4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function CloseIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className={className}>
      <path d="M1 1L9 9M9 1L1 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function ClockIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 20 20" fill="none" className={className}>
      <circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10 5.5V10L13 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function BuildingIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className={className}>
      <rect x="3" y="1.5" width="10" height="13" rx="1" stroke="currentColor" strokeWidth="1.3" />
      <path d="M5.5 4.5H6.5M9.5 4.5H10.5M5.5 7.5H6.5M9.5 7.5H10.5M5.5 10.5H6.5M9.5 10.5H10.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M6.5 14.5V12H9.5V14.5" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}

export function UserPlusIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" className={className}>
      <circle cx="8" cy="6.5" r="3" stroke="currentColor" strokeWidth="1.5" />
      <path d="M2.5 17C2.5 13.4 4.9 11 8 11C11.1 11 13.5 13.4 13.5 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M16.5 6V11M14 8.5H19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function EyeOffIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 20 20" fill="none" className={className}>
      <path
        d="M2.5 10.5C4 6.8 6.8 4.8 10 4.8C13.2 4.8 16 6.8 17.5 10.5C16 14.2 13.2 16.2 10 16.2C6.8 16.2 4 14.2 2.5 10.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <circle cx="10" cy="10.5" r="2.4" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3.5 3.5L16.5 17.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function MapPinDropIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className={className}>
      <path
        d="M9 16.5S15 11 15 6.5C15 3.2 12.3 0.8 9 0.8C5.7 0.8 3 3.2 3 6.5C3 11 9 16.5 9 16.5Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <circle cx="9" cy="6.5" r="2.2" fill="currentColor" />
    </svg>
  );
}

export function SpinnerIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className={`animate-spin ${className}`}>
      <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.6" opacity="0.25" />
      <path d="M12.5 7A5.5 5.5 0 0 0 7 1.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
