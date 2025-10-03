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
  title: "Generate Arcade Controller Design",
  description: "Generate Arcade Controller Design",
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
