"use client";

import { NeonButton } from "./NeonButton";

type Props = {
  open: boolean;
  title?: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  busy?: boolean;
};

export const ConfirmDialog = ({
  open,
  title = "確認",
  message,
  confirmLabel = "OK",
  cancelLabel = "キャンセル",
  onConfirm,
  onCancel,
  busy = false,
}: Props) => {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center"
      role="dialog"
      aria-modal="true"
    >
      {/* overlay */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
        onClick={onCancel}
        aria-hidden="true"
      />
      {/* panel */}
      <div className="relative mx-4 w-full max-w-md rounded-xl border border-pink-500/30 bg-[rgba(15,23,42,0.95)] p-5 shadow-[0_0_20px_rgba(255,53,93,0.25)] ring-1 ring-pink-500/20">
        {title ? (
          <h2 className="text-base font-semibold text-slate-100">{title}</h2>
        ) : null}
        <p className="mt-2 text-sm text-slate-300 leading-relaxed">{message}</p>
        <div className="mt-5 flex justify-end gap-2">
          <NeonButton onClick={onCancel} className="min-w-24">
            {cancelLabel}
          </NeonButton>
          <NeonButton
            onClick={onConfirm}
            variant="primary"
            color="green"
            disabled={busy}
            className="min-w-28"
          >
            {busy ? (
              <span className="inline-flex items-center gap-2">
                <span className="inline-block h-3 w-3 animate-spin rounded-full border-2 border-emerald-200 border-t-transparent" />
                実行中...
              </span>
            ) : (
              confirmLabel
            )}
          </NeonButton>
        </div>
      </div>
    </div>
  );
};
