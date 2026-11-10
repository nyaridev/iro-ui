// Chart number helpers: a value axis rounded out to clean ticks (whole, decimal or a fixed step), how tick labels are
// written, and each series' color.

// ── Dependencies ──────────────────────────
import type { ChartAxis } from "./types";

// ── Constants ─────────────────────────────
/** Tick steps tried within each power of ten; 2.5 keeps quarters (0, 25, 50…) available. */
const STEPS = [1, 2, 2.5, 5, 10];
/** A fixed step that would draw more ticks than this falls back to the automatic one. */
const MAX_TICKS = 50;
/** Series past the eighth fall back to a muted grey; a ninth hue would be too close to one of the eight. */
const SLOTS = 8;
/** About how wide one character of axis text is, to size the y gutter and thin out x labels that would touch. */
const CHAR = 7;
const plain = new Intl.NumberFormat();
const compact = new Intl.NumberFormat(undefined, { notation: "compact", maximumFractionDigits: 1 });

// ── Types ─────────────────────────────────
/** A y range rounded out to clean numbers, and the ticks inside it. */
export interface Scale {
  min: number;
  max: number;
  ticks: number[];
}

/** How `niceScale` picks its step. */
export interface ScaleOptions {
  /** About how many steps (default 4). */
  count?: number;
  /** Only whole-number steps (1, 2, 5, 10…), never 0.25. */
  whole?: boolean;
  /** A fixed step, used when it gives at most 50 ticks. */
  step?: number;
}

// ── Private helpers ───────────────────────
/** The cleanest step at least `rough`: 1, 2, 2.5 or 5 times a power of ten (no 2.5, and at least 1, when `whole`). */
function cleanStep(rough: number, whole: boolean): number {
  const power = 10 ** Math.floor(Math.log10(rough));
  const steps = STEPS.map((each) => each * power).filter((each) => !whole || Number.isInteger(each));
  const step = steps.find((each) => each >= rough) ?? 10 * power;
  return whole ? Math.max(1, step) : step;
}

// ── Public API ────────────────────────────
/** The range from `low` to `high` widened to clean ticks, about `count` steps apart. */
export function niceScale(
  low: number,
  high: number,
  { count = 4, whole = false, step: fixed }: ScaleOptions = {},
): Scale {
  const top = high > low ? high : low + 1;
  const usable = fixed !== undefined && fixed > 0 && (top - low) / fixed <= MAX_TICKS;
  const step = usable ? fixed : cleanStep((top - low) / Math.max(1, count), whole);
  const min = Math.floor(low / step) * step;
  const max = Math.ceil(top / step) * step;
  // Adding floats leaves noise like 0.30000000000000004; keep the step's decimals.
  const decimals = Math.max(0, -Math.floor(Math.log10(step)) + 1);
  const ticks: number[] = [];
  for (let value = min; value <= max + step / 2; value += step) ticks.push(Number(value.toFixed(decimals)));
  return { min, max: ticks.at(-1) ?? max, ticks };
}

/** How an axis writes its ticks: in full, or compact (10K, 2.5M) once the axis reaches 10,000. */
export function tickFormat(scale: Scale): (value: number) => string {
  const big = Math.max(Math.abs(scale.min), Math.abs(scale.max)) >= 10_000;
  return (value) => (big ? compact : plain).format(value);
}

/** A chart's value axis: its data runs from `low` to `high` (`values` are every value drawn), shaped by the app's
 * `axis` settings. Returns the scale and how its ticks read. */
export function valueAxis(low: number, high: number, values: number[], axis: ChartAxis = {}) {
  const whole = axis.ticks === "whole" || (axis.ticks !== "decimal" && values.every(Number.isInteger));
  const scale = niceScale(axis.min ?? low, axis.max ?? high, { count: axis.count, whole, step: axis.step });
  return { scale, tick: axis.format ?? tickFormat(scale) };
}

/** The width of the y axis's gutter: room for its longest tick label. */
export const gutterFor = (ticks: string[]) => Math.max(0, ...ticks.map((text) => text.length)) * CHAR + 10;

/** Show every nth x label, so labels `step` pixels apart don't touch. */
export const labelEvery = (labels: string[], step: number) =>
  Math.max(1, Math.ceil((Math.max(0, ...labels.map((text) => text.length)) * CHAR + 12) / (step || 1)));

/** A value written in full, the default for readouts and legends. */
export const formatPlain = (value: number) => plain.format(value);

/** A series' color: its own, else its slot's chart token in order. */
export const seriesColor = (index: number, own?: string) =>
  own ?? (index < SLOTS ? `var(--iro-chart-${index + 1})` : "var(--iro-fg-4)");

/** `share` of a whole as a rounded percentage: 0.234 → "23%"; a sliver that would round to 0 reads "<1%". */
export const percent = (share: number) => (share > 0 && share < 0.005 ? "<1%" : `${Math.round(share * 100)}%`);
