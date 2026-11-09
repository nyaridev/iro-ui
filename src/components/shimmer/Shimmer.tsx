// Shimmer: text with a light sweeping across it, for "Thinking…" and "Searching…" while work goes on. It's a steady
// loop, so it keeps its pace in every motion mode but off, where the text stays still.

// ── Dependencies ──────────────────────────
import type { ComponentProps } from "react";
import { cx } from "../shared/cx";

// ── Public API ────────────────────────────
/** Text with a sweeping shine. */
export function Shimmer({ className, ...rest }: ComponentProps<"span">) {
  return <span className={cx("iro-shimmer", className)} {...rest} />;
}
