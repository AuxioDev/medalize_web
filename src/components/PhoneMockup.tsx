import Image from "next/image";

// Real capture from the Medoro app running on an iPhone 17 Pro Max simulator
// (1320×2868 pt, via the mobile MCP + simctl) — not a hand-drawn recreation,
// so the frame's aspect ratio below is locked to that device's real ratio.
const SCREENSHOT_WIDTH = 1320;
const SCREENSHOT_HEIGHT = 2868;

export function PhoneMockup() {
  return (
    <div className="relative mx-auto w-full max-w-[168px]">
      <div className="absolute -inset-5 -z-10 rounded-[2.5rem] bg-gradient-to-br from-blue-200/50 via-teal-100/40 to-transparent blur-2xl" />

      <div className="relative rounded-[1.95rem] bg-neutral-950 p-[3px] shadow-2xl shadow-blue-900/25 ring-2 ring-white/80">
        {/* side buttons */}
        <div className="absolute -left-[2px] top-[50px] h-4 w-[2px] rounded-l-sm bg-neutral-400" />
        <div className="absolute -left-[2px] top-[70px] h-6 w-[2px] rounded-l-sm bg-neutral-400" />
        <div className="absolute -left-[2px] top-[94px] h-6 w-[2px] rounded-l-sm bg-neutral-400" />
        <div className="absolute -right-[2px] top-[82px] h-8 w-[2px] rounded-r-sm bg-neutral-400" />

        <div
          className="relative overflow-hidden rounded-[1.7rem] bg-brand-muted-bg"
          style={{ aspectRatio: `${SCREENSHOT_WIDTH} / ${SCREENSHOT_HEIGHT}` }}
        >
          <Image
            src="/brand/app-screenshot-hero.png"
            alt="Medoro running on iPhone 17 Pro Max — Find the right doctor onboarding screen"
            width={SCREENSHOT_WIDTH}
            height={SCREENSHOT_HEIGHT}
            className="h-full w-full object-cover"
            priority
            sizes="168px"
          />
        </div>
      </div>
    </div>
  );
}
