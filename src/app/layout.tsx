import type { Metadata } from "next";
import { Geist, Geist_Mono, Quicksand } from "next/font/google";
import "./globals.css";
import { BaseHeader } from "@/layouts/BaseHeader";
import { BaseFooter } from "@/layouts/BaseFooter";
import { Analytics } from "@vercel/analytics/next";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const brandFont = Quicksand({
  variable: "--font-brand",
  subsets: ["latin"],
  weight: "700",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://modern-design.example.com"
  ),
  title: {
    default: "Modern Design",
    template: "%s | Modern Design",
  },
  description:
    "自作薄型レバーレスコントローラーの作成をサポート。ボタン配置をドラッグ＆ドロップで直感的にデザインし、ワンクリックでKiCadプロジェクトを生成できます。",
  keywords: [
    "レバーレス",
    "アケコン",
    "レバーレスコントローラー",
    "ホットスワップ",
    "KiCad",
    "基板設計",
    "PCB",
    "自作コントローラー",
  ],
  openGraph: {
    type: "website",
    url: "/",
    title: "Modern Design - レバーレスコントローラー設計ツール",
    description:
      "ドラッグ＆ドロップでボタン配置をデザインし、KiCadデータを自動生成。",
    siteName: "Modern Design",
    images: [
      {
        url: "/logo.svg",
        width: 1200,
        height: 630,
        alt: "Modern Design",
      },
    ],
    locale: "ja_JP",
  },
  twitter: {
    card: "summary_large_image",
    title: "Modern Design - レバーレスコントローラー設計ツール",
    description:
      "ドラッグ＆ドロップでボタン配置をデザインし、KiCadデータを自動生成。",
    images: ["/logo.svg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${brandFont.variable} antialiased`}
      >
        <main>
          <BaseHeader />
          {children}
          <BaseFooter />
        </main>
        {/* JSON-LD structured data */}
        <Script type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Modern Design",
            url:
              process.env.NEXT_PUBLIC_SITE_URL ||
              "https://modern-design.example.com",
            logo: "/logo.svg",
          })}
        </Script>
        <Script type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Modern Design",
            url:
              process.env.NEXT_PUBLIC_SITE_URL ||
              "https://modern-design.example.com",
            potentialAction: {
              "@type": "SearchAction",
              target: `${
                process.env.NEXT_PUBLIC_SITE_URL ||
                "https://modern-design.example.com"
              }/search?q={search_term_string}`,
              "query-input": "required name=search_term_string",
            },
          })}
        </Script>
        <Analytics />
      </body>
    </html>
  );
}
