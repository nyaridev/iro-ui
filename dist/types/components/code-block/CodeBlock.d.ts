import type { ComponentProps, ReactNode } from "react";
export interface CodeBlockProps extends Omit<ComponentProps<"figure">, "children" | "title"> {
    code: string;
    /** Shown in the title bar: "tsx", "bash". */
    language?: string;
    /** A file name or title for the title bar. */
    title?: ReactNode;
    lineNumbers?: boolean;
    /** Lines to mark, counted from 1. */
    highlight?: number[];
    /** Colored lines from the app's own highlighter, one per line of `code`. */
    lines?: ReactNode[];
    /** Height in px past which it scrolls. */
    maxHeight?: number;
    /** Wraps long lines instead of scrolling sideways. */
    wrap?: boolean;
    /** Name and tooltip of the copy button (default "Copy code"). */
    copyLabel?: string;
}
/** A block of code with a copy button. */
export declare function CodeBlock({ code, language, title, lineNumbers, highlight, lines, maxHeight, wrap, copyLabel, className, style, ...rest }: CodeBlockProps): import("react").JSX.Element;
