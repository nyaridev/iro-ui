// Panel: a raised card for a region of a page (a settings group, a file's details). Give it padding with `className`
// or the default `padded`; put a SectionTitle at its top.

// ── Dependencies ──────────────────────────
import type { ComponentProps } from "react";
import { cx } from "../shared/cx";

// ── Types ─────────────────────────────────
export interface PanelProps extends ComponentProps<"div"> {
  /** The element: a `section` or `aside` when the panel is a landmark. */
  as?: "div" | "section" | "aside";
  /** Inner padding (default true). */
  padded?: boolean;
}

// ── Public API ────────────────────────────
/** A card-like surface with a border and the style's card shadow. */
export function Panel({ as: Element = "div", padded = true, className, ...rest }: PanelProps) {
  return <Element data-padded={padded || undefined} className={cx("iro-panel", className)} {...rest} />;
}
