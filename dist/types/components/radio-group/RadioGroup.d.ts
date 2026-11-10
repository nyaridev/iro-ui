import type { ReactNode } from "react";
export interface RadioOption<T extends string> {
    value: T;
    label: ReactNode;
    /** A muted line under the label. */
    description?: ReactNode;
    disabled?: boolean;
}
export interface RadioGroupProps<T extends string> {
    options: RadioOption<T>[];
    /** The picked value; leave it out and use `defaultValue` to let the group manage it. */
    value?: T;
    defaultValue?: T;
    onValueChange?: (value: T) => void;
    /** `vertical` (default) or `horizontal`. */
    orientation?: "vertical" | "horizontal";
    disabled?: boolean;
    name?: string;
    className?: string;
    /** What the choice is about, for screen readers, when no Field names it. */
    "aria-label"?: string;
}
/** Round buttons for picking one option. */
export declare function RadioGroup<T extends string>({ options, value, defaultValue, onValueChange, orientation, disabled, name, className, "aria-label": ariaLabel, }: RadioGroupProps<T>): import("react").JSX.Element;
