// Reasoning: what the assistant thought before answering, folded under one line. While it streams the line shimmers
// "Thinking…" and the body is open; once done it says how long it took and folds, unless the reader opened or closed
// it themselves. Base UI's collapsible does the folding.

// ── Dependencies ──────────────────────────
import { Collapsible as BaseCollapsible } from "@base-ui/react/collapsible";
import { type ReactNode, useEffect, useState } from "react";
import { cx } from "../shared/cx";
import { ChevronDownGlyph, LightbulbGlyph } from "../shared/glyphs";
import { Shimmer } from "../shimmer/Shimmer";

// ── Types ─────────────────────────────────
export interface ReasoningProps {
  /** The thinking: text, or rendered Markdown in a `Prose`. */
  children: ReactNode;
  /** Still thinking: the line shimmers and the body stays open. */
  streaming?: boolean;
  /** How long it took, in seconds, for the line once done. */
  duration?: number;
  /** The line's words (default "Thinking…", then "Thought for 12 s"). */
  label?: (streaming: boolean, duration?: number) => string;
  className?: string;
}

// ── Private helpers ───────────────────────
const defaultLabel = (streaming: boolean, duration?: number) =>
  streaming ? "Thinking…" : duration !== undefined ? `Thought for ${Math.round(duration)} s` : "Thought";

// ── Public API ────────────────────────────
/** A folding block of the assistant's reasoning. */
export function Reasoning({ children, streaming = false, duration, label = defaultLabel, className }: ReasoningProps) {
  const [open, setOpen] = useState(streaming);
  const [touched, setTouched] = useState(false);
  // Follows the stream (open while thinking, folded after) until the reader takes over.
  useEffect(() => {
    if (!touched) setOpen(streaming);
  }, [streaming, touched]);

  const text = label(streaming, duration);
  return (
    <BaseCollapsible.Root
      open={open}
      onOpenChange={(next) => {
        setTouched(true);
        setOpen(next);
      }}
      className={cx("iro-reasoning", className)}
    >
      <BaseCollapsible.Trigger className="iro-reasoning-trigger">
        <LightbulbGlyph />
        {streaming ? <Shimmer>{text}</Shimmer> : <span>{text}</span>}
        <ChevronDownGlyph />
      </BaseCollapsible.Trigger>
      <BaseCollapsible.Panel className="iro-reasoning-panel">
        <div className="iro-reasoning-body">{children}</div>
      </BaseCollapsible.Panel>
    </BaseCollapsible.Root>
  );
}
