import type { ReactElement, ReactNode } from "react";
export interface HoverCardProps {
    /** The link it previews: an `<a>` (Base UI renders the trigger as a link). */
    trigger: ReactElement;
    children: ReactNode;
    side?: "top" | "bottom" | "left" | "right";
    align?: "start" | "center" | "end";
    /** Milliseconds of rest before it opens (default 600). */
    delay?: number;
    /** Goes on the card. */
    className?: string;
}
/** A card that previews a link on hover and focus. */
export declare function HoverCard({ trigger, children, side, align, delay, className, }: HoverCardProps): import("react").JSX.Element;
