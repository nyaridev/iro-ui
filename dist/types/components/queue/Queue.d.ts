export interface QueueItem {
    id: string;
    text: string;
}
export interface QueueProps {
    items: QueueItem[];
    onRemove: (id: string) => void;
    /** Adds a "send now" button to each. */
    onSendNow?: (id: string) => void;
    /** The heading's words (default "2 queued"). */
    label?: (count: number) => string;
    className?: string;
}
/** A list of messages waiting to be sent. */
export declare function Queue({ items, onRemove, onSendNow, label, className }: QueueProps): import("react").JSX.Element | null;
