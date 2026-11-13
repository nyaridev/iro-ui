// Sheet: a side panel that slides in over the page from the left or right, with Dialog's focus trap and dismissal.
// For narrow screens' sidebars and for details panels.

// ── Dependencies ──────────────────────────
import { Dialog as BaseDialog } from "@base-ui/react/dialog";
import type { ReactElement, ReactNode } from "react";
import { useIroLayer } from "../../root/IroRoot";
import { IconButton } from "../icon-button/IconButton";
import { cx } from "../shared/cx";
import { CloseGlyph } from "../shared/glyphs";

// ── Types ─────────────────────────────────
export interface SheetProps {
  title: ReactNode;
  children?: ReactNode;
  /** Buttons in the header, just before the × button: "Open in browser", "Refresh". */
  actions?: ReactNode;
  side?: "left" | "right";
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
  trigger,
  open,
  onOpenChange,
  closeLabel = "Close",
  className,
}: SheetProps) {
  const layer = useIroLayer();
  return (
    <BaseDialog.Root open={open} onOpenChange={onOpenChange ? (next) => onOpenChange(next) : undefined}>
      {trigger ? <BaseDialog.Trigger render={trigger} /> : null}
      <BaseDialog.Portal container={layer}>
        <BaseDialog.Backdrop className="iro-dialog-backdrop" />
        <BaseDialog.Popup className={cx("iro-sheet", className)} data-side={side}>
          <header className="iro-sheet-header">
            <BaseDialog.Title className="iro-sheet-title">{title}</BaseDialog.Title>
            {actions ? <div className="iro-sheet-actions">{actions}</div> : null}
            <BaseDialog.Close
              render={<IconButton icon={<CloseGlyph />} label={closeLabel} size="sm" tooltip={false} />}
            />
          </header>
          <div className="iro-sheet-body">{children}</div>
        </BaseDialog.Popup>
      </BaseDialog.Portal>
    </BaseDialog.Root>
  );
}
