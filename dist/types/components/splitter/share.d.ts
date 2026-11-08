export interface ShareLimits {
    /** Smallest and largest share of the row the start pane may take (0–1). */
    min: number;
    max: number;
    /** Neither pane gets narrower than this many pixels, whatever the share. */
    minStart: number;
    minEnd: number;
}
/** `share` clamped to the limits for a row `width` pixels wide. Pixel limits win over share limits; when the row is
 *  too narrow for both, the start pane keeps its minimum. */
export declare function clampShare(share: number, width: number, { min, max, minStart, minEnd }: ShareLimits): number;
