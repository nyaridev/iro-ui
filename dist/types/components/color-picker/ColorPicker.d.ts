export interface ColorPickerProps {
    /** The color as "#rrggbb". */
    value: string;
    onValueChange: (hex: string) => void;
    /** Preset colors under the picker, as hex. */
    swatches?: string[];
    size?: "sm" | "md";
    disabled?: boolean;
    id?: string;
    className?: string;
    /** What the color is for, for screen readers ("Label color"), when no Field names it. */
    "aria-label"?: string;
}
/** A color field with a picker. */
export declare function ColorPicker({ value, onValueChange, swatches, size, disabled, id, className, "aria-label": ariaLabel, }: ColorPickerProps): import("react").JSX.Element;
