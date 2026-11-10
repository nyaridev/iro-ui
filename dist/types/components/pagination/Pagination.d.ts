import type { ComponentProps } from "react";
/** The words Pagination shows and reads out, for another language. */
export interface PaginationLabels {
    pageSize?: string;
    previous?: string;
    next?: string;
    /** A page button's name: "Page 3". */
    page?: (page: number) => string;
    /** Which rows show: "1–5 of 13". */
    range?: (from: number, to: number, total: number) => string;
}
export interface PaginationProps extends Omit<ComponentProps<"nav">, "children"> {
    /** The page showing, from 1. */
    page: number;
    pageSize: number;
    /** How many rows there are in all. */
    total: number;
    onPageChange: (page: number) => void;
    /** The rows-per-page choices; with `onPageSizeChange`, a select shows them. */
    pageSizes?: number[];
    onPageSizeChange?: (size: number) => void;
    labels?: PaginationLabels;
}
/** Page controls for a long list. */
export declare function Pagination({ page, pageSize, total, onPageChange, pageSizes, onPageSizeChange, labels, className, "aria-label": ariaLabel, ...rest }: PaginationProps): import("react").JSX.Element;
