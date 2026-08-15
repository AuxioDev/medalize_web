# medalize_web

Pre-launch marketing / waitlist site for **DocGet** — find the right doctor
anywhere in Azerbaijan. Next.js 16 (App Router) + Tailwind CSS v4 + next-intl.

## Stack

- Next.js 16, React 19, TypeScript
- Tailwind CSS v4 (brand tokens in `src/app/globals.css`)
- [next-intl](https://next-intl.dev) — 6 locales: `en`, `az`, `ru`, `tr`, `zh`, `fr` (`src/messages/*.json`)
- [Resend](https://resend.com) for the waitlist form's email delivery (optional, see below)

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000 — you'll be redirected to your browser's preferred
locale (falls back to `/en`).

## Waitlist form

`POST /api/waitlist` (`src/app/api/waitlist/route.ts`) validates the email and,
if `RESEND_API_KEY` is set, emails the submission to `WAITLIST_NOTIFY_EMAIL`
(defaults to `info@auxiodev.com`). Without an API key it just logs to the
server console — fine for local dev, **not for production**. Copy `.env.example`
to `.env.local` and fill in `RESEND_API_KEY` before deploying.

## Content

- Landing copy: `src/messages/{locale}.json` — one namespaced key set, mirrored
  across all 6 locales.
- Specialty list: `src/data/specialties.ts`, mirrored from the mobile app's
  `apps/users/i18n/specializations.json` in `medalize_be` (kept in sync manually).
- Brand tokens (colors, gradient) match `medalize_mb`'s `AppColors`
  (`#2563EB` primary / `#0D9488` secondary) and the app icon mark
  (`public/brand/`).

## Not included yet

No Privacy Policy / Terms pages — add before collecting real signups in
production, ideally reviewed by counsel. No analytics/cookie banner (add a
consent banner if/when analytics are wired up).
