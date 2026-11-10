import type { ChartPart } from "../chart/types";
export interface UsageMeterProps {
    used: number;
    total: number;
    /** What's measured (default "Context"); the popup's title and the button's name. */
    label?: string;
    /** After the numbers: "tokens". */
    unit?: string;
    /** What the used part is made of, drawn as a split bar. */
    parts?: ChartPart[];
    /** How numbers read (default compact: "84K"). */
    format?: (value: number) => string;
    className?: string;
}
/** A usage ring that opens its breakdown. */
export declare function UsageMeter({ used, total, label, unit, parts, format, className, }: UsageMeterProps): import("react").JSX.Element;
