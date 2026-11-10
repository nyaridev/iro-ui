import { type ComponentProps } from "react";
export interface TextAreaProps extends ComponentProps<"textarea"> {
    /** Marks it wrong; inside a Field, `error` does this already. */
    invalid?: boolean;
    /** Grow with the text, up to `maxRows` (default true). A size picked with the grip stays until a fit. */
    autoGrow?: boolean;
    /** The most rows it grows to (default 12); after that it scrolls. */
    maxRows?: number;
    /** Monospace text: code, logs, paths. */
    mono?: boolean;
    /** The grip under it that resizes it (default true). */
    resizable?: boolean;
}
/** A multi-line text input that grows with its text and has a resize grip. */
export declare function TextArea({ invalid, autoGrow, maxRows, mono, resizable, className, ref, onInput, ...rest }: TextAreaProps): import("react").JSX.Element;
