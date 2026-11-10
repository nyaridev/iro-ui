export interface StarRatingProps {
    value: number;
    onValueChange?: (value: number) => void;
    readOnly?: boolean;
    size?: "sm" | "md";
    /** What's rated, for screen readers (default "Rating"). */
    label?: string;
    className?: string;
}
/** Five stars to rate with, or to show a rating. */
export declare function StarRating({ value, onValueChange, readOnly, size, label, className, }: StarRatingProps): import("react").JSX.Element;
