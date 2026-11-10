import type { ReactNode } from "react";
export interface AttachmentProps {
    name: string;
    /** In bytes; shown as "3.2 MB". */
    size?: number;
    /** A short kind: "PDF", "PNG". */
    kind?: string;
    /** An image to show in place of the icon. */
    preview?: string;
    /** In place of the file icon. */
    icon?: ReactNode;
    /** `uploading` (with `progress`, 0–1) or `error`. */
    status?: "uploading" | "error";
    progress?: number;
    /** Adds a × that calls this. */
    onRemove?: () => void;
    /** Accessible name of the × (default "Remove <name>"). */
    removeLabel?: string;
    className?: string;
}
/** A file chip with a preview, name and size. */
export declare function Attachment({ name, size, kind, preview, icon, status, progress, onRemove, removeLabel, className, }: AttachmentProps): import("react").JSX.Element;
