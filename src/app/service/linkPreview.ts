"use server";

export type LinkPreviewData = {
  url: string;
  title?: string;
  description?: string;
  image?: string;
};

const decodeEntities = (s: string) =>
  s
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");

const extractMeta = (html: string, keys: string[]): string | undefined => {
  for (const key of keys) {
    const og = html.match(
      new RegExp(
        `<meta[^>]+property=["']${key}["'][^>]+content=["']([^"']+)["']`,
        "i"
      )
    );
    if (og?.[1]) return decodeEntities(og[1]);
    const name = html.match(
      new RegExp(
        `<meta[^>]+name=["']${key}["'][^>]+content=["']([^"']+)["']`,
        "i"
      )
    );
    if (name?.[1]) return decodeEntities(name[1]);
  }
  return undefined;
};

export const fetchLinkPreview = async (
  url: string
): Promise<LinkPreviewData | null> => {
  try {
    const res = await fetch(url, {
      method: "GET",
      // A common UA to avoid 403 on some sites; works best-effort only
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
      },
      cache: "no-store",
    });
    if (!res.ok) return { url };
    const html = await res.text();
    const title =
      extractMeta(html, ["og:title", "twitter:title"]) ||
      (html.match(/<title>([^<]+)<\/title>/i)?.[1] ?? undefined);
    const description = extractMeta(html, [
      "og:description",
      "twitter:description",
      "description",
    ]);
    let image = extractMeta(html, [
      "og:image:secure_url",
      "og:image",
      "twitter:image",
      "twitter:image:src",
    ]);

    // Fallback for Amazon: parse landing image attributes if OG is missing
    if (!image) {
      const dataOld = html.match(
        /<img[^>]*id=["']landingImage["'][^>]*data-old-hires=["']([^"']+)["'][^>]*>/i
      );
      if (dataOld?.[1]) {
        image = decodeEntities(dataOld[1]);
      } else {
        const dyn = html.match(/data-a-dynamic-image=["']({[^"']+})["']/i);
        if (dyn?.[1]) {
          try {
            const obj = JSON.parse(
              decodeEntities(dyn[1]).replace(/&quot;/g, '"')
            );
            const firstUrl = Object.keys(obj)[0];
            if (firstUrl) image = firstUrl;
          } catch {
            // ignore
          }
        }
      }
    }
    return { url, title, description, image };
  } catch {
    return { url };
  }
};
