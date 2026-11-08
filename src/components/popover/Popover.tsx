// Popover: a small panel that opens from a trigger on click and holds anything (a form, a picker, details).
// Esc or a click outside closes it.

// ── Dependencies ──────────────────────────
import { Popover as BasePopover } from "@base-ui/react/popover";
import type { ReactElement, ReactNode } from "react";
import { useIroLayer } from "../../root/IroRoot";
import { cx } from "../shared/cx";

// ── Constants ─────────────────────────────
const OFFSET = 6;

// ── Types ─────────────────────────────────
export interface PopoverProps {
  /** The element that opens it: a Button, an IconButton… */
  trigger: ReactElement;
  /** A heading at the top of the panel; it also names the panel for screen readers. */
  title?: ReactNode;
  children: ReactNode;
  side?: "top" | "bottom" | "left" | "right";
  align?: "start" | "center" | "end";
  /** Controlled open state; leave both out to let the popover manage it. */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Goes on the panel. */
  className?: string;
}

// ── Public API ────────────────────────────
/** A click-to-open panel anchored to `trigger`. */
export function Popover({
  trigger,
  title,
  children,
  side = "bottom",
  align = "center",
  open,
  onOpenChange,
  className,
}: PopoverProps) {
  const layer = useIroLayer();
  return (
    <BasePopover.Root open={open} onOpenChange={onOpenChange ? (next) => onOpenChange(next) : undefined}>
      <BasePopover.Trigger render={trigger} />
      <BasePopover.Portal container={layer}>
        <BasePopover.Positioner side={side} align={align} sideOffset={OFFSET} className="iro-positioner">
          <BasePopover.Popup className={cx("iro-popup", "iro-popover", className)}>
            {title ? <BasePopover.Title className="iro-popover-title">{title}</BasePopover.Title> : null}
            {children}
          </BasePopover.Popup>
        </BasePopover.Positioner>
      </BasePopover.Portal>
    </BasePopover.Root>
  );
}
