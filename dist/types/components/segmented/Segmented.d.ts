import { type ReactNode } from "react";
export interface SegmentedOption<T extends string> {
    value: T;
    label: ReactNode;
    icon?: ReactNode;
    disabled?: boolean;
}
export interface SegmentedProps<T extends string> {
    options: SegmentedOption<T>[];
    value: T;
    onValueChange: (value: T) => void;
    size?: "sm" | "md";
    /** Fill the row, splitting it evenly. */
    full?: boolean;
    disabled?: boolean;
    className?: string;
    /** What the choice is about, for screen readers. */
    "aria-label"?: string;
}
/** A row of options where exactly one is picked. */
export declare function Segmented<T extends string>({ options, value, onValueChange, size, full, disabled, className, "aria-label": ariaLabel, }: SegmentedProps<T>): import("react").JSX.Element;
