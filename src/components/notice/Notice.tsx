// Notice: an inline message in a status tone, with what to do about it. Danger notices are announced as alerts.

// ── Dependencies ──────────────────────────
import type { ComponentProps, ReactNode } from "react";
import { cx } from "../shared/cx";
import { DangerGlyph, InfoGlyph, SuccessGlyph, WarningGlyph } from "../shared/glyphs";

// ── Constants ─────────────────────────────
const ICONS = {
  info: <InfoGlyph />,
  success: <SuccessGlyph />,
  warning: <WarningGlyph />,
  danger: <DangerGlyph />,
};

// ── Types ─────────────────────────────────
export interface NoticeProps extends Omit<ComponentProps<"div">, "title"> {
  /** `info`: something to know or pick. `warning`: something missing. `danger`: something broken. */
  tone?: "info" | "success" | "warning" | "danger";
  title?: ReactNode;
  /** Replaces the tone's icon. */
  icon?: ReactNode;
  /** The buttons that fix it. */
  actions?: ReactNode;
}

// ── Public API ────────────────────────────
/** An inline message with an icon, text and optional actions. */
export function Notice({ tone = "info", title, icon, actions, className, children, ...rest }: NoticeProps) {
  return (
    <div
      role={tone === "danger" ? "alert" : "status"}
      data-tone={tone}
      className={cx("iro-notice", className)}
      {...rest}
    >
      <span className="iro-notice-icon">{icon ?? ICONS[tone]}</span>
      <div className="iro-notice-body">
        {title ? <strong className="iro-notice-title">{title}</strong> : null}
        {children ? <div className="iro-notice-text">{children}</div> : null}
        {actions ? <div className="iro-notice-actions">{actions}</div> : null}
      </div>
    </div>
  );
}
