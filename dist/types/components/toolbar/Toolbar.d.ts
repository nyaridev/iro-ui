import type { ComponentProps, ReactNode } from "react";
export interface ToolbarProps extends Omit<ComponentProps<"div">, "dir"> {
    /** `horizontal` (default) or `vertical`. */
    orientation?: "horizontal" | "vertical";
    /** What the tools are for: "Text formatting". */
    "aria-label": string;
}
export interface ToolbarButtonProps {
    icon?: ReactNode;
    /** What it does: the accessible name, and the tooltip of an icon-only button. */
    label: string;
    /** Text beside the icon; left out, the button is icon-only. */
    children?: ReactNode;
    /** On, for toggles like bold (`aria-pressed`). */
    active?: boolean;
    /** A keyboard shortcut for the tooltip: `"Ctrl B"`. */
    shortcut?: string;
    disabled?: boolean;
    onClick?: () => void;
}
/** A row of tools reached as one keyboard stop. */
export declare function Toolbar({ orientation, className, ...rest }: ToolbarProps): import("react").JSX.Element;
/** A button in a Toolbar: icon-only with a tooltip, or with text. */
export declare function ToolbarButton({ icon, label, children, active, shortcut, disabled, onClick }: ToolbarButtonProps): import("react").JSX.Element;
/** A line between groups of tools. */
export declare function ToolbarSeparator(): import("react").JSX.Element;
