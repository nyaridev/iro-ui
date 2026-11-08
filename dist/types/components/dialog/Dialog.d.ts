import type { ReactElement, ReactNode } from "react";
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
/** A centered modal window. */
export declare function Dialog({ title, description, children, footer, trigger, open, onOpenChange, size, closeLabel, className, }: DialogProps): import("react").JSX.Element;
