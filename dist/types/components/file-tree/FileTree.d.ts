import { type ReactNode } from "react";
export interface FileNode {
    name: string;
    /** Present on folders, even when empty. */
    children?: FileNode[];
    /** In place of the file or folder icon. */
    icon?: ReactNode;
    /** Muted text at the end: a size, a change count. */
    meta?: ReactNode;
    /** Unsaved changes: a dot after the name. */
    dirty?: boolean;
}
export interface FileTreeProps {
    nodes: FileNode[];
    /** The selected file's path, folders joined by "/". */
    selected?: string;
    onSelect?: (path: string, node: FileNode) => void;
    /** Open folders' paths, when the app keeps them. */
    open?: string[];
    onOpenChange?: (open: string[]) => void;
    /** Open folders at first, when the tree keeps them. */
    defaultOpen?: string[];
    /** Names the tree for screen readers (default "Files"). */
    label?: string;
    className?: string;
}
/** A tree of folders and files, one Tab stop with arrow keys. */
export declare function FileTree({ nodes, selected, onSelect, open, onOpenChange, defaultOpen, label, className, }: FileTreeProps): import("react").JSX.Element;
