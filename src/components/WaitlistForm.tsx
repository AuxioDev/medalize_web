"use client";

import { useState, type FormEvent } from "react";
import { useLocale, useTranslations } from "next-intl";

type Status = "idle" | "loading" | "success" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function WaitlistForm() {
  const t = useTranslations("waitlist");
  const locale = useLocale();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

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
        body: JSON.stringify({ email, locale }),
      });

      if (!res.ok) throw new Error("request_failed");

      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMessage(t("errorGeneric"));
    }
  }

  if (status === "success") {
    return (
      <div className="mx-auto max-w-md rounded-2xl border border-white/20 bg-white/10 p-6 text-center backdrop-blur-sm">
        <p className="text-lg font-semibold text-white">{t("successTitle")}</p>
        <p className="mt-1 text-sm text-white/80">{t("successBody")}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-md" noValidate>
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === "error") setStatus("idle");
          }}
          placeholder={t("placeholder")}
          aria-label={t("placeholder")}
          className="w-full rounded-full border-0 bg-white px-5 py-3 text-sm text-brand-text placeholder:text-brand-text-muted focus:outline-none focus:ring-2 focus:ring-white/60 sm:flex-1"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="shrink-0 rounded-full bg-brand-ink px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {status === "loading" ? t("buttonLoading") : t("button")}
        </button>
      </div>

      {status === "error" && (
        <p className="mt-2.5 text-sm font-medium text-red-100">{errorMessage}</p>
      )}

      <p className="mt-3 text-xs text-white/70">{t("disclaimer")}</p>
    </form>
  );
}
