"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  fetchLinkPreview,
  type LinkPreviewData,
} from "@/app/service/linkPreview";

type Props = {
  url: string;
  label?: string;
  className?: string;
};

export const LinkPreview = ({ url, label, className = "" }: Props) => {
  const [data, setData] = useState<LinkPreviewData | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const res = await fetchLinkPreview(url);
      if (!mounted) return;
      setData(res);
      setLoaded(true);
    })();
    return () => {
      mounted = false;
    };
  }, [url]);

  // Fallback to simple link while loading or if no preview info available
  const title = data?.title || label || url;
  const desc = data?.description;
  const img = data?.image;

  return (
    <Link
      href={url}
      target="_blank"
      rel="noreferrer"
      className={`group block rounded-lg border border-pink-500/30 bg-[rgba(15,23,42,0.6)] p-3 shadow-[0_0_8px_rgba(255,53,93,0.2)] transition hover:border-pink-400 ${className}`}
    >
      <div className="flex gap-3 items-start">
        {img ? (
          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md border border-pink-500/20 bg-slate-900/20">
            <img
              src={img}
              alt={title}
              className="h-full w-full object-cover"
              referrerPolicy="no-referrer"
              loading="lazy"
            />
          </div>
        ) : (
          <div className="h-16 w-16 shrink-0 rounded-md border border-pink-500/20 bg-slate-900/20" />
        )}
        <div className="min-w-0">
          <p className="text-sm font-semibold text-slate-100 group-hover:text-pink-300 transition line-clamp-2">
            {title}
          </p>
          {desc ? (
            <p className="mt-1 text-xs text-slate-300 line-clamp-2">{desc}</p>
          ) : null}
          <p className="mt-1 text-[10px] text-pink-300/70 truncate">{url}</p>
        </div>
      </div>
      {!loaded && (
        <div className="mt-2 h-0.5 w-full overflow-hidden rounded bg-pink-500/10">
          <div className="h-full w-1/3 animate-pulse rounded bg-pink-400/40" />
        </div>
      )}
    </Link>
  );
};
