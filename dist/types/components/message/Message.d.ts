import type { ComponentProps, ReactNode } from "react";
export interface MessageProps extends Omit<ComponentProps<"article">, "children"> {
    /** Who it's from (default `assistant`). */
    from?: "user" | "assistant" | "system";
    /** The words: text, or rendered Markdown in a `Prose`. */
    children: ReactNode;
    /** Beside an assistant's message: an Avatar or an icon. */
    avatar?: ReactNode;
    /** Above the words: a name. */
    name?: ReactNode;
    /** Beside the name: "2 min ago". */
    time?: ReactNode;
    /** Above the words: Attachment chips. */
    attachments?: ReactNode;
    /** Under the words, shown on hover and focus: copy, retry, rate. */
    actions?: ReactNode;
    /** Shows a blinking caret after the words. */
    streaming?: boolean;
}
/** A chat message from the reader, the assistant or the system. */
export declare function Message({ from, children, avatar, name, time, attachments, actions, streaming, className, ...rest }: MessageProps): import("react").JSX.Element;
