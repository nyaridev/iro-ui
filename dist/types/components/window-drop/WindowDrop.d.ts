import { type ReactNode } from "react";
export interface WindowDropProps {
    /** The dropped files. Leave it out to use `open` only. */
    onFiles?: (files: File[]) => void;
    /** Shows the overlay whatever the browser says; for drags the app tracks itself. */
    open?: boolean;
    title?: ReactNode;
    hint?: ReactNode;
    icon?: ReactNode;
    /** Ignore drags for now (a job is running). */
    disabled?: boolean;
}
/** A full-window drop overlay; mount it once, inside the root. */
export declare function WindowDrop({ onFiles, open, title, hint, icon, disabled, }: WindowDropProps): import("react").JSX.Element | null;
