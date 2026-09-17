"use client";

import { useState, type FormEvent } from "react";
import { useLocale, useTranslations } from "next-intl";
import { AnimatePresence, motion } from "motion/react";
import { PulseTrace } from "./PulseLoader";

type Status = "idle" | "loading" | "success" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const EASE = [0.22, 1, 0.36, 1] as const;

export function WaitlistForm() {
  const t = useTranslations("waitlist");
  const locale = useLocale();
  const [email, setEmail] = useState("");
  // Honeypot: a field no sighted human ever sees or tabs into (aria-hidden +
  // tabIndex -1 + off-screen, not display:none — some bots skip hidden
  // fields but still fill visible-but-styled-away ones). Real submissions
  // always leave it empty; the API silently no-ops when it's filled instead
  // of returning an error, so a bot can't tell it was caught.
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const emailId = "waitlist-email";
  const errorId = "waitlist-email-error";

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!EMAIL_RE.test(email)) {
      setStatus("error");
      setErrorMessage(t("errorInvalid"));
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, locale, website }),
      });

      if (!res.ok) {
        // The API distinguishes invalid_email (400) from send_failed (502)
        // — this used to collapse both into one generic message even
        // though the server already knew which one happened.
        const data: { error?: string } | null = await res.json().catch(() => null);
        setStatus("error");
        setErrorMessage(data?.error === "invalid_email" ? t("errorInvalid") : t("errorGeneric"));
        return;
      }

      window.plausible?.("Waitlist Signup", { props: { locale } });
      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMessage(t("errorGeneric"));
    }
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      {status === "success" ? (
        <motion.div
          key="success"
          role="status"
          aria-live="polite"
          initial={{ opacity: 0, y: 10, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.4, ease: EASE }}
          className="mx-auto max-w-md rounded-2xl border border-white/20 bg-white/10 p-6 text-center backdrop-blur-sm"
        >
          <motion.p
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.35, ease: EASE }}
            className="text-lg font-semibold text-white"
          >
            {t("successTitle")}
          </motion.p>
          <p className="mt-1 text-sm text-white/80">{t("successBody")}</p>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.3, ease: EASE }}
          onSubmit={handleSubmit}
          className="mx-auto max-w-md"
          noValidate
        >
          <label htmlFor={emailId} className="sr-only">
            {t("label")}
          </label>
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              type="text"
              name="website"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="absolute -left-[9999px] h-px w-px overflow-hidden opacity-0"
            />
            <input
              id={emailId}
              type="email"
              name="email"
              required
              autoComplete="email"
              inputMode="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (status === "error") setStatus("idle");
              }}
              placeholder={t("placeholder")}
              aria-invalid={status === "error"}
              aria-describedby={status === "error" ? errorId : undefined}
              className="w-full rounded-full border-0 bg-white px-5 py-3 text-sm text-brand-text placeholder:text-brand-text-muted sm:flex-1"
            />
            <motion.button
              type="submit"
              disabled={status === "loading"}
              aria-busy={status === "loading"}
              whileHover={status === "loading" ? undefined : { scale: 1.03 }}
              whileTap={status === "loading" ? undefined : { scale: 0.97 }}
              className="shrink-0 rounded-full bg-brand-ink px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={status === "loading" ? "loading" : "idle"}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.15 }}
                  className="inline-flex items-center gap-2"
                >
                  {status === "loading" ? (
                    <>
                      <PulseTrace className="h-4 w-9" />
                      {t("buttonLoading")}
                    </>
                  ) : (
                    t("button")
                  )}
                </motion.span>
              </AnimatePresence>
            </motion.button>
          </div>

          <AnimatePresence>
            {status === "error" && (
              <motion.p
                id={errorId}
                role="alert"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="mt-2.5 text-sm font-medium text-red-100"
              >
                {errorMessage}
              </motion.p>
            )}
          </AnimatePresence>

          <p className="mt-3 text-xs text-white/70">{t("disclaimer")}</p>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
