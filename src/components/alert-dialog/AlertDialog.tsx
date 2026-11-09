// AlertDialog: asks before something that can't be undone (delete, discard, sign out everywhere). Unlike Dialog it
// has no ×, and clicking outside doesn't close it: the only ways out are the two buttons and Escape, which cancels.
// When `onConfirm` returns a promise, it waits: the action shows a spinner, nothing closes it, and it closes once the
// promise resolves. If it rejects, it stays open for another try and the error is reported to the console.

// ── Dependencies ──────────────────────────
import { AlertDialog as BaseAlertDialog } from "@base-ui/react/alert-dialog";
import { type ReactElement, type ReactNode, useState } from "react";
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
  /** The action; return a promise to keep the dialog open, busy, until it's done. */
  // biome-ignore lint/suspicious/noConfusingVoidType: plain handlers return nothing; only a promise makes it wait.
  onConfirm: () => void | Promise<unknown>;
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
  const [ownOpen, setOwnOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const setOpen = (next: boolean) => {
    setOwnOpen(next);
    onOpenChange?.(next);
  };
  const confirm = () => {
    const result = onConfirm();
    if (!(result instanceof Promise)) return setOpen(false);
    setBusy(true);
    result.then(
      () => {
        setBusy(false);
        setOpen(false);
      },
      (error) => {
        setBusy(false);
        reportError(error);
      },
    );
  };

  return (
    <BaseAlertDialog.Root open={open ?? ownOpen} onOpenChange={(next) => busy || setOpen(next)}>
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
            <BaseAlertDialog.Close render={<Button disabled={busy}>{cancelLabel}</Button>} />
            <Button variant={tone === "danger" ? "danger" : "primary"} loading={busy} onClick={confirm}>
              {confirmLabel}
            </Button>
          </footer>
        </BaseAlertDialog.Popup>
      </BaseAlertDialog.Portal>
    </BaseAlertDialog.Root>
  );
}
