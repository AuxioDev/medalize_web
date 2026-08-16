import { NextResponse } from "next/server";
import { Resend } from "resend";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const NOTIFY_TO = process.env.WAITLIST_NOTIFY_EMAIL || "info@auxiodev.com";
const NOTIFY_FROM = process.env.WAITLIST_FROM_EMAIL || "DocGet Waitlist <waitlist@docget.az>";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  const { email, locale } = (body ?? {}) as { email?: string; locale?: string };

  if (typeof email !== "string" || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "invalid_email" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.log(`[waitlist] (dev, no RESEND_API_KEY set) ${email} — locale=${locale ?? "?"}`);
    return NextResponse.json({ ok: true });
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: NOTIFY_FROM,
      to: NOTIFY_TO,
      replyTo: email,
      subject: "New DocGet waitlist signup",
      text: `Email: ${email}\nLocale: ${locale ?? "unknown"}\nAt: ${new Date().toISOString()}`,
    });

    if (error) {
      console.error("[waitlist] resend error", error);
      return NextResponse.json({ error: "send_failed" }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[waitlist] unexpected error", err);
    return NextResponse.json({ error: "send_failed" }, { status: 502 });
  }
}
