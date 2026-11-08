import type { ComponentProps } from "react";
export interface SpinnerProps extends ComponentProps<"span"> {
    /** What's loading, for screen readers. Leave it out when the surrounding control already says so. */
    label?: string;
}
/** A loading spinner in the current text color. */
export declare function Spinner({ label, className, ...rest }: SpinnerProps): import("react").JSX.Element;
