import type { ReactElement } from "react";
import { type MenuEntry } from "../menu/MenuEntries";
export interface ContextMenuProps {
    items: MenuEntry[];
    /** The area that opens the menu: one element that takes a ref and passes props to the DOM. */
    children: ReactElement;
    /** Goes on the popup. */
    className?: string;
}
/** Opens `items` at the pointer when its child is right-clicked. */
export declare function ContextMenu({ items, children, className }: ContextMenuProps): import("react").JSX.Element;
