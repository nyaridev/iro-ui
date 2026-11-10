import { type ReactNode } from "react";
export interface PaletteItem {
    /** Unique across the items. */
    id: string;
    label: string;
    /** The heading it's listed under: "Pages", "Files", "Actions". */
    group: string;
    icon?: ReactNode;
    /** Muted text after the label: a folder, "Settings page". */
    hint?: ReactNode;
    /** Its shortcut, shown at the end: `["Ctrl", "G"]`. */
    keys?: string[];
    /** More words that should find it. */
    keywords?: string;
}
export interface CommandPaletteProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    items: PaletteItem[];
    /** The picked entry; the palette has closed already. */
    onPick: (item: PaletteItem) => void;
    placeholder?: string;
    emptyText?: string;
    /** The dialog's name for screen readers (default "Command palette"). */
    label?: string;
    className?: string;
}
/** A modal search over commands and places, grouped. */
export declare function CommandPalette({ open, onOpenChange, items, onPick, placeholder, emptyText, label, className, }: CommandPaletteProps): import("react").JSX.Element;
