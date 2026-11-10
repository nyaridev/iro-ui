import type { ReactNode } from "react";
export interface ToolCallProps {
    /** The tool's name: "search", "read_file". */
    name: string;
    /** What it did, in a few words: "3 results for “export”". */
    summary?: ReactNode;
    status: "running" | "done" | "error";
    /** What went in: arguments, a command; a CodeBlock fits. */
    input?: ReactNode;
    /** What came back, or the error. */
    output?: ReactNode;
    /** In place of the wrench. */
    icon?: ReactNode;
    defaultOpen?: boolean;
    /** Section headings (default "Input" and "Output"). */
    inputLabel?: string;
    outputLabel?: string;
    className?: string;
}
/** A folding card for one tool call. */
export declare function ToolCall({ name, summary, status, input, output, icon, defaultOpen, inputLabel, outputLabel, className, }: ToolCallProps): import("react").JSX.Element;
