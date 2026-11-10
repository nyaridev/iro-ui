import { type MenuEntry } from "../menu/MenuEntries";
export interface MenubarMenu {
    /** The menu's name in the bar; unique within it. */
    label: string;
    items: MenuEntry[];
}
export interface MenubarProps {
    menus: MenubarMenu[];
    className?: string;
    /** Names the bar for screen readers (default "Menu bar"). */
    "aria-label"?: string;
}
/** A row of menus. */
export declare function Menubar({ menus, className, "aria-label": ariaLabel }: MenubarProps): import("react").JSX.Element;
