import type { ReactElement } from "react";
import { type MenuEntry } from "./MenuEntries";
export interface MenuProps {
    /** The element that opens it. */
    trigger: ReactElement;
    items: MenuEntry[];
    side?: "top" | "bottom" | "left" | "right";
    align?: "start" | "center" | "end";
    /** Goes on the popup. */
    className?: string;
}
/** A dropdown menu of actions. */
export declare function Menu({ trigger, items, side, align, className }: MenuProps): import("react").JSX.Element;
