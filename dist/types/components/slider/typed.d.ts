export interface SliderRange {
    min: number;
    max: number;
    step: number;
}
/** The typed text as a value inside the range, snapped to the step from `min`; null when it isn't a number. */
export declare function parseTyped(text: string, { min, max, step }: SliderRange): number | null;
