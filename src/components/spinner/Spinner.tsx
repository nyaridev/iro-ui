// Spinner: a turning arc, sized by the surrounding font. With a `label` it announces itself as a status.

// ── Dependencies ──────────────────────────
import type { ComponentProps } from "react";
import { cx } from "../shared/cx";

// ── Types ─────────────────────────────────
export interface SpinnerProps extends ComponentProps<"span"> {
  /** What's loading, for screen readers. Leave it out when the surrounding control already says so. */
  label?: string;
}

// ── Constants ─────────────────────────────
const ARC = (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity="0.25" strokeWidth="2.5" />
    <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

// ── Public API ────────────────────────────
/** A loading spinner in the current text color. */
export function Spinner({ label, className, ...rest }: SpinnerProps) {
  if (label) {
    return (
      <span className={cx("iro-spinner", className)} role="status" aria-label={label} {...rest}>
        {ARC}
      </span>
    );
  }
  return (
    <span className={cx("iro-spinner", className)} aria-hidden="true" {...rest}>
      {ARC}
    </span>
  );
}
