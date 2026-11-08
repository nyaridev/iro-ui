// Collapsible: a section with a header that opens and closes its body. The header shows a summary while closed, and
// can carry an on/off switch for sections that can be turned off (a stage, an optional pass).

// ── Dependencies ──────────────────────────
import { Collapsible as BaseCollapsible } from "@base-ui/react/collapsible";
import type { ReactNode } from "react";
import { cx } from "../shared/cx";
import { ChevronDownGlyph } from "../shared/glyphs";
import { Switch } from "../switch/Switch";

// ── Types ─────────────────────────────────
export interface CollapsibleProps {
  title: ReactNode;
  /** A short line after the title: what's set inside ("4 steps · 0.35"). */
  summary?: ReactNode;
  children: ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Adds an on/off switch to the header; while off, the section dims. */
  enabled?: boolean;
  onEnabledChange?: (enabled: boolean) => void;
  /** Accessible name of the switch. */
  enabledLabel?: string;
  /** `surface` (default): a raised card. `inset`: a sunken well, for sections inside cards. */
  tone?: "surface" | "inset";
  className?: string;
}

// ── Public API ────────────────────────────
/** An openable section with a header, an optional summary and an optional on/off switch. */
export function Collapsible({
  title,
  summary,
  children,
  open,
  defaultOpen,
  onOpenChange,
  enabled,
  onEnabledChange,
  enabledLabel = "Enabled",
  tone = "surface",
  className,
}: CollapsibleProps) {
  return (
    <BaseCollapsible.Root
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange ? (next) => onOpenChange(next) : undefined}
      data-tone={tone}
      data-off={enabled === false || undefined}
      className={cx("iro-collapsible", className)}
    >
      <div className="iro-collapsible-header">
        <BaseCollapsible.Trigger className="iro-collapsible-trigger">
          <ChevronDownGlyph />
          <span className="iro-collapsible-title">{title}</span>
          {summary ? <span className="iro-collapsible-summary">{summary}</span> : null}
        </BaseCollapsible.Trigger>
        {enabled === undefined ? null : (
          <Switch size="sm" checked={enabled} onCheckedChange={onEnabledChange} aria-label={enabledLabel} />
        )}
      </div>
      <BaseCollapsible.Panel className="iro-collapsible-panel">
        <div className="iro-collapsible-body">{children}</div>
      </BaseCollapsible.Panel>
    </BaseCollapsible.Root>
  );
}
