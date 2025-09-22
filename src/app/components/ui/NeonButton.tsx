import React from "react";

type Props = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  variant?: "primary" | "secondary";
  color?: "pink" | "green";
  className?: string;
};

export const NeonButton = ({
  children,
  onClick,
  type = "button",
  disabled,
  variant = "secondary",
  color = "pink",
  className = "",
}: Props) => {
  const base =
    "shrink-0 text-center rounded-md px-3 py-2 text-xs transition-colors disabled:opacity-50";
  const palette =
    color === "green"
      ? {
          primary:
            "border border-emerald-500/40 bg-emerald-500/15 text-emerald-200 shadow-[0_0_8px_rgba(16,185,129,0.35)] hover:border-emerald-400 hover:bg-emerald-500/25 hover:text-emerald-100",
          secondary:
            "border border-emerald-500/30 bg-[rgba(15,23,42,0.6)] text-slate-200 shadow-[0_0_6px_rgba(16,185,129,0.25)] hover:border-emerald-400 hover:text-emerald-200",
        }
      : {
          primary:
            "border border-pink-500/40 bg-pink-500/15 text-pink-200 shadow-[0_0_8px_rgba(255,53,93,0.35)] hover:border-pink-400 hover:bg-pink-500/25 hover:text-pink-100",
          secondary:
            "border border-pink-500/30 bg-[rgba(15,23,42,0.6)] text-slate-200 shadow-[0_0_6px_rgba(255,53,93,0.25)] hover:border-pink-400 hover:text-pink-200",
        };
  const styles = variant === "primary" ? palette.primary : palette.secondary;
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${styles} ${className}`}
    >
      {children}
    </button>
  );
};
