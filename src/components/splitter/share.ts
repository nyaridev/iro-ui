// Splitter shares: keeps the start pane's share of the row inside its limits, in fractions and in pixels.

// ── Types ─────────────────────────────────
export interface ShareLimits {
  /** Smallest and largest share of the row the start pane may take (0–1). */
  min: number;
  max: number;
  /** Neither pane gets narrower than this many pixels, whatever the share. */
  minStart: number;
  minEnd: number;
}

// ── Public API ────────────────────────────
/** `share` clamped to the limits for a row `width` pixels wide. Pixel limits win over share limits; when the row is
 *  too narrow for both, the start pane keeps its minimum. */
export function clampShare(share: number, width: number, { min, max, minStart, minEnd }: ShareLimits): number {
  const low = width > 0 ? Math.max(min, minStart / width) : min;
  const high = width > 0 ? Math.min(max, 1 - minEnd / width) : max;
  return Math.min(Math.max(share, low), Math.max(low, high));
}
