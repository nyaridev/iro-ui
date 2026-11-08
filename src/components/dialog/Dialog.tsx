// Dialog: a modal window with a title, a body and an optional footer of actions. Focus stays inside while it's open;
// Esc, the × or a click on the backdrop closes it.

// ── Dependencies ──────────────────────────
import { Dialog as BaseDialog } from "@base-ui/react/dialog";
import type { ReactElement, ReactNode } from "react";
import { useIroLayer } from "../../root/IroRoot";
import { IconButton } from "../icon-button/IconButton";
import { cx } from "../shared/cx";
import { CloseGlyph } from "../shared/glyphs";

// ── Types ─────────────────────────────────
export interface DialogProps {
  title: ReactNode;
  /** A line under the title; screen readers read it with the title. */
  description?: ReactNode;
  children?: ReactNode;
  /** The actions, right-aligned: Cancel, then the main action. */
  footer?: ReactNode;
  /** The element that opens it; leave it out and control `open` instead. */
  trigger?: ReactElement;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  size?: "sm" | "md" | "lg";
  /** Accessible name of the × button. */
  closeLabel?: string;
  /** Goes on the window. */
  className?: string;
}

// ── Public API ────────────────────────────
/** A centered modal window. */
export function Dialog({
  title,
  description,
  children,
  footer,
  trigger,
  open,
  onOpenChange,
  size = "md",
  closeLabel = "Close",
  className,
}: DialogProps) {
  const layer = useIroLayer();
  return (
    <BaseDialog.Root open={open} onOpenChange={onOpenChange ? (next) => onOpenChange(next) : undefined}>
      {trigger ? <BaseDialog.Trigger render={trigger} /> : null}
      <BaseDialog.Portal container={layer}>
        <BaseDialog.Backdrop className="iro-backdrop" />
        <BaseDialog.Popup className={cx("iro-dialog", className)} data-size={size}>
          <header className="iro-dialog-header">
            <BaseDialog.Title className="iro-dialog-title">{title}</BaseDialog.Title>
            <BaseDialog.Close
              render={<IconButton icon={<CloseGlyph />} label={closeLabel} size="sm" tooltip={false} />}
            />
          </header>
          {description ? (
            <BaseDialog.Description className="iro-dialog-description">{description}</BaseDialog.Description>
          ) : null}
          {children ? <div className="iro-dialog-body">{children}</div> : null}
          {footer ? <footer className="iro-dialog-footer">{footer}</footer> : null}
        </BaseDialog.Popup>
      </BaseDialog.Portal>
    </BaseDialog.Root>
  );
}
