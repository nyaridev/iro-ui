// ButtonGroup: buttons (and fields, selects) joined into one control, sharing their borders: a split button, a
// pager, a field with a button at its end. For picking one of a few options, use Segmented.

// ── Dependencies ──────────────────────────
import type { ComponentProps } from "react";
import { cx } from "../shared/cx";

// ── Types ─────────────────────────────────
export interface ButtonGroupProps extends ComponentProps<"div"> {
  /** `horizontal` (default) or `vertical`. */
  orientation?: "horizontal" | "vertical";
}

// ── Public API ────────────────────────────
/** Joins its buttons into one row or column. */
export function ButtonGroup({ orientation = "horizontal", className, ...rest }: ButtonGroupProps) {
  return (
    // biome-ignore lint/a11y/useSemanticElements: a fieldset is for form fields; this groups buttons.
    <div role="group" data-orientation={orientation} className={cx("iro-button-group", className)} {...rest} />
  );
}
