// Chip: a small tag. With `onClick` it toggles (filters); with `onRemove` it gets a × (picked tags).

// ── Dependencies ──────────────────────────
import type { ComponentProps, ReactNode } from "react";
import { cx } from "../shared/cx";
import { CloseGlyph } from "../shared/glyphs";

// ── Types ─────────────────────────────────
export interface ChipProps extends Omit<ComponentProps<"span">, "onClick"> {
  icon?: ReactNode;
  /** A small number after the text: how many items match. */
  count?: ReactNode;
  /** On, for filter chips (`aria-pressed`). */
  selected?: boolean;
  /** Makes the chip a toggle button. */
  onClick?: () => void;
  /** Adds a × button that calls this. */
  onRemove?: () => void;
  /** Accessible name of the × button. */
  removeLabel?: string;
  size?: "sm" | "md" | "lg";
}

// ── Public API ────────────────────────────
/** A tag, optionally clickable and removable. */
export function Chip({
  icon,
  count,
  selected,
  onClick,
  onRemove,
  removeLabel = "Remove",
  size = "md",
  className,
  children,
  ...rest
}: ChipProps) {
  const content = (
    <>
      {icon}
      {children}
      {count != null ? <span className="iro-chip-count">{count}</span> : null}
    </>
  );

  return (
    <span className={cx("iro-chip", className)} data-size={size} data-selected={selected || undefined} {...rest}>
      {onClick ? (
        <button type="button" className="iro-chip-main" aria-pressed={selected} onClick={onClick}>
          {content}
        </button>
      ) : (
        <span className="iro-chip-main">{content}</span>
      )}
      {onRemove ? (
        <button type="button" className="iro-chip-remove" aria-label={removeLabel} onClick={onRemove}>
          <CloseGlyph />
        </button>
      ) : null}
    </span>
  );
}
