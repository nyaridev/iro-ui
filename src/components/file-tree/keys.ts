// The tree's keys (ADR-0013): given the visible rows, the focused one and a key, what to do. Enter and Space are left
// to the row's button, which clicks.

// ── Types ─────────────────────────────────
/** One visible row, in reading order. */
export interface TreeKeyRow {
  depth: number;
  /** Present on folders: whether they're open. */
  open?: boolean;
  /** What typing a letter matches. */
  label: string;
}

export type TreeKeyAction =
  | { type: "focus"; index: number }
  | { type: "open"; index: number }
  | { type: "close"; index: number };

// ── Public API ────────────────────────────
/** What a key does on row `index`, or null when the tree doesn't use it. */
export function treeKey(rows: TreeKeyRow[], index: number, key: string): TreeKeyAction | null {
  const row = rows[index];
  if (!row) return null;
  const last = rows.length - 1;
  const folder = row.open !== undefined;
  switch (key) {
    case "ArrowDown":
      return { type: "focus", index: Math.min(index + 1, last) };
    case "ArrowUp":
      return { type: "focus", index: Math.max(index - 1, 0) };
    case "Home":
      return { type: "focus", index: 0 };
    case "End":
      return { type: "focus", index: last };
    case "ArrowRight":
      if (folder && !row.open) return { type: "open", index };
      return folder && rows[index + 1]?.depth > row.depth ? { type: "focus", index: index + 1 } : null;
    case "ArrowLeft": {
      if (folder && row.open) return { type: "close", index };
      for (let parent = index - 1; parent >= 0; parent--) {
        if (rows[parent].depth < row.depth) return { type: "focus", index: parent };
      }
      return null;
    }
  }
  if (key.length !== 1 || key === " ") return null;
  // Typing a letter: the next row that starts with it, wrapping past the end.
  const letter = key.toLowerCase();
  for (let step = 1; step <= rows.length; step++) {
    const next = (index + step) % rows.length;
    if (rows[next].label.toLowerCase().startsWith(letter)) return { type: "focus", index: next };
  }
  return null;
}
