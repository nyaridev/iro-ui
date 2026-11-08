import type { ReactNode } from "react";
export interface CheckboxProps {
    checked?: boolean;
    defaultChecked?: boolean;
    onCheckedChange?: (checked: boolean) => void;
    /** Some but not all of a group: shows a dash. */
    indeterminate?: boolean;
    label?: ReactNode;
    /** A muted line under the label. */
    description?: ReactNode;
    disabled?: boolean;
    name?: string;
    id?: string;
    className?: string;
    /** The accessible name when there's no `label`. */
    "aria-label"?: string;
}
/** A checkbox, optionally with a label and description. */
export declare function Checkbox({ checked, defaultChecked, onCheckedChange, indeterminate, label, description, disabled, name, id, className, "aria-label": ariaLabel, }: CheckboxProps): import("react").JSX.Element;
