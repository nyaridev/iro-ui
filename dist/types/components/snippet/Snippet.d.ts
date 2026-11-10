export interface SnippetProps {
    code: string;
    /** The "$" before it (default true); off for things that aren't commands. */
    prompt?: boolean;
    /** Name and tooltip of the copy button (default "Copy command"). */
    copyLabel?: string;
    className?: string;
}
/** A one-line command with a copy button. */
export declare function Snippet({ code, prompt, copyLabel, className }: SnippetProps): import("react").JSX.Element;
