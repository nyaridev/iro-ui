import type { ReactNode } from "react";
export interface ScrollAreaProps {
    children: ReactNode;
    /** Which ways it scrolls (default `vertical`). */
    direction?: "vertical" | "horizontal" | "both";
    /** The most it grows before scrolling: a number of px or any CSS length. */
    maxHeight?: number | string;
    /** Fades the content into the edge it continues past. */
    fade?: boolean;
    className?: string;
    /** Names the area for keyboard users, who can focus it to scroll. */
    "aria-label"?: string;
}
/** A scrolling box with overlay scrollbars. */
export declare function ScrollArea({ children, direction, maxHeight, fade, className, "aria-label": ariaLabel, }: ScrollAreaProps): import("react").JSX.Element;
