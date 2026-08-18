import { NextResponse } from "next/server";

// App Links (QR_SHARE_PROFILE_PLAN.md Phase 3) — must be served as
// application/json at exactly this path for Android to trust this domain's
// association with the app.
//
// ANDROID_SHA256_CERT_FINGERPRINTS: the SHA-256 fingerprint of the signing
// certificate, comma-separated if you need more than one (e.g. a debug
// build's fingerprint alongside the Play Store release key). Get it via
// `keytool -list -v -keystore <path-to-keystore>`, or from Play Console >
// Setup > App integrity > App signing key certificate once the app is
// published there. Without the real value, App Links silently fail
// Android's domain verification — the app just never opens for these links.
const PACKAGE_NAME = "com.auxiodev.docget";
const FINGERPRINTS = (
  process.env.ANDROID_SHA256_CERT_FINGERPRINTS || "REPLACE_WITH_ANDROID_SHA256_FINGERPRINT"
)
  .split(",")
  .map((f) => f.trim())
  .filter(Boolean);

export function GET() {
  return NextResponse.json([
    {
      relation: ["delegate_permission/common.handle_all_urls"],
      target: {
        namespace: "android_app",
        package_name: PACKAGE_NAME,
        sha256_cert_fingerprints: FINGERPRINTS,
      },
    },
  ]);
}
