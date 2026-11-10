// Shatter: the window breaks like a pane of glass struck at a point (its center, or `from`). Cracks race out from a
// crushed, frosted spot: jagged radial cracks that taper and branch, crossed by curved rings, hairlines that catch the
// light. The pane holds for a beat, then its shards fall away under gravity, tipping toward you and glinting as they
// turn, the ones nearest the blow first. Opening plays it backwards. Smooth motion lets the shards drop a little and
// fade, without tumbling.

// ── Dependencies ──────────────────────────
import { type ShatterOptions, spotOf } from "../options";
import { stage } from "./stage";
import { frames, transition } from "./state";

// ── Constants ─────────────────────────────
const SVG = "http://www.w3.org/2000/svg";
/** The rings that split shards, as parts of the reach, and how likely each is between two radial cracks. */
const RINGS = [
  { at: 0.22, chance: 0.95 },
  { at: 0.5, chance: 0.65 },
];

// ── Types ─────────────────────────────────
type Point = [number, number];

/** A radial crack: its points out from the blow, and which of them lie on each ring (the crushed spot first). */
interface Spoke {
  points: Point[];
  rings: number[];
  /** Each point's distance from the blow, as a part of the crack's length. */
  along: number[];
}

interface Shard {
  element: HTMLElement;
  edge: SVGSVGElement;
  sheen: HTMLElement;
  /** Seconds after the pane gives way before it moves: the shards nearest the blow first. */
  delay: number;
  vx: number;
  vy: number;
  /** Toward you, px/s. */
  vz: number;
  /** Degrees a second: in the plane, and tipping about x and y. */
  spin: number;
  tiltX: number;
  tiltY: number;
}

// ── Private helpers ───────────────────────
const clamp = (n: number) => Math.min(1, Math.max(0, n));
const smooth = (a: number, b: number, t: number) => {
  const x = clamp((t - a) / (b - a));
  return x * x * (3 - 2 * x);
};
const random = (a: number, b: number) => a + Math.random() * (b - a);
const pathOf = (points: Point[]) => `M${points.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join("L")}`;

/** A radial crack out of `[px, py]` along `angle`, jagged and gently bent, with a point on each of `radii`. */
function radial([px, py]: Point, angle: number, length: number, radii: number[]): Spoke {
  const bend = random(-0.12, 0.12);
  const points: Point[] = [[px, py]];
  const along = [0];
  const rings: number[] = [];
  let r = 0;
  let lateral = 0;
  while (r < length) {
    let next = r + random(5, 11);
    const ring = radii[rings.length];
    if (ring !== undefined && next >= ring) next = ring;
    // A wander that keeps returning to the line, with now and then a sharper kink.
    lateral = lateral * 0.88 + random(-1, 1) * (next - r) * 0.22 + (Math.random() < 0.07 ? random(-2.5, 2.5) : 0);
    r = next;
    const a = angle + bend * (r / length);
    points.push([px + Math.cos(a) * r - Math.sin(a) * lateral, py + Math.sin(a) * r + Math.cos(a) * lateral]);
    along.push(r / length);
    if (r === ring) rings.push(points.length - 1);
  }
  return { points, rings, along };
}

/** A ring crack around `[px, py]` from `a` to `b`, counterclockwise on screen, bowed a little and wavering. */
function arc([px, py]: Point, a: Point, b: Point): Point[] {
  const from = Math.atan2(a[1] - py, a[0] - px);
  let to = Math.atan2(b[1] - py, b[0] - px);
  while (to <= from) to += Math.PI * 2;
  const ra = Math.hypot(a[0] - px, a[1] - py);
  const rb = Math.hypot(b[0] - px, b[1] - py);
  const steps = Math.max(2, Math.round(((to - from) * (ra + rb)) / 2 / 9));
  const bow = random(-0.07, 0.05);
  const points: Point[] = [a];
  for (let i = 1; i < steps; i++) {
    const u = i / steps;
    const angle = from + (to - from) * u;
    const r = (ra + (rb - ra) * u) * (1 + bow * Math.sin(Math.PI * u)) + random(-1, 1);
    points.push([px + Math.cos(angle) * r, py + Math.sin(angle) * r]);
  }
  points.push(b);
  return points;
}

/** A crack drawn as a sliver that tapers from `wide` px at its start to `thin` at its end. */
function ribbon(points: Point[], along: number[], wide: number, thin: number): string {
  const left: Point[] = [];
  const right: Point[] = [];
  points.forEach(([x, y], i) => {
    const [ax, ay] = points[Math.max(0, i - 1)];
    const [bx, by] = points[Math.min(points.length - 1, i + 1)];
    const length = Math.hypot(bx - ax, by - ay) || 1;
    const half = (wide + (thin - wide) * along[i] ** 0.7) / 2;
    const nx = (-(by - ay) / length) * half;
    const ny = ((bx - ax) / length) * half;
    left.push([x + nx, y + ny]);
    right.push([x - nx, y - ny]);
  });
  return `${pathOf([...left, ...right.reverse()])}Z`;
}

/** Broken glass around `point`: the shards as polygons, and the cracks to draw. */
function breakAt(point: Point, width: number, height: number) {
  const [px, py] = point;
  const reach = Math.max(
    Math.hypot(px, py),
    Math.hypot(width - px, py),
    Math.hypot(px, height - py),
    Math.hypot(width - px, height - py),
  );
  const count = 8 + Math.floor(Math.random() * 3);
  const gaps = Array.from({ length: count }, () => random(0.55, 1.45));
  const total = gaps.reduce((sum, gap) => sum + gap, 0);
  let angle = random(0, Math.PI * 2);
  const crushed = Math.min(reach * 0.06, 16);
  const spokes = gaps.map((gap) => {
    const radii = [crushed * random(0.8, 1.2), ...RINGS.map((ring) => reach * ring.at * random(0.85, 1.15))];
    const spoke = radial(point, angle, reach * 1.5, radii);
    angle += (gap / total) * Math.PI * 2;
    return spoke;
  });

  const polygons: Point[][] = [];
  const hairlines: Point[][] = [];
  spokes.forEach((spoke, i) => {
    const next = spokes[(i + 1) % count];
    const arcs = spoke.rings.map((at, k) => arc(point, spoke.points[at], next.points[next.rings[k]]));
    // The crushed spot's ring is drawn but splits nothing; the others split the sector where they're there.
    hairlines.push(arcs[0]);
    const splits = RINGS.map((ring, k) => (Math.random() < ring.chance ? k + 1 : -1)).filter((k) => k > 0);
    for (const k of splits) hairlines.push(arcs[k]);
    const bounds = [-1, ...splits, -1];
    const last = bounds.length - 2;
    for (let b = 0; b <= last; b++) {
      const low = bounds[b];
      const high = bounds[b + 1];
      polygons.push([
        ...spoke.points.slice(
          b === 0 ? 0 : spoke.rings[low],
          (b === last ? spoke.points.length - 1 : spoke.rings[high]) + 1,
        ),
        ...(b === last ? [] : arcs[high].slice(1, -1)),
        ...next.points
          .slice(b === 0 ? 0 : next.rings[low], (b === last ? next.points.length - 1 : next.rings[high]) + 1)
          .reverse(),
        ...(b === 0 ? [] : arcs[low].slice(1, -1).reverse()),
      ]);
    }
    // Short branches off the radial crack.
    for (let n = 0; n < 2; n++) {
      const at = Math.max(1, Math.floor(random(0.15, 0.6) * spoke.points.length));
      const [x, y] = spoke.points[at];
      const [x0, y0] = spoke.points[at - 1];
      let heading = Math.atan2(y - y0, x - x0) + (Math.random() < 0.5 ? -1 : 1) * random(0.35, 0.8);
      const branch: Point[] = [[x, y]];
      for (let step = 0, length = random(14, 46); step < length; step += 6) {
        heading += random(-0.25, 0.25);
        const [bx, by] = branch[branch.length - 1];
        branch.push([bx + Math.cos(heading) * 6, by + Math.sin(heading) * 6]);
      }
      hairlines.push(branch);
    }
  });
  // Fine fractures in the crushed spot.
  for (let n = 0; n < 16; n++) {
    const a = random(0, Math.PI * 2);
    const r = random(0, crushed * 1.4);
    const b = random(0, Math.PI * 2);
    const length = random(3, 9);
    const x = px + Math.cos(a) * r;
    const y = py + Math.sin(a) * r;
    hairlines.push([
      [x, y],
      [x + Math.cos(b) * length, y + Math.sin(b) * length],
    ]);
  }
  return { polygons, spokes, hairlines, reach, crushed };
}

/** The cracks, drawn over the shards while the pane holds: each a light line over a faint dark one, as glass catches
 *  the light, and a frosted spot where it was struck. */
function cracks(width: number, height: number, point: Point, glass: ReturnType<typeof breakAt>, radius: string) {
  const holder = document.createElement("div");
  holder.className = "iro-shatter-glass";
  holder.style.clipPath = `inset(0 round ${radius})`;
  const svg = document.createElementNS(SVG, "svg");
  svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
  const ribbons = glass.spokes.map((spoke) => ribbon(spoke.points, spoke.along, 1.7, 0.25)).join("");
  const hairs = glass.hairlines.map(pathOf).join("");
  const layer = (kind: string) =>
    `<g class="iro-shatter-${kind}"${kind === "dark" ? ' transform="translate(0.6 0.8)"' : ""}><path class="iro-shatter-ribbon" d="${ribbons}" />` +
    `<path class="iro-shatter-hair" d="${hairs}" /></g>`;
  svg.innerHTML = layer("dark") + layer("light");
  const frost = document.createElement("div");
  frost.className = "iro-shatter-frost";
  const size = glass.crushed * 4;
  Object.assign(frost.style, {
    left: `${point[0] - size / 2}px`,
    top: `${point[1] - size / 2}px`,
    width: `${size}px`,
    height: `${size}px`,
  });
  holder.append(svg, frost);
  /** The cracks out to `grown` (0–1 of the reach) at `alpha`, and the frost at `frosted`. */
  const draw = (grown: number, alpha: number, frosted: number) => {
    svg.style.clipPath = `circle(${(glass.reach * 1.1 * grown).toFixed(1)}px at ${point[0]}px ${point[1]}px)`;
    holder.style.opacity = alpha.toFixed(3);
    frost.style.opacity = frosted.toFixed(3);
  };
  return { holder, draw };
}

/** Plays the shatter on `node`; `forward` breaks it, otherwise it comes back together. */
async function play(node: HTMLElement, full: boolean, speed: number, forward: boolean, options: ShatterOptions) {
  const scene = stage(node);
  const { width, height, box } = scene;
  const spot = spotOf(options.from, box);
  const point: Point = [clamp((spot.x - box.left) / width) * width, clamp((spot.y - box.top) / height) * height];
  const glass = breakAt(point, width, height);
  scene.element.style.perspective = `${Math.round(Math.max(width, height) * 2.4)}px`;

  const shards: Shard[] = [];
  for (const polygon of glass.polygons) {
    // The shard's box: its corners held to the window, which clips it anyway.
    const xs = polygon.map(([x]) => Math.min(width, Math.max(0, x)));
    const ys = polygon.map(([, y]) => Math.min(height, Math.max(0, y)));
    const left = Math.floor(Math.min(...xs));
    const top = Math.floor(Math.min(...ys));
    const right = Math.ceil(Math.max(...xs));
    const bottom = Math.ceil(Math.max(...ys));
    if (right - left < 2 || bottom - top < 2) continue;
    const element = document.createElement("div");
    element.className = "iro-shatter-shard";
    Object.assign(element.style, {
      left: `${left}px`,
      top: `${top}px`,
      width: `${right - left}px`,
      height: `${bottom - top}px`,
    });
    const copy = scene.copy();
    copy.style.left = `${-left}px`;
    copy.style.top = `${-top}px`;
    copy.style.clipPath = `polygon(${polygon.map(([x, y]) => `${x.toFixed(1)}px ${y.toFixed(1)}px`).join(",")})`;
    const sheen = document.createElement("div");
    sheen.className = "iro-shatter-sheen";
    copy.appendChild(sheen);
    const edge = document.createElementNS(SVG, "svg");
    edge.setAttribute("class", "iro-shatter-edge");
    edge.setAttribute("viewBox", `${left} ${top} ${right - left} ${bottom - top}`);
    // A faint dark line under the glint, so the edge shows on light windows too.
    edge.innerHTML = `<path class="iro-shatter-rim" d="${pathOf(polygon)}Z" /><path d="${pathOf(polygon)}Z" />`;
    element.append(copy, edge);
    scene.element.appendChild(element);
    const cx = (left + right) / 2 - point[0];
    const cy = (top + bottom) / 2 - point[1];
    const distance = Math.hypot(cx, cy) || 1;
    const near = 1 - Math.min(1, distance / glass.reach);
    const push = full ? random(20, 50) + 120 * near : 8;
    shards.push({
      element,
      edge,
      sheen,
      delay: (full ? 0.1 : 0.05) * (1 - near) + random(0, 0.05),
      vx: (cx / distance) * push,
      vy: (cy / distance) * push * 0.6 + (full ? random(-25, 10) : 0),
      vz: full ? random(30, 90) + 170 * near : 0,
      spin: random(-1, 1) * (full ? 70 : 12),
      tiltX: full ? random(-1, 1) * 170 : 0,
      tiltY: full ? random(-1, 1) * 170 : 0,
    });
  }
  const { holder, draw } = cracks(width, height, point, glass, getComputedStyle(node).borderRadius || "0");
  scene.element.appendChild(holder);

  // In the effect's own seconds: the cracks race out, the pane holds, then it falls. Opening, the shards land with
  // every crack showing, and the cracks fade out fast as the pane mends, so the hold is shorter.
  const crack = full ? 0.07 : 0.06;
  const hold = forward ? (full ? 0.3 : 0.18) : full ? 0.16 : 0.1;
  const fall = full ? 0.78 : 0.42;
  const gravity = full ? 2600 : 1100;
  const done = await frames(node, ((hold + fall) * 1000) / speed, (progress) => {
    const seconds = (forward ? progress : 1 - progress) * (hold + fall);
    node.style.opacity = "0";
    const grown = forward ? 1 - (1 - clamp(seconds / crack)) ** 3 : 1;
    const mending = forward ? 1 : smooth(0, hold * 0.85, seconds);
    const giving = (1 - smooth(hold, hold + 0.08, seconds)) * mending;
    const struck = forward ? 0.55 + 0.4 * (1 - smooth(0.01, crack * 2, seconds)) : 0.55;
    draw(grown, giving, giving * struck * (forward ? smooth(0, 0.012, seconds) : 1));
    for (const shard of shards) {
      const s = Math.max(0, seconds - hold - shard.delay);
      const x = shard.vx * s;
      const y = shard.vy * s + 0.5 * gravity * s * s;
      const tiltX = shard.tiltX * s;
      const tiltY = shard.tiltY * s;
      shard.element.style.transform =
        `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, ${(shard.vz * s).toFixed(1)}px) ` +
        `rotateX(${tiltX.toFixed(1)}deg) rotateY(${tiltY.toFixed(1)}deg) rotate(${(shard.spin * s).toFixed(1)}deg)`;
      shard.element.style.opacity = (1 - smooth(full ? 0.3 : 0.12, full ? 0.62 : 0.38, s)).toFixed(3);
      // The light runs across the glass as it tips.
      const glint = Math.abs(Math.sin(((tiltX + tiltY) * Math.PI) / 360));
      shard.sheen.style.opacity = (smooth(0, 0.06, s) * (0.25 + 0.75 * glint)).toFixed(3);
      shard.sheen.style.backgroundPosition = `${(50 + 50 * Math.sin((tiltY * Math.PI) / 180)).toFixed(1)}% 50%`;
      // The edges take over from the drawn cracks as the pane gives way, so each crack moves with its shard.
      shard.edge.style.opacity = (smooth(hold - 0.04, hold + 0.02, seconds) * (0.5 + 0.5 * glint)).toFixed(3);
    }
  });
  scene.remove();
  return done;
}

// ── Public API ────────────────────────────
/** Shatters `node` like glass struck at `options.from` (its center by default); it stays hidden (`opacity: 0`)
 *  until an open effect. */
export function closeShatter(node: HTMLElement, options: ShatterOptions = {}): Promise<void> {
  return transition(node, "close", options, (full, speed) => play(node, full, speed, true, options));
}

/** Brings a hidden `node` back: its shards rise and fit together, and the cracks close into the point. Shown
 *  elements are left as they are. */
export function openShatter(node: HTMLElement, options: ShatterOptions = {}): Promise<void> {
  return transition(node, "open", options, (full, speed) => play(node, full, speed, false, options));
}
