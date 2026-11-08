export interface ProgressBarProps {
    /** 0 to 1, or null when how far along isn't known. */
    value: number | null;
    tone?: "accent" | "success" | "danger";
    size?: "sm" | "md";
    /** What's in progress, for screen readers. */
    label?: string;
    className?: string;
}
/** A thin, rounded progress bar. */
export declare function ProgressBar({ value, tone, size, label, className }: ProgressBarProps): import("react").JSX.Element;
