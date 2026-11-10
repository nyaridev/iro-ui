import type { ReactNode } from "react";
export interface PromptInputProps {
    value: string;
    onValueChange: (value: string) => void;
    /** Called with the text on Enter or the send button; clearing it is up to the app. */
    onSubmit: (value: string) => void;
    placeholder?: string;
    /** An answer is streaming: the send button becomes a stop button. */
    streaming?: boolean;
    onStop?: () => void;
    /** Above the text: Attachment chips. */
    attachments?: ReactNode;
    /** At the start of the bar: an attach button, a mode picker. */
    tools?: ReactNode;
    /** The most rows the text grows to before it scrolls (default 8). */
    maxRows?: number;
    disabled?: boolean;
    sendLabel?: string;
    stopLabel?: string;
    className?: string;
    /** Names the text box (default "Message"). */
    "aria-label"?: string;
}
/** A message box with attachments, tools and a send button. */
export declare function PromptInput({ value, onValueChange, onSubmit, placeholder, streaming, onStop, attachments, tools, maxRows, disabled, sendLabel, stopLabel, className, "aria-label": ariaLabel, }: PromptInputProps): import("react").JSX.Element;
