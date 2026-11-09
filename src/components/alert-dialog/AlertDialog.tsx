// AlertDialog: asks before something that can't be undone (delete, discard, sign out everywhere). Unlike Dialog it
// has no ×, and clicking outside doesn't close it: the only ways out are the two buttons and Escape, which cancels.

// ── Dependencies ──────────────────────────
import { AlertDialog as BaseAlertDialog } from "@base-ui/react/alert-dialog";
import type { ReactElement, ReactNode } from "react";
import { useIroLayer } from "../../root/IroRoot";
import { Button } from "../button/Button";
import { cx } from "../shared/cx";

// ── Types ─────────────────────────────────
export interface AlertDialogProps {
  /** The question: "Delete 3 files?" */
  title: ReactNode;
  /** What happens if they go ahead. */
  description?: ReactNode;
  /** The action's button text: "Delete". */
  confirmLabel: string;
  cancelLabel?: string;
  onConfirm: () => void;
  /** `danger` (default) paints the action red; `accent` for asks that aren't destructive. */
  tone?: "danger" | "accent";
  /** The element that opens it; leave it out and control `open` instead. */
  trigger?: ReactElement;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Goes on the window. */
  className?: string;
}

// ── Public API ────────────────────────────
/** A dialog that confirms an action. */
export function AlertDialog({
  title,
  description,
  confirmLabel,
  cancelLabel = "Cancel",
  onConfirm,
  tone = "danger",
  trigger,
  open,
  onOpenChange,
  className,
}: AlertDialogProps) {
  const layer = useIroLayer();
  return (
    <BaseAlertDialog.Root open={open} onOpenChange={onOpenChange ? (next) => onOpenChange(next) : undefined}>
      {trigger ? <BaseAlertDialog.Trigger render={trigger} /> : null}
      <BaseAlertDialog.Portal container={layer}>
        <BaseAlertDialog.Backdrop className="iro-dialog-backdrop" />
        <BaseAlertDialog.Popup className={cx("iro-dialog", "iro-alert-dialog", className)} data-size="sm">
          <BaseAlertDialog.Title className="iro-dialog-title iro-alert-dialog-title">{title}</BaseAlertDialog.Title>
          {description ? (
            <BaseAlertDialog.Description className="iro-alert-dialog-description">
              {description}
            </BaseAlertDialog.Description>
          ) : null}
          <footer className="iro-alert-dialog-actions">
            <BaseAlertDialog.Close render={<Button>{cancelLabel}</Button>} />
            <BaseAlertDialog.Close
              render={<Button variant={tone === "danger" ? "danger" : "primary"}>{confirmLabel}</Button>}
              onClick={onConfirm}
            />
          </footer>
        </BaseAlertDialog.Popup>
      </BaseAlertDialog.Portal>
    </BaseAlertDialog.Root>
  );
}
