import type { ReactElement, ReactNode } from "react";
export interface TooltipProps {
    /** What the tooltip says. */
    content: ReactNode;
    /** The trigger: one element that takes a ref and passes props to the DOM (any iro-ui control does). */
    children: ReactElement;
    side?: "top" | "bottom" | "left" | "right";
    /** Milliseconds of hover before it opens. */
    delay?: number;
    disabled?: boolean;
    className?: string;
}
/** Shows `content` next to its child on hover and keyboard focus. */
export declare function Tooltip({ content, children, side, delay, disabled, className }: TooltipProps): import("react").JSX.Element;
