// EmptyState: what goes in an empty area. An icon tile, a title, one sentence on what will appear, and the action
// that makes it appear.

// ── Dependencies ──────────────────────────
import type { ComponentProps, ReactNode } from "react";
import { cx } from "../shared/cx";

// ── Types ─────────────────────────────────
export interface EmptyStateProps extends Omit<ComponentProps<"div">, "title"> {
  title: ReactNode;
  icon?: ReactNode;
  /** The button (or two) that fills the area. */
  action?: ReactNode;
  /** `warning` when it's empty because something's wrong (a missing folder). */
  tone?: "neutral" | "warning";
}

// ── Public API ────────────────────────────
/** A centered placeholder for an empty list, gallery or panel. */
export function EmptyState({ title, icon, action, tone = "neutral", className, children, ...rest }: EmptyStateProps) {
  return (
    <div className={cx("iro-empty", className)} data-tone={tone} {...rest}>
      {icon ? <span className="iro-empty-icon">{icon}</span> : null}
      <strong className="iro-empty-title">{title}</strong>
      {children ? <p className="iro-empty-text">{children}</p> : null}
      {action ? <div className="iro-empty-action">{action}</div> : null}
    </div>
  );
}
