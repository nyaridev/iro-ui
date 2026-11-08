// Typed slider values: turns what someone types into the value box into a value the slider accepts.

// ── Types ─────────────────────────────────
export interface SliderRange {
  min: number;
  max: number;
  step: number;
}

// ── Public API ────────────────────────────
/** The typed text as a value inside the range, snapped to the step from `min`; null when it isn't a number. */
export function parseTyped(text: string, { min, max, step }: SliderRange): number | null {
  const number = Number.parseFloat(text.trim().replace(",", "."));
  if (!Number.isFinite(number)) return null;
  const snapped = min + Math.round((number - min) / step) * step;
  const clamped = Math.min(Math.max(snapped, min), max);
  // Snapping by floats leaves noise like 0.30000000000000004; keep the step's decimals.
  const decimals = (String(step).split(".")[1] ?? "").length;
  return Number(clamped.toFixed(decimals));
}
