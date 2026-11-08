// CountBubble: a small count in a bubble (unread, failed, waiting). Past `max` it reads "99+"; at zero it isn't drawn.
// `corner` pins it to the top-right corner of its parent, which needs `position: relative` (an IconButton has it).

// ── Dependencies ──────────────────────────
import type { ComponentProps } from "react";
import { cx } from "../shared/cx";

// ── Types ─────────────────────────────────
export interface CountBubbleProps extends Omit<ComponentProps<"span">, "children"> {
  count: number;
  /** The largest number shown before "+" (default 99). */
  max?: number;
  /** `danger` (default) for things that need a look, `accent` for plain counts. */
  tone?: "danger" | "accent";
  /** Sit on the parent's top-right corner. */
  corner?: boolean;
}

// ── Public API ────────────────────────────
/** A count bubble; nothing when the count is zero or less. */
export function CountBubble({ count, max = 99, tone = "danger", corner, className, ...rest }: CountBubbleProps) {
  if (count <= 0) return null;
  return (
    <span data-tone={tone} data-corner={corner || undefined} className={cx("iro-count-bubble", className)} {...rest}>
      {count > max ? `${max}+` : count}
    </span>
  );
}
