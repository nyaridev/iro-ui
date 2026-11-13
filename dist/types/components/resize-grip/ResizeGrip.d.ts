import { type RefObject } from "react";
export type ResizeAxis = "x" | "y" | "both";
export type ResizeSide = "start" | "end";
export interface ResizeGripProps {
    /** The box that changes size. */
    target: RefObject<HTMLElement | null>;
    axis?: ResizeAxis;
    /** The edge it sits on: "end" (right or bottom, the default) or "start" (left or top), which the box grows past. */
    side?: ResizeSide;
    /** The content's own size in px, borders included. Without it, a double-click goes back to the default size. */
    fitSize?: () => {
        width?: number;
        height?: number;
    };
    /** The largest size a fit picks. */
    maxFit?: {
        width: number;
        height: number;
    };
    /** Accessible name. */
    label?: string;
    /** After each change: `fitted` is true for a fit, false for a drag or a key. */
    onResize?: (fitted: boolean) => void;
    className?: string;
}
/** A grip that resizes `target` by dragging, keys or a double-click to fit. */
export declare function ResizeGrip({ target, axis, side, fitSize, maxFit, label, onResize, className, }: ResizeGripProps): import("react").JSX.Element;
