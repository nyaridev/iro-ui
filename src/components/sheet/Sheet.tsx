// Sheet: a side panel that slides in over the page from the left or right, with Dialog's focus trap and dismissal.
// For narrow screens' sidebars and for details panels.

// ── Dependencies ──────────────────────────
import { Dialog as BaseDialog } from "@base-ui/react/dialog";
import { type ReactElement, type ReactNode, useRef } from "react";
import { useIroLayer } from "../../root/IroRoot";
import { IconButton } from "../icon-button/IconButton";
import { ResizeGrip } from "../resize-grip/ResizeGrip";
import { cx } from "../shared/cx";
import { CloseGlyph } from "../shared/glyphs";

// ── Types ─────────────────────────────────
export interface SheetProps {
  title: ReactNode;
  children?: ReactNode;
  /** Buttons in the header, just before the × button: "Open in browser", "Refresh". */
  actions?: ReactNode;
  side?: "left" | "right";
  /** A grip along its inner edge: drag or arrow keys to change the width, double-click to go back to the default. */
  resizable?: boolean;
  /** The element that opens it; leave it out and control `open` instead. */
  trigger?: ReactElement;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Accessible name of the × button. */
  closeLabel?: string;
  /** Goes on the panel. */
  className?: string;
}

// ── Public API ────────────────────────────
/** A modal side panel. */
export function Sheet({
  title,
  children,
  actions,
  side = "right",
  resizable = false,
  trigger,
  open,
  onOpenChange,
  closeLabel = "Close",
  className,
}: SheetProps) {
  const layer = useIroLayer();
  const panel = useRef<HTMLDivElement>(null);
  return (
    <BaseDialog.Root open={open} onOpenChange={onOpenChange ? (next) => onOpenChange(next) : undefined}>
      {trigger ? <BaseDialog.Trigger render={trigger} /> : null}
      <BaseDialog.Portal container={layer}>
        <BaseDialog.Backdrop className="iro-dialog-backdrop" />
        <BaseDialog.Popup
          ref={panel}
          className={cx("iro-sheet", className)}
          data-side={side}
          data-resizable={resizable || undefined}
        >
          <header className="iro-sheet-header">
            <BaseDialog.Title className="iro-sheet-title">{title}</BaseDialog.Title>
            {actions ? <div className="iro-sheet-actions">{actions}</div> : null}
            <BaseDialog.Close
              render={<IconButton icon={<CloseGlyph />} label={closeLabel} size="sm" tooltip={false} />}
            />
          </header>
          <div className="iro-sheet-body">{children}</div>
          {resizable ? (
            <ResizeGrip target={panel} axis="x" side={side === "right" ? "start" : "end"} label="Panel width" />
          ) : null}
        </BaseDialog.Popup>
      </BaseDialog.Portal>
    </BaseDialog.Root>
  );
}
