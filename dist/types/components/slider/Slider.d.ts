import { type ReactNode } from "react";
export interface SliderProps {
    value?: number;
    defaultValue?: number;
    /** Every change while dragging or typing. */
    onValueChange?: (value: number) => void;
    /** Once a drag or a typed value is done: for saving. */
    onValueCommit?: (value: number) => void;
    min?: number;
    max?: number;
    step?: number;
    /** The step with Shift held or Page Up / Down. */
    largeStep?: number;
    /** A label above the track, with the value on the right. */
    label?: ReactNode;
    /** How the value shows in the label row: `(v) => \`${v}%\``. */
    format?: (value: number) => string;
    /** Double-clicking the track goes back to this value. */
    resetValue?: number;
    /** Small ticks on the track at these values. */
    marks?: number[];
    disabled?: boolean;
    className?: string;
    /** The accessible name when there's no `label`. */
    "aria-label"?: string;
}
/** A one-thumb slider with an optional label row whose value can be typed. */
export declare function Slider({ value, defaultValue, onValueChange, onValueCommit, min, max, step, largeStep, label, format, resetValue, marks, disabled, className, "aria-label": ariaLabel, }: SliderProps): import("react").JSX.Element;
