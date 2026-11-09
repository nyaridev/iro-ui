// Pagination's page list: every page when there are few, else the first, the last, the current one with its
// neighbours, and gaps between, always seven slots so the buttons don't shift as the page changes.

/** A page number, or a gap standing for the pages left out. */
export type PageItem = number | "gap";

const SLOTS = 7;
const range = (from: number, to: number) => Array.from({ length: to - from + 1 }, (_, index) => from + index);

/** The pages to show for page `page` (from 1) of `count`. */
export function pageList(page: number, count: number): PageItem[] {
  if (count <= SLOTS) return range(1, count);
  const start = Math.max(2, Math.min(page - 1, count - 4));
  const end = Math.min(count - 1, Math.max(page + 1, 5));
  return [
    1,
    ...(start > 2 ? ["gap" as const] : []),
    ...range(start, end),
    ...(end < count - 1 ? ["gap" as const] : []),
    count,
  ];
}
