export interface Stage {
    /** Fixed over the window, the size of its layout box, above the page. */
    element: HTMLElement;
    /** The window on screen when the stage was set. */
    box: DOMRect;
    width: number;
    height: number;
    /** A new copy of the window filling the stage, ready to clip and move. */
    copy: () => HTMLElement;
    remove: () => void;
}
/** Sets a stage over `node`, beside it in the document so the copies keep its inherited look. */
export declare function stage(node: HTMLElement): Stage;
/** What the UI inside `node` looks like, as a `cols` by `rows` grid of CSS colors: each cell holds the first solid
 *  background under its center, or one of `fallback` (the backdrop's tints) where that's `node` itself. */
export declare function colorsUnder(node: HTMLElement, cols: number, rows: number, fallback: string[]): string[][];
