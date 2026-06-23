import type { Metadata } from "next";

export const SITE_NAME = "Modern Design";
export const SITE_DESCRIPTION =
  "レバーレスコントローラーのボタン配置をブラウザで設計し、KiCadプロジェクトを生成できる自作アケコン向け基板設計ツールです。";

const ensureProtocol = (url: string) =>
  /^https?:\/\//.test(url) ? url : `https://${url}`;

const trimTrailingSlash = (url: string) => url.replace(/\/+$/, "");

export const getSiteUrl = () => {
  const rawUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.VERCEL_PROJECT_PRODUCTION_URL ||
    process.env.VERCEL_URL ||
    "http://localhost:3000";

  return trimTrailingSlash(ensureProtocol(rawUrl));
};

export const absoluteUrl = (path = "/") => {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  return `${getSiteUrl()}${normalizedPath}`;
};

type PageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  noIndex?: boolean;
};

export const createPageMetadata = ({
  title,
  description,
  path,
  noIndex = false,
}: PageMetadataOptions): Metadata => ({
  title,
  description,
  alternates: {
    canonical: path,
  },
  openGraph: {
    type: "website",
    url: path,
    title: `${title} | ${SITE_NAME}`,
    description,
    siteName: SITE_NAME,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} - レバーレスコントローラー基板設計ツール`,
      },
    ],
    locale: "ja_JP",
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} | ${SITE_NAME}`,
    description,
    images: ["/opengraph-image"],
  },
  robots: noIndex
    ? {
        index: false,
        follow: true,
      }
    : undefined,
});
