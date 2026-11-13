import { type ReactElement, type ReactNode } from "react";
export interface SheetProps {
    title: ReactNode;
    children?: ReactNode;
    /** Buttons in the header, just before the × button: "Open in browser", "Refresh". */
    actions?: ReactNode;
    side?: "left" | "right";
    /** A grip along its inner edge: drag or arrow keys to change the width, double-click to go back to the default. */
    resizable?: boolean;
    /** With `resizable`, the width in px it opens at (one the user picked last time); the default width without it. */
    defaultWidth?: number;
    /** With `resizable`, after the user changes the width: the new one in px, or null back at the default. */
    onWidthChange?: (width: number | null) => void;
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
export declare function Sheet({ title, children, actions, side, resizable, defaultWidth, onWidthChange, trigger, open, onOpenChange, closeLabel, className, }: SheetProps): import("react").JSX.Element;
