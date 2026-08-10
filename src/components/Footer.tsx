import { getTranslations } from "next-intl/server";
import { Logo } from "./Logo";

export async function Footer() {
  const t = await getTranslations("footer");
  const header = await getTranslations("header");

  const productLinks = [
    { href: "#how", label: header("nav.how") },
    { href: "#specialties", label: header("nav.specialties") },
    { href: "#providers", label: header("nav.providers") },
    { href: "#waitlist", label: header("cta") },
  ];

  return (
    <footer className="border-t border-brand-ink-border bg-brand-ink text-brand-ink-text">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-[1.3fr_1fr_1fr]">
          <div className="max-w-xs">
            <Logo wordmarkClassName="text-white" />
            <p className="mt-3 text-sm leading-relaxed text-slate-400">{t("tagline")}</p>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              {t("productHeading")}
            </h3>
            <ul className="mt-4 space-y-2.5">
              {productLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-sm text-slate-400 transition-colors hover:text-white">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              {t("companyHeading")}
            </h3>
            <ul className="mt-4 space-y-2.5">
              <li>
                <a
                  href="https://auxiodev.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-slate-400 transition-colors hover:text-white"
                >
                  {t("aboutLabel")}
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@auxiodev.com"
                  className="text-sm text-slate-400 transition-colors hover:text-white"
                >
                  {t("contactLabel")}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-brand-ink-border pt-6">
          <p className="max-w-2xl text-xs leading-relaxed text-slate-500">{t("legalNote")}</p>
          <p className="mt-3 text-xs text-slate-500">
            {t.rich("copyright", {
              year: new Date().getFullYear(),
              link: (chunks) => (
                <a
                  href="https://auxiodev.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-slate-600 underline-offset-2 transition-colors hover:text-white"
                >
                  {chunks}
                </a>
              ),
            })}{" "}
            ·{" "}
            <a href="mailto:info@auxiodev.com" className="transition-colors hover:text-white">
              info@auxiodev.com
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
