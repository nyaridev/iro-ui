// Tooltip: a short hint that appears when its trigger is hovered or focused. It opens inside the nearest IroRoot, so it
// keeps that root's style.

// ── Dependencies ──────────────────────────
import { Tooltip as BaseTooltip } from "@base-ui/react/tooltip";
import type { ReactElement, ReactNode } from "react";
import { useIroLayer } from "../../root/IroRoot";
import { cx } from "../shared/cx";

// ── Constants ─────────────────────────────
const OFFSET = 6;

// ── Types ─────────────────────────────────
export interface TooltipProps {
  /** What the tooltip says. */
  content: ReactNode;
  /** The trigger: one element that takes a ref and passes props to the DOM (any iro-ui control does). */
  children: ReactElement;
  side?: "top" | "bottom" | "left" | "right";
  /** Milliseconds of hover before it opens. */
  delay?: number;
  disabled?: boolean;
  className?: string;
}

// ── Public API ────────────────────────────
/** Shows `content` next to its child on hover and keyboard focus. */
export function Tooltip({ content, children, side = "top", delay = 500, disabled, className }: TooltipProps) {
  const layer = useIroLayer();
  return (
    <BaseTooltip.Root disabled={disabled}>
      <BaseTooltip.Trigger delay={delay} render={children} />
      <BaseTooltip.Portal container={layer}>
        <BaseTooltip.Positioner side={side} sideOffset={OFFSET} className="iro-positioner">
          <BaseTooltip.Popup className={cx("iro-popup", "iro-tooltip", className)}>{content}</BaseTooltip.Popup>
        </BaseTooltip.Positioner>
      </BaseTooltip.Portal>
    </BaseTooltip.Root>
  );
}
