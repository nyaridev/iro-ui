export interface StackFrame {
    /** The function, when the trace names one. */
    fn?: string;
    file: string;
    line?: number;
    column?: number;
    /** From a dependency or the runtime, not the app's own code. */
    internal?: boolean;
}
/** The error's first line and its frames; lines that aren't frames are skipped. */
export declare function parseStack(stack: string): {
    message: string;
    frames: StackFrame[];
};
