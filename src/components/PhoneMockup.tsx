import Image from "next/image";

// Real capture from the Medoro app running on an iPhone 17 Pro Max simulator
// (1320×2868 pt, via the mobile MCP + simctl) — the patient-side appointment
// booking calendar, not a hand-drawn recreation, so the frame's aspect ratio
// below is locked to that device's real ratio.
const SCREENSHOT_WIDTH = 1320;
const SCREENSHOT_HEIGHT = 2868;

export function PhoneMockup() {
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
          className="relative overflow-hidden rounded-[2.55rem] bg-brand-muted-bg"
          style={{ aspectRatio: `${SCREENSHOT_WIDTH} / ${SCREENSHOT_HEIGHT}` }}
        >
          <Image
            src="/brand/app-screenshot-booking.png"
            alt="Medoro running on iPhone 17 Pro Max — booking an appointment with a doctor"
            width={SCREENSHOT_WIDTH}
            height={SCREENSHOT_HEIGHT}
            className="h-full w-full object-cover"
            priority
            sizes="252px"
          />
        </div>
      </div>
    </div>
  );
}
