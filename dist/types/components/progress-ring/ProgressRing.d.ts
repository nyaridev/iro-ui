export interface ProgressRingProps {
    /** Done so far, 0–1. */
    value: number;
    /** Width and height in px (default 20). */
    size?: number;
    /** What's in progress, for screen readers. */
    label?: string;
    className?: string;
}
/** A ring that fills clockwise from the top. */
export declare function ProgressRing({ value, size, label, className }: ProgressRingProps): import("react").JSX.Element;
