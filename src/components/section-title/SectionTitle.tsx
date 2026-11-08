// SectionTitle: the small caps heading above a group of settings or a list, with an optional icon before it and
// actions at its end.

// ── Dependencies ──────────────────────────
import type { ComponentProps, ReactNode } from "react";
import { cx } from "../shared/cx";

// ── Types ─────────────────────────────────
export interface SectionTitleProps extends Omit<ComponentProps<"div">, "title"> {
  icon?: ReactNode;
  /** Buttons at the end of the row: "Reset", a ⋯ menu. */
  actions?: ReactNode;
  /** The heading level (default 3). */
  level?: 2 | 3 | 4;
}

// ── Public API ────────────────────────────
/** An uppercase section heading with an icon and actions. */
export function SectionTitle({ icon, actions, level = 3, className, children, ...rest }: SectionTitleProps) {
  const Heading = `h${level}` as const;
  return (
    <div className={cx("iro-section-title", className)} {...rest}>
      {icon ? <span className="iro-section-title-icon">{icon}</span> : null}
      <Heading className="iro-section-title-text">{children}</Heading>
      {actions}
    </div>
  );
}
