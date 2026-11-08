export interface NumberFieldProps {
    value?: number | null;
    defaultValue?: number;
    /** Called with the new number, or null when the input is emptied. */
    onValueChange?: (value: number | null) => void;
    min?: number;
    max?: number;
    step?: number;
    /** The step with Shift held or Page Up / Down. */
    largeStep?: number;
    /** How the number shows: `{ style: "percent" }`, `{ maximumFractionDigits: 2 }`… */
    format?: Intl.NumberFormatOptions;
    size?: "sm" | "md" | "lg";
    disabled?: boolean;
    required?: boolean;
    /** Marks it wrong; inside a Field, `error` does this already. */
    invalid?: boolean;
    name?: string;
    id?: string;
    className?: string;
    /** The accessible name when it isn't inside a Field. */
    "aria-label"?: string;
    /** Accessible names of the steppers. */
    decrementLabel?: string;
    incrementLabel?: string;
}
/** A number input with steppers. */
export declare function NumberField({ value, defaultValue, onValueChange, min, max, step, largeStep, format, size, disabled, required, invalid, name, id, className, "aria-label": ariaLabel, decrementLabel, incrementLabel, }: NumberFieldProps): import("react").JSX.Element;
