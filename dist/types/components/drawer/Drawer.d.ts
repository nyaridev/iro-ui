import type { ReactElement, ReactNode } from "react";
export interface DrawerProps {
    title: ReactNode;
    /** A line under the title; screen readers read it with the title. */
    description?: ReactNode;
    children?: ReactNode;
    /** Buttons at the bottom, full width on phones. */
    footer?: ReactNode;
    /** The element that opens it; leave it out and control `open` instead. */
    trigger?: ReactElement;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    /** Goes on the panel. */
    className?: string;
}
/** A bottom panel that can be dragged down to close. */
export declare function Drawer({ title, description, children, footer, trigger, open, onOpenChange, className }: DrawerProps): import("react").JSX.Element;
