import type { ReactElement, ReactNode } from "react";
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
/** A modal side panel. */
export declare function Sheet({ title, children, actions, side, trigger, open, onOpenChange, closeLabel, className, }: SheetProps): import("react").JSX.Element;
