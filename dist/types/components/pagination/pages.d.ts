/** A page number, or a gap standing for the pages left out. */
export type PageItem = number | "gap";
/** The pages to show for page `page` (from 1) of `count`. */
export declare function pageList(page: number, count: number): PageItem[];
