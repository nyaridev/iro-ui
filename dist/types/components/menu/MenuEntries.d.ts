import type { ReactNode } from "react";
/** One action in a menu. */
export interface MenuItem {
    /** The text; typing its first letters jumps to it. Unique within one menu. */
    label: string;
    onSelect: () => void;
    icon?: ReactNode;
    /** Shown on the right, as a reminder: `"Ctrl D"`. It doesn't bind the key. */
    shortcut?: string;
    /** Destructive: shown in the danger color. */
    danger?: boolean;
    disabled?: boolean;
}
/** An item, or `"separator"` for a line between groups. */
export type MenuEntry = MenuItem | "separator";
/** The rows of a menu popup. Icons get a column only when some item has one, so labels line up. */
export declare function MenuEntries({ items }: {
    items: MenuEntry[];
}): import("react").JSX.Element[];
