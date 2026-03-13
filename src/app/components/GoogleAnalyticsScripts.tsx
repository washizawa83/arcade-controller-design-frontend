"use client";

import { useId } from "react";
import Script from "next/script";

type Props = {
  measurementId: string;
};

export function GoogleAnalyticsScripts({ measurementId }: Props) {
  const scriptId = useId();
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id={scriptId} strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${measurementId}');
        `}
      </Script>
    </>
  );
}
