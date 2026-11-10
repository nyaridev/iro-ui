import { type ReactNode } from "react";
export type TerminalLine = string | {
    text: string;
    kind: "command" | "error" | "success" | "muted";
};
export interface TerminalProps {
    lines: TerminalLine[];
    /** In the title bar: "build", a shell name. */
    title?: ReactNode;
    /** Height in px past which it scrolls (default 320). */
    maxHeight?: number;
    /** Shows a blinking cursor after the last line. */
    running?: boolean;
    className?: string;
}
/** A scrolling block of command output. */
export declare function Terminal({ lines, title, maxHeight, running, className }: TerminalProps): import("react").JSX.Element;
