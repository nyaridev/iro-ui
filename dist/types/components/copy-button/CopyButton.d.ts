export interface CopyButtonProps {
    text: string;
    /** What it copies, as its name and tooltip (default "Copy"). */
    label?: string;
    size?: "sm" | "md";
    className?: string;
}
/** Copies `text` to the clipboard; the click doesn't reach the row or card it sits in. */
export declare function CopyButton({ text, label, size, className }: CopyButtonProps): import("react").JSX.Element;
