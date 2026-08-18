import { NextResponse } from "next/server";

// Universal Links (QR_SHARE_PROFILE_PLAN.md Phase 3) — must be served with
// no file extension, application/json, and no redirects for iOS to trust
// this domain's association with the app.
//
// APPLE_TEAM_ID: Apple Developer > Membership > Team ID (10 characters).
// Without the real value, Universal Links silently fail Apple's domain
// verification — the app just never opens for these links.
const TEAM_ID = process.env.APPLE_TEAM_ID || "REPLACE_WITH_APPLE_TEAM_ID";
const BUNDLE_ID = "com.auxiodev.docget";

export function GET() {
  return NextResponse.json({
    applinks: {
      apps: [],
      details: [
        {
          appID: `${TEAM_ID}.${BUNDLE_ID}`,
          paths: ["/*/doctor/*", "/*/hospital/*"],
        },
      ],
    },
  });
}
