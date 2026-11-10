// The black hole, from UmeSync's minimise: the element turns, shrinks and is eaten from its edge inward (an SVG noise
// mask whose threshold rises), breaking into particles that spiral into a hole at its center, which then collapses
// in a flash. Particles take the colors of the UI they break off from. A half-size blurred copy of the canvas adds the
// bloom. Opening, it unfurls back out of the spot, turning back from the spin and coming into focus. Smooth motion
// plays shorter versions.

// ── Dependencies ──────────────────────────
import { css, type Rgb, shade } from "../color";
import type { BlackHoleOptions, EffectOptions } from "../options";
import { fitter } from "./fit";
import { liquidWarp, ring } from "./reveal";
import { colorsUnder } from "./stage";
import { frames, transition } from "./state";

// ── Constants ─────────────────────────────
const DISSOLVE = "iro-dissolve";
const COLS = 10;
const ROWS = 12;
/** Points on the jagged edge. */
const POINTS = 84;

// ── Types ─────────────────────────────────
/** A bit of UI on its way in, in polar coordinates around the hole: it always falls, and turns faster the closer it
 * gets, so the paths curl into a spiral. */
interface Particle {
  r: number;
  angle: number;
  /** Inward speed, px/s (negative: still flying outward). */
  fall: number;
  /** Angular speed at 120 px out, rad/s. */
  swirl: number;
  size: number;
  color: string;
  age: number;
}

// ── State ─────────────────────────────────
let threshold: SVGFEFuncAElement | null = null;
let warp: SVGFEDisplacementMapElement | null = null;

// ── Private helpers ───────────────────────
/** Warps the UI, then keeps only where noise is above a threshold: raising it eats the UI in blotches. */
function ensureFilter() {
  if (!document.getElementById(DISSOLVE)) {
    document.body.insertAdjacentHTML(
      "beforeend",
      `<svg width="0" height="0" style="position:absolute" aria-hidden="true">
        <filter id="${DISSOLVE}" x="-10%" y="-10%" width="120%" height="120%" color-interpolation-filters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.012 0.018" numOctaves="2" seed="5" result="flow" />
          <feDisplacementMap in="SourceGraphic" in2="flow" scale="0" xChannelSelector="R" yChannelSelector="G" result="warped" />
          <feTurbulence type="fractalNoise" baseFrequency="0.07" numOctaves="2" seed="9" />
          <feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  1 0 0 0 0" />
          <feComponentTransfer result="mask"><feFuncA type="linear" slope="16" intercept="0" /></feComponentTransfer>
          <feComposite in="warped" in2="mask" operator="in" />
        </filter>
      </svg>`,
    );
  }
  threshold = document.querySelector(`#${DISSOLVE} feFuncA`);
  warp = document.querySelector(`#${DISSOLVE} feDisplacementMap`);
}

const clamp = (n: number) => Math.min(1, Math.max(0, n));
const smooth = (a: number, b: number, t: number) => {
  const x = clamp((t - a) / (b - a));
  return x * x * (3 - 2 * x);
};
const easeOut = (t: number) => 1 - (1 - t) ** 3;
const easeOutQuint = (t: number) => 1 - (1 - t) ** 5;
const pick = <T>(items: T[]) => items[Math.floor(Math.random() * items.length)];

/** A canvas over the whole viewport, for drawing past the element's edge. */
function overlay(zIndex: number, width: number, height: number): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(width));
  canvas.height = Math.max(1, Math.round(height));
  canvas.setAttribute("aria-hidden", "true");
  Object.assign(canvas.style, {
    position: "fixed",
    inset: "0",
    width: "100%",
    height: "100%",
    zIndex: String(zIndex),
    pointerEvents: "none",
  });
  document.body.appendChild(canvas);
  return canvas;
}

/** Plays the effect on `node`, which is shown and laid out; resolves once it's gone (true) or another effect took
 *  over (false). */
async function disintegrate(
  node: HTMLElement,
  full: boolean,
  speed: number,
  almostGone?: () => void,
): Promise<boolean> {
  ensureFilter();
  const rect = node.getBoundingClientRect();
  const width = node.offsetWidth;
  const height = node.offsetHeight;
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;
  const reach = Math.hypot(width / 2, height / 2);
  // The viewport's edge cuts off whatever goes past it: the UI shrinks enough to stay inside while it turns, and
  // particles out by the edge neither fly out nor swirl along it.
  const fitTo = fitter(node);
  const inner = Math.min(cx, innerWidth - cx, cy, innerHeight - cy) - 8;
  const corner = parseFloat(getComputedStyle(node).borderTopLeftRadius) || 0;

  const accent = shade(node, "var(--iro-accent)");
  const hot = shade(node, "var(--iro-spark)");
  const second = shade(node, "var(--iro-glow-2)");
  const sparks = [accent, second, hot, ...["fg", "fg-2", "success"].map((name) => shade(node, `var(--iro-${name})`))];
  const sparkColors = sparks.map((rgb) => css(rgb));
  const backdrop = [
    "var(--iro-bg)",
    "color-mix(in oklab, var(--iro-bg) 70%, var(--iro-glow-1))",
    "color-mix(in oklab, var(--iro-bg) 80%, var(--iro-glow-2))",
    "color-mix(in oklab, var(--iro-bg) 85%, var(--iro-glow-3))",
  ].map((expression) => css(shade(node, expression)));
  const grid = colorsUnder(node, COLS, ROWS, backdrop);

  const ratio = devicePixelRatio || 1;
  const canvas = overlay(1000, innerWidth * ratio, innerHeight * ratio);
  const g = canvas.getContext("2d");
  // The bloom: each frame copied here at half size, then blurred, brightened and added on top, so bright bits glow.
  const bloom = overlay(1001, canvas.width / 2, canvas.height / 2);
  const b = bloom.getContext("2d");
  if (!g || !b) {
    canvas.remove();
    bloom.remove();
    return true;
  }
  g.scale(ratio, ratio);
  g.lineCap = "round";
  g.lineJoin = "round";
  Object.assign(bloom.style, {
    filter: `blur(${full ? 9 : 6}px) brightness(1.8) saturate(1.35)`,
    mixBlendMode: "plus-lighter",
    opacity: "0.9",
  });

  // The jagged edge: a polygon whose radius wobbles with a few waves around the circle, plus per-point jitter that
  // re-rolls in steps.
  const phases = [Math.random() * 6.3, Math.random() * 6.3, Math.random() * 6.3];
  const jitter = new Float32Array(POINTS);
  const edgeX = new Float32Array(POINTS);
  const edgeY = new Float32Array(POINTS);
  let jitterAt = -1;
  const edgeAt = (angle: number, time: number, i: number) =>
    0.5 * Math.sin(3 * angle + phases[0] + time * 3.1) +
    0.3 * Math.sin(7 * angle + phases[1] - time * 4.7) +
    0.2 * Math.sin(13 * angle + phases[2] + time * 6.3) +
    (i >= 0 ? jitter[i] : 0);

  const particles: Particle[] = [];
  const duration = full ? 1150 : 700; // the UI being eaten
  const tail = full ? 340 : 240; // the hole collapsing, then the flash
  const peak = full ? 1500 : 650; // particles per second at the busiest
  const spin = full ? 200 : 80; // degrees the UI turns while it falls
  const pull = full ? 190000 : 140000;
  const coreMax = full ? 26 : 18;
  const lead = full ? 170 : 110; // how long before the collapse `almostGone` runs
  let last = 0;
  let debt = 0;
  let feed = 0;
  let told = false;
  let shrink = 1;

  // Time runs in the effect's own milliseconds, so `speed` plays all of it faster or slower.
  const done = await frames(node, (duration + tail) / speed, (progress) => {
    const elapsed = progress * (duration + tail);
    const t = clamp(elapsed / duration);
    const u = clamp((elapsed - duration) / tail);
    const dt = Math.min(0.04, Math.max(0.001, (elapsed - last) / 1000));
    const time = elapsed / 1000;
    last = elapsed;

    // The UI: eaten from the edge in, turning, shaking a little, darkening.
    const eat = clamp((t - 0.06) / 0.94);
    const radius = Math.max(0, reach * (1 - eat ** 1.5));
    const jag = 0.035 + 0.2 * smooth(0, 0.8, t);
    const turn = spin * t ** 2.2;
    const theta = (turn * Math.PI) / 180;
    const shake = (full ? 3 : 1.5) * Math.sin(Math.PI * clamp(t / 0.35)) * (1 - t);
    // 1.35: the most the jagged edge sticks out. Only ever shrinking.
    shrink = Math.min(shrink, 1 - 0.5 * t * t, fitTo(theta, radius * (1 + jag * 1.35), 10 + shake));
    const scale = shrink;
    const sx = (Math.random() * 2 - 1) * shake;
    const sy = (Math.random() * 2 - 1) * shake;

    if (elapsed - jitterAt > 60) {
      jitterAt = elapsed;
      for (let i = 0; i < POINTS; i++) jitter[i] = (Math.random() * 2 - 1) * 0.35;
    }
    const points: string[] = [];
    for (let i = 0; i < POINTS; i++) {
      const angle = (i / POINTS) * Math.PI * 2;
      const r = Math.max(0, radius * (1 + jag * edgeAt(angle, time, i)));
      edgeX[i] = Math.cos(angle) * r;
      edgeY[i] = Math.sin(angle) * r;
      points.push(`${(width / 2 + edgeX[i]).toFixed(1)}px ${(height / 2 + edgeY[i]).toFixed(1)}px`);
    }
    node.style.clipPath = `polygon(${points.join(",")})`;
    node.style.transform = `translate(${sx.toFixed(2)}px, ${sy.toFixed(2)}px) rotate(${turn.toFixed(2)}deg) scale(${scale.toFixed(4)})`;
    node.style.filter =
      `url(#${DISSOLVE}) blur(${((full ? 3.2 : 1.8) * t * t).toFixed(2)}px) ` +
      `brightness(${(1 - 0.45 * t).toFixed(3)}) saturate(${(1 + 0.7 * t).toFixed(3)})`;
    node.style.opacity = String(1 - smooth(0.88, 1, t));
    threshold?.setAttribute("intercept", (-16 * (0.1 + 0.5 * t ** 1.6)).toFixed(3));
    warp?.setAttribute("scale", ((full ? 70 : 30) * t * t).toFixed(1));

    // New particles where the UI breaks, mostly at the edge, starting where that bit is on screen (turned and
    // scaled), with a kick outward before the pull wins.
    if (t < 1) {
      debt += peak * Math.sin(Math.PI * Math.min(1, eat * 1.08 + 0.04)) ** 0.6 * dt;
      while (debt >= 1) {
        debt -= 1;
        const angle = Math.random() * Math.PI * 2;
        const edge = radius * (1 + jag * edgeAt(angle, time, -1));
        const r = Math.random() < 0.72 ? edge * (0.86 + Math.random() * 0.14) : edge * Math.sqrt(Math.random()) * 0.9;
        const lx = Math.cos(angle) * r;
        const ly = Math.sin(angle) * r;
        if (Math.abs(lx) > width / 2 || Math.abs(ly) > height / 2) continue;
        const col = Math.min(COLS - 1, Math.floor(((lx + width / 2) / width) * COLS));
        const row = Math.min(ROWS - 1, Math.floor(((ly + height / 2) / height) * ROWS));
        const room = Math.min(
          cx + Math.cos(angle + theta) * r * scale,
          innerWidth - cx - Math.cos(angle + theta) * r * scale,
          cy + Math.sin(angle + theta) * r * scale,
          innerHeight - cy - Math.sin(angle + theta) * r * scale,
        );
        particles.push({
          r: r * scale,
          angle: angle + theta,
          fall: -(15 + Math.random() * (full ? 110 : 50)) * clamp((room - 20) / 80),
          swirl: (full ? 2.4 : 1.6) * (0.7 + Math.random() * 0.6),
          size: 1.2 + Math.random() * (full ? 3 : 2.2),
          color: Math.random() < 0.82 ? pick(grid[row * COLS + col]) : pick(sparkColors),
          age: 0,
        });
      }
    }

    // The hole: grows as it feeds, collapses at the end.
    const collapse = u > 0 ? clamp(u / 0.45) ** 2 : 0;
    feed *= Math.exp(-dt * 6);
    const core = coreMax * smooth(0.02, 0.35, t) * (1 + Math.min(0.3, feed)) * (1 - collapse);

    // Particles: pulled harder the closer they get (and the later it is), swallowed at the horizon. Drawn as
    // streaks back along their path, grouped by color and width so a frame is a few dozen strokes.
    g.clearRect(0, 0, innerWidth, innerHeight);
    const strength = pull * (0.4 + 2.4 * t + 9 * u);
    const buckets = new Map<string, number[]>();
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.age += dt;
      p.fall = Math.min(2200, (p.fall + (strength / Math.max(p.r, 20)) * dt) * Math.exp(-dt * 0.6));
      p.r -= p.fall * dt;
      const omega = p.swirl * (120 / Math.max(p.r, 16)) ** 0.9 * clamp((inner - p.r) / 50);
      p.angle += omega * dt;
      if (p.r < Math.max(4, core * 0.85) || p.age > 1.8) {
        particles.splice(i, 1);
        feed += 0.006;
        continue;
      }
      const back = 0.025;
      const r0 = p.r + p.fall * back;
      const a0 = p.angle - omega * back;
      const size = p.size * Math.min(1, p.r / 70) + 0.6;
      const key = `${p.color}|${Math.round(size)}`;
      let list = buckets.get(key);
      if (!list) {
        list = [];
        buckets.set(key, list);
      }
      list.push(
        cx + Math.cos(a0) * r0,
        cy + Math.sin(a0) * r0,
        cx + Math.cos(p.angle) * p.r,
        cy + Math.sin(p.angle) * p.r,
      );
    }
    g.globalAlpha = 0.92;
    for (const [key, list] of buckets) {
      const [color, lineWidth] = key.split("|");
      g.strokeStyle = color;
      g.lineWidth = Number(lineWidth);
      g.beginPath();
      for (let i = 0; i < list.length; i += 4) {
        g.moveTo(list[i], list[i + 1]);
        g.lineTo(list[i + 2] + 0.01, list[i + 3]);
      }
      g.stroke();
    }
    g.globalAlpha = 1;

    // The burning edge: the jagged outline where the UI breaks off, white-hot inside a glow, kept to the
    // element's (turned) shape.
    const burn = smooth(0.03, 0.18, t) * (1 - smooth(0.86, 1, t));
    if (burn > 0.01) {
      g.save();
      g.translate(cx + sx, cy + sy);
      g.rotate(theta);
      g.scale(scale, scale);
      g.beginPath();
      g.roundRect(-width / 2, -height / 2, width, height, corner);
      g.clip();
      g.beginPath();
      g.moveTo(edgeX[0], edgeY[0]);
      for (let i = 1; i < POINTS; i++) g.lineTo(edgeX[i], edgeY[i]);
      g.closePath();
      g.strokeStyle = css(hot, 0.7 * burn);
      g.lineWidth = (full ? 5 : 3.5) / scale;
      g.stroke();
      g.strokeStyle = css([255, 255, 255], 0.85 * burn);
      g.lineWidth = 1.3 / scale;
      g.stroke();
      g.restore();
    }

    if (core > 0.4) drawHole(g, cx, cy, core, coreMax, time, accent, second, hot);

    if (u > 0.3) {
      // The flash: a bright point and a ring that bursts out of it.
      const v = clamp((u - 0.3) / 0.7);
      const fade = 1 - v;
      g.fillStyle = css([255, 255, 255], 0.9 * fade * fade);
      g.beginPath();
      g.arc(cx, cy, 3 + 9 * (1 - v), 0, Math.PI * 2);
      g.fill();
      g.strokeStyle = css(hot, fade);
      g.lineWidth = 4 * fade + 0.5;
      g.beginPath();
      g.arc(cx, cy, 4 + (full ? 64 : 44) * easeOut(v), 0, Math.PI * 2);
      g.stroke();
    }

    b.clearRect(0, 0, bloom.width, bloom.height);
    b.drawImage(canvas, 0, 0, bloom.width, bloom.height);

    if (!told && elapsed >= duration - lead) {
      told = true;
      almostGone?.();
    }
  });

  if (done && !told) almostGone?.();
  canvas.remove();
  bloom.remove();
  return done;
}

/** The hole: a glow, a spinning accretion disk, then the black horizon with a rim. */
function drawHole(
  g: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  core: number,
  coreMax: number,
  time: number,
  accent: Rgb,
  second: Rgb,
  hot: Rgb,
) {
  const glow = g.createRadialGradient(cx, cy, core * 0.8, cx, cy, core * 3.2);
  glow.addColorStop(0, css(accent, 0.55));
  glow.addColorStop(0.5, css(second, 0.18));
  glow.addColorStop(1, css(second, 0));
  g.fillStyle = glow;
  g.beginPath();
  g.arc(cx, cy, core * 3.2, 0, Math.PI * 2);
  g.fill();
  for (let k = 0; k < 3; k++) {
    const from = time * (9 - k * 2.5) + k * 2.1;
    g.strokeStyle = css(k === 1 ? second : accent, 0.9 - k * 0.2);
    g.lineWidth = Math.max(0.8, (2.6 - k * 0.6) * (core / coreMax));
    g.beginPath();
    g.arc(cx, cy, core * (1.25 + 0.28 * k), from, from + 1.7 - k * 0.3);
    g.stroke();
  }
  g.fillStyle = "black";
  g.beginPath();
  g.arc(cx, cy, core, 0, Math.PI * 2);
  g.fill();
  g.strokeStyle = css(hot, 0.95);
  g.lineWidth = 1.5;
  g.beginPath();
  g.arc(cx, cy, core + 1, 0, Math.PI * 2);
  g.stroke();
}

// ── Public API ────────────────────────────
/** Breaks `node` into particles that spiral into a black hole at its center; it stays hidden (`opacity: 0`) until an
 *  open effect. */
export function closeBlackHole(node: HTMLElement, options: BlackHoleOptions = {}): Promise<void> {
  const { almostGone } = options;
  return transition(
    node,
    "close",
    options,
    (full, speed) => disintegrate(node, full, speed, almostGone),
    () => almostGone?.(),
  );
}

/** Brings a hidden `node` back out of a black hole: it unfurls out of the spot, turning back from the spin and coming
 *  into focus. Shown elements are left as they are; `node` needs a position for the rim. */
export function openBlackHole(node: HTMLElement, options: EffectOptions = {}): Promise<void> {
  return transition(node, "open", options, (full, speed) => {
    const { id, displacement } = liquidWarp();
    ring(node);
    displacement?.setAttribute("scale", "0");
    const max = Math.hypot(node.offsetWidth / 2, node.offsetHeight / 2) + 24;
    const fitTo = fitter(node);
    return frames(node, (full ? 640 : 460) / speed, (t) => {
      const e = easeOutQuint(t);
      const radius = max * e;
      const turn = (full ? 36 : 14) * (1 - e);
      const scale = Math.min(0.62 + 0.38 * e, fitTo((turn * Math.PI) / 180, radius, 2));
      node.style.opacity = String(clamp(t * 4));
      node.style.clipPath = `circle(${radius.toFixed(1)}px at 50% 50%)`;
      node.style.transform = `rotate(${turn.toFixed(2)}deg) scale(${scale.toFixed(4)})`;
      node.style.filter = `url(#${id}) blur(${(5 * (1 - e)).toFixed(2)}px)`;
      node.style.setProperty("--reveal-r", `${radius.toFixed(1)}px`);
      node.style.setProperty("--reveal-glow", String(0.6 * (1 - t)));
      displacement?.setAttribute("scale", ((full ? 26 : 12) * (1 - t) ** 3).toFixed(2));
    });
  });
}
