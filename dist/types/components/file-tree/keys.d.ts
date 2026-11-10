/** One visible row, in reading order. */
export interface TreeKeyRow {
    depth: number;
    /** Present on folders: whether they're open. */
    open?: boolean;
    /** What typing a letter matches. */
    label: string;
}
export type TreeKeyAction = {
    type: "focus";
    index: number;
} | {
    type: "open";
    index: number;
} | {
    type: "close";
    index: number;
};
/** What a key does on row `index`, or null when the tree doesn't use it. */
export declare function treeKey(rows: TreeKeyRow[], index: number, key: string): TreeKeyAction | null;
