import { type StackFrame } from "./stack";
export interface StackTraceProps {
    /** The raw trace, as `error.stack` gives it. */
    stack: string;
    /** Opens a frame's file; each place becomes a button. */
    onOpenFrame?: (frame: StackFrame) => void;
    /** Shows dependency and runtime frames from the start (default false). */
    defaultShowInternal?: boolean;
    className?: string;
}
/** An error message over its stack frames, with internal frames folded. */
export declare function StackTrace({ stack, onOpenFrame, defaultShowInternal, className }: StackTraceProps): import("react").JSX.Element;
