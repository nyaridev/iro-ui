// Badge: a small label that marks something's kind or state. Pair a status tone with a word, never color alone.

// ── Dependencies ──────────────────────────
import type { ComponentProps, ReactNode } from "react";
import { cx } from "../shared/cx";

// ── Types ─────────────────────────────────
export interface BadgeProps extends ComponentProps<"span"> {
  tone?: "neutral" | "accent" | "success" | "warning" | "danger" | "info";
  icon?: ReactNode;
}

// ── Public API ────────────────────────────
/** A small tinted label. */
export function Badge({ tone = "neutral", icon, className, children, ...rest }: BadgeProps) {
  return (
    <span className={cx("iro-badge", className)} data-tone={tone} {...rest}>
      {icon}
      {children}
    </span>
  );
}
