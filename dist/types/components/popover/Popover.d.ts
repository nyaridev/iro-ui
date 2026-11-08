import type { ReactElement, ReactNode } from "react";
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
/** A click-to-open panel anchored to `trigger`. */
export declare function Popover({ trigger, title, children, side, align, open, onOpenChange, className, }: PopoverProps): import("react").JSX.Element;
