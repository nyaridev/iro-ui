export interface OtpFieldProps {
    /** How many characters (default 6). */
    length?: number;
    value?: string;
    defaultValue?: string;
    onValueChange?: (value: string) => void;
    /** Called once every box is filled. */
    onComplete?: (value: string) => void;
    /** `numeric` (default) takes digits only; `alphanumeric` letters too. */
    type?: "numeric" | "alphanumeric";
    /** Puts a gap after this many boxes: 3 for "123 456". */
    groupSize?: number;
    /** Hides what's typed, like a password. */
    mask?: boolean;
    disabled?: boolean;
    /** Marks it wrong; inside a Field, `error` does this already. */
    invalid?: boolean;
    name?: string;
    className?: string;
    /** What the code is, for screen readers ("Verification code"), when no Field names it. */
    "aria-label"?: string;
}
/** Boxes for a one-time code. */
export declare function OtpField({ length, value, defaultValue, onValueChange, onComplete, type, groupSize, mask, disabled, invalid, name, className, "aria-label": ariaLabel, }: OtpFieldProps): import("react").JSX.Element;
