// IconButton: a square button with only an icon. `label` is required: it's the accessible name.

// ── Dependencies ──────────────────────────
import type { ComponentProps, ReactNode } from "react";
import { Kbd } from "../kbd/Kbd";
import { cx } from "../shared/cx";
import { Spinner } from "../spinner/Spinner";
import { Tooltip } from "../tooltip/Tooltip";

// ── Types ─────────────────────────────────
export interface IconButtonProps extends Omit<ComponentProps<"button">, "children"> {
  icon: ReactNode;
  /** What the button does. Required: it's the accessible name and the tooltip. */
  label: string;
  /** A keyboard shortcut shown in the tooltip: `"Ctrl K"`. */
  shortcut?: string;
  /** Show `label` as a tooltip on hover and focus (default true). */
  tooltip?: boolean;
  variant?: "ghost" | "secondary" | "primary" | "danger";
  size?: "sm" | "md" | "lg";
  /** On, for toggles: accent icon on a field fill (`aria-pressed`). */
  active?: boolean;
  /** Working: a spinner in place of the icon, and no clicks until it's done. */
  loading?: boolean;
}

// ── Public API ────────────────────────────
/** A button that shows only an icon, with its label as a tooltip. */
export function IconButton({
  icon,
  label,
  shortcut,
  tooltip = true,
  variant = "ghost",
  size = "md",
  active,
  loading = false,
  disabled,
  type = "button",
  className,
  ...rest
}: IconButtonProps) {
  const button = (
    <button
      type={type}
      aria-label={label}
      aria-pressed={active}
      aria-busy={loading || undefined}
      disabled={disabled || loading}
      data-variant={variant}
      data-size={size}
      className={cx("iro-icon-button", className)}
      {...rest}
    >
      {loading ? <Spinner /> : icon}
    </button>
  );
  if (!tooltip) return button;
  return (
    <Tooltip
      content={
        <>
          {label}
          {shortcut ? <Kbd>{shortcut}</Kbd> : null}
        </>
      }
    >
      {button}
    </Tooltip>
  );
}
