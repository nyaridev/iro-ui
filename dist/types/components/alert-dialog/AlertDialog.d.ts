import { type ReactElement, type ReactNode } from "react";
export interface AlertDialogProps {
    /** The question: "Delete 3 files?" */
    title: ReactNode;
    /** What happens if they go ahead. */
    description?: ReactNode;
    /** The action's button text: "Delete". */
    confirmLabel: string;
    cancelLabel?: string;
    /** The action; return a promise to keep the dialog open, busy, until it's done. */
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
/** A dialog that confirms an action. */
export declare function AlertDialog({ title, description, confirmLabel, cancelLabel, onConfirm, tone, trigger, open, onOpenChange, className, }: AlertDialogProps): import("react").JSX.Element;
