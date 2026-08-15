import type { ReactNode } from "react";

// Real device ratio, from a capture of the app running on an iPhone 17 Pro
// Max simulator (1320×2868 pt, via the mobile MCP + simctl) — the frame
// below is locked to that ratio so the recreated screen inside reads as
// the real device, not an arbitrary rectangle.
const SCREENSHOT_WIDTH = 1320;
const SCREENSHOT_HEIGHT = 2868;

function SignalIcon() {
  return (
    <svg width="14" height="9" viewBox="0 0 14 9" fill="currentColor">
      <rect x="0" y="5.5" width="2.4" height="3.5" rx="0.6" />
      <rect x="3.9" y="3.6" width="2.4" height="5.4" rx="0.6" />
      <rect x="7.8" y="1.8" width="2.4" height="7.2" rx="0.6" />
      <rect x="11.6" y="0" width="2.4" height="9" rx="0.6" />
    </svg>
  );
}

function WifiIcon() {
  return (
    <svg width="13" height="9" viewBox="0 0 13 9" fill="none">
      <path
        d="M6.5 8.6C7 8.6 7.4 8.2 7.4 7.7C7.4 7.2 7 6.8 6.5 6.8C6 6.8 5.6 7.2 5.6 7.7C5.6 8.2 6 8.6 6.5 8.6Z"
        fill="currentColor"
      />
      <path
        d="M3.9 5.4C4.6 4.7 5.5 4.3 6.5 4.3C7.5 4.3 8.4 4.7 9.1 5.4"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M1.5 2.9C3 1.5 4.7 0.8 6.5 0.8C8.3 0.8 10 1.5 11.5 2.9"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function BatteryIcon() {
  return (
    <svg width="23" height="11" viewBox="0 0 23 11" fill="none">
      <rect x="0.6" y="0.6" width="19" height="9.8" rx="2.6" stroke="currentColor" strokeWidth="1" opacity="0.4" />
      <rect x="2" y="2" width="16.2" height="7" rx="1.5" fill="currentColor" />
      <path d="M20.6 3.4V7.6C21.4 7.3 22 6.4 22 5.5C22 4.6 21.4 3.7 20.6 3.4Z" fill="currentColor" opacity="0.4" />
    </svg>
  );
}

function StatusBar() {
  return (
    <div className="relative z-10 flex h-[34px] shrink-0 items-center justify-between bg-white px-6 text-brand-text">
      <span className="text-[11px] font-semibold tabular-nums">9:41</span>
      <div className="absolute left-1/2 top-1/2 h-[16px] w-[64px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-black" />
      <div className="flex items-center gap-[3px]">
        <SignalIcon />
        <WifiIcon />
        <BatteryIcon />
      </div>
    </div>
  );
}

export function PhoneMockup({ children }: { children: ReactNode }) {
  return (
    <div className="relative mx-auto w-full max-w-[252px]">
      <div className="absolute -inset-[30px] -z-10 rounded-[3.75rem] bg-gradient-to-br from-blue-200/50 via-teal-100/40 to-transparent blur-2xl" />

      <div className="relative rounded-[2.93rem] bg-neutral-950 p-[4.5px] shadow-2xl shadow-blue-900/25 ring-[3px] ring-white/80">
        {/* side buttons */}
        <div className="absolute -left-[3px] top-[75px] h-6 w-[3px] rounded-l-sm bg-neutral-400" />
        <div className="absolute -left-[3px] top-[105px] h-9 w-[3px] rounded-l-sm bg-neutral-400" />
        <div className="absolute -left-[3px] top-[141px] h-9 w-[3px] rounded-l-sm bg-neutral-400" />
        <div className="absolute -right-[3px] top-[123px] h-12 w-[3px] rounded-r-sm bg-neutral-400" />

        <div
          className="relative flex flex-col overflow-hidden rounded-[2.55rem] bg-brand-muted-bg"
          style={{ aspectRatio: `${SCREENSHOT_WIDTH} / ${SCREENSHOT_HEIGHT}` }}
        >
          <StatusBar />
          <div className="min-h-0 flex-1">{children}</div>
        </div>
      </div>
    </div>
  );
}
