// Chart paths: lines (straight or smooth without overshoot), the areas under them, bars with one rounded end, and
// donut arcs. All coordinates are SVG pixels.

// ── Types ─────────────────────────────────
export type Point = [x: number, y: number];

/** Which end of a bar is rounded: the end away from the baseline. */
export type BarEnd = "top" | "bottom" | "right";

// ── Private helpers ───────────────────────
const n = (value: number) => Math.round(value * 100) / 100;

/** Tangents for a monotone cubic through the points (Fritsch–Carlson), so a smooth line never swings past its data. */
function tangents(points: Point[]): number[] {
  const slopes = points.slice(1).map(([x, y], i) => (y - points[i][1]) / (x - points[i][0]));
  const result = points.map((_, i) => {
    if (i === 0) return slopes[0];
    if (i === points.length - 1) return slopes[i - 1];
    return slopes[i - 1] * slopes[i] <= 0 ? 0 : (slopes[i - 1] + slopes[i]) / 2;
  });
  slopes.forEach((slope, i) => {
    if (slope === 0) {
      result[i] = 0;
      result[i + 1] = 0;
      return;
    }
    const a = result[i] / slope;
    const b = result[i + 1] / slope;
    const size = a * a + b * b;
    if (size > 9) {
      const k = 3 / Math.sqrt(size);
      result[i] = k * a * slope;
      result[i + 1] = k * b * slope;
    }
  });
  return result;
}

// ── Public API ────────────────────────────
/** A line through the points; `smooth` bends it through them without overshooting. */
export function linePath(points: Point[], smooth = false): string {
  if (points.length === 0) return "";
  const [[x0, y0]] = points;
  if (!smooth || points.length < 3)
    return `M${n(x0)},${n(y0)}${points
      .slice(1)
      .map(([x, y]) => `L${n(x)},${n(y)}`)
      .join("")}`;
  const t = tangents(points);
  const curves = points.slice(1).map(([x, y], i) => {
    const [px, py] = points[i];
    const third = (x - px) / 3;
    return `C${n(px + third)},${n(py + t[i] * third)} ${n(x - third)},${n(y - t[i + 1] * third)} ${n(x)},${n(y)}`;
  });
  return `M${n(x0)},${n(y0)}${curves.join("")}`;
}

/** The line closed down to `baseline`: the area under it. */
export function areaPath(points: Point[], baseline: number, smooth = false): string {
  if (points.length === 0) return "";
  const first = points[0][0];
  const last = points[points.length - 1][0];
  return `${linePath(points, smooth)}L${n(last)},${n(baseline)}L${n(first)},${n(baseline)}Z`;
}

/** Runs of points without gaps: a null value breaks the line. */
export function runs(points: (Point | null)[]): Point[][] {
  const result: Point[][] = [[]];
  for (const point of points) {
    if (point) result[result.length - 1].push(point);
    else if (result[result.length - 1].length > 0) result.push([]);
  }
  return result.filter((run) => run.length > 0);
}

/** A bar from (x, y), `w` wide and `h` tall, with its `end` rounded by `r` and the base square. */
export function barPath(x: number, y: number, w: number, h: number, r: number, end: BarEnd): string {
  const radius = Math.max(0, Math.min(r, w / 2, h / 2));
  const [right, bottom] = [x + w, y + h];
  const arc = `A${n(radius)},${n(radius)} 0 0 1`;
  if (end === "top")
    return `M${n(x)},${n(bottom)}V${n(y + radius)}${arc} ${n(x + radius)},${n(y)}H${n(right - radius)}${arc} ${n(right)},${n(y + radius)}V${n(bottom)}Z`;
  if (end === "bottom")
    return `M${n(x)},${n(y)}H${n(right)}V${n(bottom - radius)}${arc} ${n(right - radius)},${n(bottom)}H${n(x + radius)}${arc} ${n(x)},${n(bottom - radius)}Z`;
  return `M${n(x)},${n(y)}H${n(right - radius)}${arc} ${n(right)},${n(y + radius)}V${n(bottom - radius)}${arc} ${n(right - radius)},${n(bottom)}H${n(x)}Z`;
}

/** An arc of radius `r` around (cx, cy) from `start` to `end`, in turns clockwise from the top (0.25 is 3 o'clock). */
export function arcPath(cx: number, cy: number, r: number, start: number, end: number): string {
  const at = (turn: number): Point => [cx + r * Math.sin(turn * 2 * Math.PI), cy - r * Math.cos(turn * 2 * Math.PI)];
  const [x0, y0] = at(start);
  // A full circle can't be one arc (its ends meet), so stop a hair short.
  const [x1, y1] = at(Math.min(end, start + 0.9999));
  const large = end - start > 0.5 ? 1 : 0;
  return `M${n(x0)},${n(y0)}A${n(r)},${n(r)} 0 ${large} 1 ${n(x1)},${n(y1)}`;
}
