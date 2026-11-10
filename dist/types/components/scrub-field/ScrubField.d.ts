import { type ReactNode } from "react";
export interface ScrubFieldProps {
    value: number;
    onValueChange: (value: number) => void;
    min: number;
    max: number;
    step?: number;
    /** Shown at the start of the field. */
    label?: ReactNode;
    /** The accessible name when `label` isn't text. */
    "aria-label"?: string;
    /** After the value: "px", "%". */
    unit?: string;
    /** Double-click goes back to it. */
    defaultValue?: number;
    /** How the value reads; the step's decimals by default. */
    format?: (value: number) => string;
    size?: "sm" | "md" | "lg";
    disabled?: boolean;
    className?: string;
}
/** A draggable, typeable number field with a fill showing where the value sits in its range. */
export declare function ScrubField({ value, onValueChange, min, max, step, label, "aria-label": ariaLabel, unit, defaultValue, format, size, disabled, className, }: ScrubFieldProps): import("react").JSX.Element;
