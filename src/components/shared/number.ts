// Numbers in a range: snapping to a step and reading what someone typed. Shared by Slider and ScrubField.

// ── Types ─────────────────────────────────
export interface NumberRange {
  min: number;
  max: number;
  step: number;
}

// ── Public API ────────────────────────────
/** `value` snapped to the step from `min` and kept inside the range. */
export function snapToStep(value: number, { min, max, step }: NumberRange): number {
  const snapped = min + Math.round((value - min) / step) * step;
  const clamped = Math.min(Math.max(snapped, min), max);
  // Snapping by floats leaves noise like 0.30000000000000004; keep the step's decimals.
  const decimals = (String(step).split(".")[1] ?? "").length;
  return Number(clamped.toFixed(decimals));
}

/** The typed text as a value inside the range, snapped to the step; null when it isn't a number. */
export function parseTyped(text: string, range: NumberRange): number | null {
  const number = Number.parseFloat(text.trim().replace(",", "."));
  return Number.isFinite(number) ? snapToStep(number, range) : null;
}
