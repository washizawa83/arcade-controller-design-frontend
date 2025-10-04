import type { Metadata } from "next";
import { Geist, Geist_Mono, Quicksand } from "next/font/google";
import "./globals.css";
import { BaseHeader } from "@/layouts/BaseHeader";
import { BaseFooter } from "@/layouts/BaseFooter";
import { Analytics } from "@vercel/analytics/next";

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
  title: "Modern Design",
  description:
    "自作薄型レバーレスコントローラーの作成をサポートするサービスです。ボタン配置をドラッグ＆ドロップで直感的にデザインすることができます。理想のボタンレイアウトが完成したらワンボタンで基板の設計を行うことなくホットスワップ可能なレバーレスコントローラーのCADデータを生成することができます。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${brandFont.variable} antialiased`}
      >
        <main>
          <BaseHeader />
          {children}
          <BaseFooter />
        </main>
        <Analytics />
      </body>
    </html>
  );
}
