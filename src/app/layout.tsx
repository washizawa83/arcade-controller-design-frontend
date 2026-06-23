import type { Metadata } from "next";
import { Geist, Geist_Mono, Quicksand } from "next/font/google";
import "./globals.css";
import { BaseHeader } from "@/layouts/BaseHeader";
import { BaseFooter } from "@/layouts/BaseFooter";
import { Analytics } from "@vercel/analytics/next";
import Script from "next/script";
import { GoogleAnalyticsScripts } from "@/app/components/GoogleAnalyticsScripts";
import {
  absoluteUrl,
  getSiteUrl,
  SITE_DESCRIPTION,
  SITE_NAME,
} from "@/app/lib/seo";

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
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: "レバーレスコントローラー基板設計ツール | Modern Design",
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "レバーレス",
    "アケコン",
    "レバーレスコントローラー",
    "ホットスワップ",
    "KiCad",
    "基板設計",
    "PCB",
    "自作コントローラー",
    "レバーレス 自作",
    "アケコン 自作",
    "GP2040-CE",
    "Raspberry Pi Pico",
  ],
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: getSiteUrl() }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  openGraph: {
    type: "website",
    url: "/",
    title: "レバーレスコントローラー基板設計ツール | Modern Design",
    description: SITE_DESCRIPTION,
    siteName: SITE_NAME,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Modern Design - レバーレスコントローラー基板設計ツール",
      },
    ],
    locale: "ja_JP",
  },
  twitter: {
    card: "summary_large_image",
    title: "レバーレスコントローラー基板設計ツール | Modern Design",
    description: SITE_DESCRIPTION,
    images: ["/opengraph-image"],
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
        <BaseHeader />
        <main>{children}</main>
        <BaseFooter />
        {/* JSON-LD structured data */}
        <Script type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: SITE_NAME,
            url: getSiteUrl(),
            applicationCategory: "DesignApplication",
            operatingSystem: "Web",
            inLanguage: "ja-JP",
            description: SITE_DESCRIPTION,
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "JPY",
            },
          })}
        </Script>
        <Script type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: SITE_NAME,
            url: getSiteUrl(),
            inLanguage: "ja-JP",
            description: SITE_DESCRIPTION,
          })}
        </Script>
        <Script type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: SITE_NAME,
            url: getSiteUrl(),
            logo: absoluteUrl("/logo.svg"),
          })}
        </Script>
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <GoogleAnalyticsScripts
            measurementId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}
          />
        )}
        <Analytics />
      </body>
    </html>
  );
}
