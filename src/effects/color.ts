// Turning CSS colors (tokens, color-mix) into numbers for canvas and WebGL, resolved inside an element so its style,
// theme and accent apply.

// ── Types ─────────────────────────────────
export type Rgb = [number, number, number];

// ── State ─────────────────────────────────
let probe: CanvasRenderingContext2D | null = null;

// ── Public API ────────────────────────────
/** [r, g, b, a] of any CSS color the browser can paint: 0–255, alpha 0–1. */
export function rgba(color: string): [number, number, number, number] {
  probe ??= document.createElement("canvas").getContext("2d", { willReadFrequently: true });
  if (!probe) return [0, 0, 0, 0];
  probe.clearRect(0, 0, 1, 1);
  probe.fillStyle = "transparent";
  probe.fillStyle = color;
  probe.fillRect(0, 0, 1, 1);
  const [r, g, b, a] = probe.getImageData(0, 0, 1, 1).data;
  return [r, g, b, a / 255];
}

/** A color expression (`var(--iro-accent)`, `color-mix(…)`) as RGB, resolved inside `element`. */
export function shade(element: Element, expression: string): Rgb {
  const span = document.createElement("span");
  span.style.color = expression;
  span.style.display = "none";
  element.appendChild(span);
  const [r, g, b] = rgba(getComputedStyle(span).color);
  span.remove();
  return [r, g, b];
}

/** An RGB triple as a CSS color, with optional alpha. */
export const css = ([r, g, b]: Rgb, alpha = 1) => `rgb(${r} ${g} ${b} / ${alpha})`;
