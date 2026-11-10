export interface MeterProps {
    value: number;
    min?: number;
    max?: number;
    label: string;
    /** The value as read out and shown after the bar: "6.1 / 8 GB". Default: the percentage. */
    valueText?: string;
    /** Color the bar by how full it is (default true). */
    tone?: boolean;
    className?: string;
}
/** A labelled meter with a bar that warns as it fills. */
export declare function Meter({ value, min, max, label, valueText, tone, className }: MeterProps): import("react").JSX.Element;
