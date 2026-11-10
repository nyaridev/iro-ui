import type { ReactNode } from "react";
export interface ConfirmationProps {
    /** What it wants to do: "Run a command in your project". */
    title: ReactNode;
    /** The details: the command in a CodeBlock, the email's recipients. */
    children?: ReactNode;
    /** `pending` (default) shows the buttons; `allowed` and `denied` show the answer. */
    state?: "pending" | "allowed" | "denied";
    onAllow: () => void;
    onDeny: () => void;
    allowLabel?: string;
    denyLabel?: string;
    /** The answer's words (default "Allowed" and "Denied"). */
    allowedText?: string;
    deniedText?: string;
    className?: string;
}
/** An inline request to approve an action. */
export declare function Confirmation({ title, children, state, onAllow, onDeny, allowLabel, denyLabel, allowedText, deniedText, className, }: ConfirmationProps): import("react").JSX.Element;
