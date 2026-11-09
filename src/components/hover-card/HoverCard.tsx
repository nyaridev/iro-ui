// HoverCard: a preview that opens while the pointer rests on a link (a person, a page, an issue) or it has focus, and
// stays while the pointer moves into it. For a short label, use Tooltip; for something to act on, Popover.

// ── Dependencies ──────────────────────────
import { PreviewCard } from "@base-ui/react/preview-card";
import type { ReactElement, ReactNode } from "react";
import { useIroLayer } from "../../root/IroRoot";
import { cx } from "../shared/cx";

// ── Constants ─────────────────────────────
const OFFSET = 8;

// ── Types ─────────────────────────────────
export interface HoverCardProps {
  /** The link it previews: an `<a>` (Base UI renders the trigger as a link). */
  trigger: ReactElement;
  children: ReactNode;
  side?: "top" | "bottom" | "left" | "right";
  align?: "start" | "center" | "end";
  /** Milliseconds of rest before it opens (default 600). */
  delay?: number;
  /** Goes on the card. */
  className?: string;
}

// ── Public API ────────────────────────────
/** A card that previews a link on hover and focus. */
export function HoverCard({
  trigger,
  children,
  side = "bottom",
  align = "center",
  delay = 600,
  className,
}: HoverCardProps) {
  const layer = useIroLayer();
  return (
    <PreviewCard.Root>
      <PreviewCard.Trigger render={trigger} delay={delay} />
      <PreviewCard.Portal container={layer}>
        <PreviewCard.Positioner side={side} align={align} sideOffset={OFFSET} className="iro-positioner">
          <PreviewCard.Popup className={cx("iro-popup", "iro-hover-card", className)}>{children}</PreviewCard.Popup>
        </PreviewCard.Positioner>
      </PreviewCard.Portal>
    </PreviewCard.Root>
  );
}
