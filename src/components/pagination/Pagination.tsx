// Pagination: moving through a long list a page at a time. Rows per page (when it can change), which rows are showing
// ("1–5 of 13"), previous and next, and the page numbers with gaps.

// ── Dependencies ──────────────────────────
import type { ComponentProps } from "react";
import { Button } from "../button/Button";
import { IconButton } from "../icon-button/IconButton";
import { Select } from "../select/Select";
import { cx } from "../shared/cx";
import { ChevronLeftGlyph, ChevronRightGlyph } from "../shared/glyphs";
import { pageList } from "./pages";

// ── Types ─────────────────────────────────
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

// ── Constants ─────────────────────────────
const WORDS: Required<PaginationLabels> = {
  pageSize: "Rows per page",
  previous: "Previous page",
  next: "Next page",
  page: (page) => `Page ${page}`,
  range: (from, to, total) => `${from}–${to} of ${total}`,
};

// ── Public API ────────────────────────────
/** Page controls for a long list. */
export function Pagination({
  page,
  pageSize,
  total,
  onPageChange,
  pageSizes,
  onPageSizeChange,
  labels,
  className,
  "aria-label": ariaLabel = "Pagination",
  ...rest
}: PaginationProps) {
  const words = { ...WORDS, ...labels };
  const count = Math.max(1, Math.ceil(total / pageSize));
  const current = Math.min(Math.max(page, 1), count);
  const from = total === 0 ? 0 : (current - 1) * pageSize + 1;
  const to = Math.min(current * pageSize, total);

  return (
    <nav className={cx("iro-pagination", className)} aria-label={ariaLabel} {...rest}>
      {pageSizes && onPageSizeChange ? (
        <span className="iro-pagination-size">
          <span aria-hidden="true">{words.pageSize}</span>
          <Select
            size="sm"
            className="iro-pagination-size-select"
            aria-label={words.pageSize}
            value={String(pageSize)}
            options={pageSizes.map((size) => ({ value: String(size), label: String(size) }))}
            onValueChange={(size) => size && onPageSizeChange(Number(size))}
          />
        </span>
      ) : null}
      <span className="iro-pagination-range">{words.range(from, to, total)}</span>
      <span className="iro-pagination-pages">
        <IconButton
          size="sm"
          icon={<ChevronLeftGlyph />}
          label={words.previous}
          disabled={current <= 1}
          onClick={() => onPageChange(current - 1)}
        />
        {pageList(current, count).map((item, index) =>
          item === "gap" ? (
            // biome-ignore lint/suspicious/noArrayIndexKey: there are at most two gaps; their place tells them apart.
            <span key={`gap-${index}`} className="iro-pagination-gap" aria-hidden="true">
              …
            </span>
          ) : (
            <Button
              key={item}
              size="sm"
              variant="ghost"
              className="iro-pagination-page"
              aria-label={words.page(item)}
              aria-current={item === current ? "page" : undefined}
              onClick={() => onPageChange(item)}
            >
              {item}
            </Button>
          ),
        )}
        <IconButton
          size="sm"
          icon={<ChevronRightGlyph />}
          label={words.next}
          disabled={current >= count}
          onClick={() => onPageChange(current + 1)}
        />
      </span>
    </nav>
  );
}
