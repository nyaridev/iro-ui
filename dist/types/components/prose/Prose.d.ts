import type { ComponentProps } from "react";
export interface ProseProps extends ComponentProps<"div"> {
    /** `md` (default) for articles and docs, `sm` for chat replies and side panels. */
    size?: "sm" | "md";
}
/** A wrapper that styles the rendered text inside it. */
export declare function Prose({ size, className, ...rest }: ProseProps): import("react").JSX.Element;
