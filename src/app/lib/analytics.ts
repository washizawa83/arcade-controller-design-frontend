/**
 * Google Analytics (GA4) event helpers.
 * Events are sent only when NEXT_PUBLIC_GA_MEASUREMENT_ID is set and gtag is loaded.
 */

declare global {
  interface Window {
    gtag?: (
      command: "event" | "config" | "js",
      targetId: string,
      params?: Record<string, unknown>
    ) => void;
  }
}

function sendEvent(
  eventName: string,
  params?: Record<string, string | number | boolean>
): void {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", eventName, params);
}

/** 「基板データを生成」ボタンが押された */
export function trackGenerateClick(): void {
  sendEvent("generate_click", { event_category: "board_generate" });
}

/** 基板生成に成功した */
export function trackGenerateSuccess(): void {
  sendEvent("generate_success", { event_category: "board_generate" });
}

/** 基板生成に失敗した */
export function trackGenerateFailure(): void {
  sendEvent("generate_failure", { event_category: "board_generate" });
}
