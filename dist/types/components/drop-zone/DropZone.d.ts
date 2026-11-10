import { type ReactNode } from "react";
export interface DropZoneProps {
    /** The dropped or picked files; one unless `multiple`. */
    onFiles: (files: File[]) => void;
    /** What it asks for: "Drop an image". */
    title: ReactNode;
    /** A muted line under the title: formats, sizes. */
    hint?: ReactNode;
    icon?: ReactNode;
    multiple?: boolean;
    /** The picker's filter: "image/*", ".png,.jpg". */
    accept?: string;
    /** Working on the last files: no drops or clicks until it's done. */
    disabled?: boolean;
    /** Less padding, for a side panel. */
    compact?: boolean;
    className?: string;
}
/** A drop target that's also a button opening the file picker. */
export declare function DropZone({ onFiles, title, hint, icon, multiple, accept, disabled, compact, className, }: DropZoneProps): import("react").JSX.Element;
