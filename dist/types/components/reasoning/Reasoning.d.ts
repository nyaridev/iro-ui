import { type ReactNode } from "react";
export interface ReasoningProps {
    /** The thinking: text, or rendered Markdown in a `Prose`. */
    children: ReactNode;
    /** Still thinking: the line shimmers and the body stays open. */
    streaming?: boolean;
    /** How long it took, in seconds, for the line once done. */
    duration?: number;
    /** The line's words (default "Thinking…", then "Thought for 12 s"). */
    label?: (streaming: boolean, duration?: number) => string;
    className?: string;
}
/** A folding block of the assistant's reasoning. */
export declare function Reasoning({ children, streaming, duration, label, className }: ReasoningProps): import("react").JSX.Element;
