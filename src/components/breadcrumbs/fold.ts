// Which breadcrumbs show and which fold into the ⋯ menu: the first one, then the last ones, so the reader keeps
// where the path starts and where they are.

// ── Public API ────────────────────────────
/** Splits `items` so at most `max` show (at least two): the first, the folded middle, the rest. */
export function foldItems<T>(items: T[], max: number): { start: T[]; folded: T[]; end: T[] } {
  const keep = Math.max(2, max);
  if (items.length <= keep) return { start: items, folded: [], end: [] };
  return { start: items.slice(0, 1), folded: items.slice(1, items.length - keep + 1), end: items.slice(-(keep - 1)) };
}
