import { type ReactNode } from "react";
export interface TourStep {
    /** A CSS selector for the part to highlight; when nothing matches, the card sits in the middle. */
    target: string;
    title: string;
    text: ReactNode;
    /** Where the card goes next to the target (default below). */
    placement?: "bottom" | "top" | "right" | "left";
}
export interface TourProps {
    steps: TourStep[];
    open: boolean;
    /** `finished` is true after the last step, false when skipped. */
    onClose: (finished: boolean) => void;
    className?: string;
}
/** A step-by-step tour over the page. */
export declare function Tour({ steps, open, onClose, className }: TourProps): import("react").JSX.Element;
