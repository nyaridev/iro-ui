import type { ComponentProps, ReactNode } from "react";
export interface ChipProps extends Omit<ComponentProps<"span">, "onClick"> {
    icon?: ReactNode;
    /** A small number after the text: how many items match. */
    count?: ReactNode;
    /** On, for filter chips (`aria-pressed`). */
    selected?: boolean;
    /** Makes the chip a toggle button. */
    onClick?: () => void;
    /** Adds a × button that calls this. */
    onRemove?: () => void;
    /** Accessible name of the × button. */
    removeLabel?: string;
    size?: "sm" | "md" | "lg";
}
/** A tag, optionally clickable and removable. */
export declare function Chip({ icon, count, selected, onClick, onRemove, removeLabel, size, className, children, ...rest }: ChipProps): import("react").JSX.Element;
