import { ImageResponse } from "next/og";
import { getTranslations } from "next-intl/server";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "hero" });

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          backgroundImage: "linear-gradient(135deg, #1D4ED8 0%, #0D9488 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: "rgba(255,255,255,0.18)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 30,
              fontWeight: 700,
            }}
          >
            M
          </div>
          <div style={{ fontSize: 34, fontWeight: 600 }}>Medoro</div>
        </div>
        <div
          style={{
            marginTop: 48,
            fontSize: 58,
            fontWeight: 700,
            lineHeight: 1.15,
            maxWidth: 980,
            display: "flex",
          }}
        >
          {t("title")}
        </div>
        <div style={{ marginTop: 28, fontSize: 28, opacity: 0.9, display: "flex" }}>
          {t("eyebrow")}
        </div>
      </div>
    ),
    { ...size },
  );
}
