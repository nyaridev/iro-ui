export interface ProgressBarProps {
    /** 0 to 1, or null when how far along isn't known. */
    value: number | null;
    tone?: "accent" | "success" | "danger";
    size?: "sm" | "md";
    /** What's in progress, for screen readers. */
    label?: string;
    /** Draw this many ticks, filled up to the value, instead of one bar. */
    segments?: number;
    className?: string;
}
/** A thin, rounded progress bar, or a row of ticks. */
export declare function ProgressBar({ value, tone, size, label, segments, className }: ProgressBarProps): import("react").JSX.Element;
