export interface NumberRange {
    min: number;
    max: number;
    step: number;
}
/** `value` snapped to the step from `min` and kept inside the range. */
export declare function snapToStep(value: number, { min, max, step }: NumberRange): number;
/** The typed text as a value inside the range, snapped to the step; null when it isn't a number. */
export declare function parseTyped(text: string, range: NumberRange): number | null;
