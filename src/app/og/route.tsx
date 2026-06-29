import { ImageResponse } from "@vercel/og";

export const runtime = "edge";

const sectionConfig: Record<string, { label: string; accent: string }> = {
  default: { label: "SP NET INC", accent: "#3b82f6" },
  products: { label: "Products", accent: "#3b82f6" },
  founder: { label: "Founder", accent: "#3b82f6" },
  technologies: { label: "Expertise", accent: "#8b5cf6" },
  organization: { label: "Organization", accent: "#3b82f6" },
  journey: { label: "Journey", accent: "#3b82f6" },
  roadmap: { label: "Roadmap", accent: "#10b981" },
  contact: { label: "Contact", accent: "#3b82f6" },
};

async function loadGeist(): Promise<ArrayBuffer> {
  const css = await (
    await fetch(
      "https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&display=swap",
      { headers: { "User-Agent": "Mozilla/5.0" } }
    )
  ).text();
  const match = css.match(/src:\s*url\(([^)]+)\)/);
  if (!match) throw new Error("Font URL not found");
  const res = await fetch(match[1]);
  return res.arrayBuffer();
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const section = url.searchParams.get("section") || "default";
  const cfg = sectionConfig[section] || sectionConfig.default;

  let fontData: ArrayBuffer | null = null;
  try {
    fontData = await loadGeist();
  } catch {
    // Fallback: render without custom font
  }

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          background: "#0a0a0a",
          padding: 64,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Grid overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.08,
            backgroundImage: `linear-gradient(${cfg.accent}22 1px, transparent 1px), linear-gradient(90deg, ${cfg.accent}22 1px, transparent 1px)`,
            backgroundSize: "48px 48px",
          }}
        />

        {/* Ambient glow */}
        <div
          style={{
            position: "absolute",
            top: "-200px",
            right: "-200px",
            width: 600,
            height: 600,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${cfg.accent}22 0%, transparent 70%)`,
          }}
        />

        {/* Top accent bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 4,
            background: `linear-gradient(90deg, ${cfg.accent}, ${cfg.accent}66, transparent)`,
          }}
        />

        {/* Content */}
        <div style={{ display: "flex", flexDirection: "column", gap: 0, position: "relative", zIndex: 1 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              fontSize: 18,
              color: cfg.accent,
              opacity: 0.6,
              fontWeight: 500,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: cfg.accent }} />
            {cfg.label}
          </div>
          <div
            style={{
              fontSize: 72,
              fontWeight: 700,
              color: "#ffffff",
              letterSpacing: "-0.03em",
              lineHeight: 1,
              marginTop: 16,
            }}
          >
            Savan Patel
          </div>
          <div
            style={{
              fontSize: 28,
              color: "rgba(255,255,255,0.35)",
              fontWeight: 400,
              marginTop: 8,
              letterSpacing: "-0.01em",
            }}
          >
            SP NET INC — Connect Beyond Limits
          </div>
        </div>

        {/* Bottom brand */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            position: "relative",
            zIndex: 1,
            fontSize: 16,
            color: "rgba(255,255,255,0.2)",
            fontWeight: 500,
          }}
        >
          <span style={{ fontWeight: 700, color: cfg.accent, opacity: 0.6 }}>SP</span>
          spnetinc.com
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: fontData
        ? [
            {
              name: "Geist",
              data: fontData,
              weight: 700,
              style: "normal",
            },
          ]
        : undefined,
    }
  );
}
