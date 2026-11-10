import type { ComponentProps, MouseEvent, ReactNode } from "react";
export interface TreeRowProps {
    label: ReactNode;
    /** How deep it sits: 0 for the top level. */
    depth?: number;
    icon?: ReactNode;
    /** Folders pass open or closed; files leave it out. */
    open?: boolean;
    selected?: boolean;
    /** Unsaved changes: a dot after the label. */
    dirty?: boolean;
    /** Muted text at the end: a count, a size. */
    meta?: ReactNode;
    /** Small buttons at the end, shown on hover and focus. */
    actions?: ReactNode;
    /** A click on the row: opens a file, or toggles a folder when there's no `onToggle`. */
    onClick?: () => void;
    /** A folder's open/close, when a click should do something else. */
    onToggle?: () => void;
    /** A right-click on the row's label. */
    onContextMenu?: (event: MouseEvent<HTMLElement>) => void;
    size?: "md" | "lg";
    /** More attributes for the row's button: a tree's role, level and focus (ADR-0013). */
    buttonProps?: Omit<ComponentProps<"button">, "children" | "className" | "onClick">;
    className?: string;
}
/** A row of a tree, with its disclosure chevron and hover actions. */
export declare function TreeRow({ label, depth, icon, open, selected, dirty, meta, actions, onClick, onToggle, onContextMenu, size, buttonProps, className, }: TreeRowProps): import("react").JSX.Element;
