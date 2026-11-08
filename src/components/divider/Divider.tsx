// Divider: a hairline between groups, across or (`vertical`) between items in a row. Base UI's separator.

// ── Dependencies ──────────────────────────
import { Separator } from "@base-ui/react/separator";
import { cx } from "../shared/cx";

// ── Types ─────────────────────────────────
export interface DividerProps {
  orientation?: "horizontal" | "vertical";
  className?: string;
}

// ── Public API ────────────────────────────
/** A 1 px line in the style's line color. */
export function Divider({ orientation = "horizontal", className }: DividerProps) {
  return <Separator orientation={orientation} className={cx("iro-divider", className)} />;
}
