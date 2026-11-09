// Marker: a line across the conversation with a label in the middle: a checkpoint to go back to, "Earlier messages
// summarized", a new day. It can carry an action (Restore).

// ── Dependencies ──────────────────────────
import type { ComponentProps, ReactNode } from "react";
import { cx } from "../shared/cx";

// ── Types ─────────────────────────────────
export interface MarkerProps extends ComponentProps<"div"> {
  /** Before the label. */
  icon?: ReactNode;
  /** After the label: a small ghost button. */
  action?: ReactNode;
}

// ── Public API ────────────────────────────
/** A labelled line across a conversation. */
export function Marker({ icon, action, className, children, ...rest }: MarkerProps) {
  return (
    <div className={cx("iro-marker", className)} {...rest}>
      <span className="iro-marker-label">
        {icon}
        {children}
        {action}
      </span>
    </div>
  );
}
