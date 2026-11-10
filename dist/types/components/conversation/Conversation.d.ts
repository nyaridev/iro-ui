import { type ComponentProps } from "react";
export interface ConversationProps extends ComponentProps<"div"> {
    /** An answer is streaming: screen readers wait for it to finish before reading it. */
    busy?: boolean;
    /** The text of the button back to the newest message. */
    latestLabel?: string;
}
/** A scrolling list of messages that follows the newest one. */
export declare function Conversation({ busy, latestLabel, className, children, "aria-label": ariaLabel, ...rest }: ConversationProps): import("react").JSX.Element;
