import type { SegmentedOption } from "../segmented/Segmented";
export interface MultiSegmentedProps<T extends string> {
    options: SegmentedOption<T>[];
    value: T[];
    onValueChange: (value: T[]) => void;
    /** A first segment meaning "all" (no picks): "Any", "All". */
    allLabel?: string;
    size?: "sm" | "md";
    disabled?: boolean;
    className?: string;
    /** What the choice is about, for screen readers. */
    "aria-label"?: string;
}
/** A row of toggle segments where any number can be picked. */
export declare function MultiSegmented<T extends string>({ options, value, onValueChange, allLabel, size, disabled, className, "aria-label": ariaLabel, }: MultiSegmentedProps<T>): import("react").JSX.Element;
