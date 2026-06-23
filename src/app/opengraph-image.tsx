import { ImageResponse } from "next/og";
import { SITE_NAME } from "@/app/lib/seo";

export const alt = "Modern Design - Leverless controller PCB design tool";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background:
          "radial-gradient(circle at 50% 0%, rgba(255, 53, 93, 0.34), transparent 36%), linear-gradient(135deg, #0b1120 0%, #111827 48%, #1e1b4b 100%)",
        color: "#f8fafc",
        padding: 72,
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 40,
            fontWeight: 800,
            letterSpacing: -1,
          }}
        >
          {SITE_NAME}
        </div>
        <div
          style={{
            display: "flex",
            border: "1px solid rgba(244, 114, 182, 0.7)",
            borderRadius: 999,
            color: "#f9a8d4",
            fontSize: 24,
            padding: "12px 24px",
          }}
        >
          KiCad PCB Generator
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div
          style={{
            display: "flex",
            fontSize: 72,
            fontWeight: 900,
            lineHeight: 1.05,
            letterSpacing: -3,
            maxWidth: 920,
          }}
        >
          Leverless Controller Design Made Simple
        </div>
        <div
          style={{
            display: "flex",
            color: "#cbd5e1",
            fontSize: 32,
            lineHeight: 1.35,
            maxWidth: 900,
          }}
        >
          Design your button layout in the browser and export editable KiCad
          project data.
        </div>
      </div>

      <div
        style={{
          display: "flex",
          gap: 16,
          color: "#fbcfe8",
          fontSize: 24,
        }}
      >
        <span>Drag & Drop Layout</span>
        <span>/</span>
        <span>Clearance Check</span>
        <span>/</span>
        <span>KiCad Export</span>
      </div>
    </div>,
    size
  );
}
