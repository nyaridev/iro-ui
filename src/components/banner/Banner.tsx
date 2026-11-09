// Banner: a full-width strip at the top of an app or page for news that concerns everything under it (a new
// version, an outage, a trial ending), with an action and a close button. For a message about one part, use Notice.

// ── Dependencies ──────────────────────────
import type { ComponentProps, ReactNode } from "react";
import { IconButton } from "../icon-button/IconButton";
import { cx } from "../shared/cx";
import { CloseGlyph, DangerGlyph, InfoGlyph, SuccessGlyph, WarningGlyph } from "../shared/glyphs";

// ── Constants ─────────────────────────────
const ICONS = {
  accent: null,
  info: <InfoGlyph />,
  success: <SuccessGlyph />,
  warning: <WarningGlyph />,
  danger: <DangerGlyph />,
};

// ── Types ─────────────────────────────────
export interface BannerProps extends ComponentProps<"div"> {
  /** `accent` (default) for news, the status tones for the state of things. */
  tone?: "accent" | "info" | "success" | "warning" | "danger";
  /** Replaces the tone's icon (the accent tone has none). */
  icon?: ReactNode;
  /** After the text: a link or a small button. */
  actions?: ReactNode;
  /** Adds a × button that calls this. */
  onDismiss?: () => void;
  /** Accessible name of the × button. */
  dismissLabel?: string;
}

// ── Public API ────────────────────────────
/** A full-width message with an optional action and close button. */
export function Banner({
  tone = "accent",
  icon,
  actions,
  onDismiss,
  dismissLabel = "Dismiss",
  className,
  children,
  ...rest
}: BannerProps) {
  const shown = icon ?? ICONS[tone];
  return (
    <div
      role={tone === "danger" ? "alert" : "status"}
      data-tone={tone}
      className={cx("iro-banner", className)}
      {...rest}
    >
      <div className="iro-banner-content">
        {shown ? <span className="iro-banner-icon">{shown}</span> : null}
        <span className="iro-banner-text">{children}</span>
        {actions ? <span className="iro-banner-actions">{actions}</span> : null}
      </div>
      {onDismiss ? (
        <IconButton size="sm" icon={<CloseGlyph />} label={dismissLabel} tooltip={false} onClick={onDismiss} />
      ) : null}
    </div>
  );
}
