// Button: the one text button, in five variants and three sizes. `pressed` makes it a toggle.

// ── Dependencies ──────────────────────────
import type { ComponentProps, ReactNode } from "react";
import { cx } from "../shared/cx";
import { Spinner } from "../spinner/Spinner";

// ── Types ─────────────────────────────────
export interface ButtonProps extends ComponentProps<"button"> {
  /** `primary` for the main action, `secondary` (default) for the rest, `danger` for destructive ones. */
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  /** An icon before the text. */
  icon?: ReactNode;
  /** An icon after the text (a chevron, an external-link mark). */
  iconEnd?: ReactNode;
  /** Working: a spinner in place of the icon, and no clicks until it's done. */
  loading?: boolean;
  /** Makes it a toggle (`aria-pressed`): a tinted fill while on. */
  pressed?: boolean;
}

// ── Public API ────────────────────────────
/** A button with text, and optionally icons. */
export function Button({
  variant = "secondary",
  size = "md",
  icon,
  iconEnd,
  loading = false,
  pressed,
  disabled,
  type = "button",
  className,
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      aria-pressed={pressed}
      aria-busy={loading || undefined}
      data-variant={variant}
      data-size={size}
      className={cx("iro-button", className)}
      {...rest}
    >
      {loading ? <Spinner /> : icon}
      {children}
      {iconEnd}
    </button>
  );
}
