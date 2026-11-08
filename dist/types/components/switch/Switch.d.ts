import type { ReactNode } from "react";
export interface SwitchProps {
    checked?: boolean;
    defaultChecked?: boolean;
    onCheckedChange?: (checked: boolean) => void;
    /** Text beside the switch; clicking it toggles too. */
    label?: ReactNode;
    size?: "sm" | "md";
    disabled?: boolean;
    name?: string;
    id?: string;
    className?: string;
    /** The accessible name when there's no `label`. */
    "aria-label"?: string;
}
/** An on/off switch, optionally with a label. */
export declare function Switch({ checked, defaultChecked, onCheckedChange, label, size, disabled, name, id, className, "aria-label": ariaLabel, }: SwitchProps): import("react").JSX.Element;
