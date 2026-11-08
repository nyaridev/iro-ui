// Skeleton: a placeholder block while something loads. It stays hidden for 300 ms, so quick answers never flash one,
// then pulses slowly (`data-iro-animate="pulse"`).

// ── Dependencies ──────────────────────────
import type { ComponentProps, CSSProperties } from "react";
import { cx } from "../shared/cx";

// ── Types ─────────────────────────────────
export interface SkeletonProps extends ComponentProps<"span"> {
  /** CSS width: `120`, `"60%"`. Default: the full row. */
  width?: CSSProperties["width"];
  /** CSS height; default one line of text. */
  height?: CSSProperties["height"];
  /** `circle` for avatars. */
  shape?: "block" | "circle";
}

// ── Public API ────────────────────────────
/** A pulsing placeholder the size of what's coming. */
export function Skeleton({ width, height, shape = "block", className, style, ...rest }: SkeletonProps) {
  return (
    <span
      aria-hidden="true"
      data-iro-animate="pulse"
      data-shape={shape}
      className={cx("iro-skeleton", className)}
      style={{ width, height, ...style }}
      {...rest}
    />
  );
}
