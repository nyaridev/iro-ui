// Burn: the window catches fire at its bottom edge and burns away upward along a ragged line: a white-hot edge, an
// orange flame with a glow around it, the picture charring just ahead of it. What burns lifts off as embers, white to
// orange to red, and flakes of ash, swaying as they rise. Opening plays it backwards: embers fall back into place and
// the window forms out of the flame. Smooth motion burns quicker, with fewer embers that rise less.

// ── Dependencies ──────────────────────────
import { shade } from "../color";
import type { EffectOptions } from "../options";
import { stage } from "./stage";
import { frames, transition } from "./state";

// ── Constants ─────────────────────────────
/** Room above and beside the window for the embers, in CSS pixels. */
const ROOM = { top: 150, side: 40 };
/** The burn's level runs from just under the lowest point of the map to just past the highest. */
const FROM = -0.08;
const TO = 1.1;

// ── Types ─────────────────────────────────
interface Mote {
  x: number;
  y: number;
  /** When it breaks off, 0–1 along the effect. */
  when: number;
  /** Seconds it lives. */
  life: number;
  vx: number;
  vy: number;
  sway: number;
  size: number;
  ash: boolean;
}

// ── State ─────────────────────────────────
let filters = 0;

// ── Private helpers ───────────────────────
const clamp = (n: number) => Math.min(1, Math.max(0, n));
const random = (a: number, b: number) => a + Math.random() * (b - a);

/** Where the fire reaches first (0) and last (1) over a `cols` by `rows` grid: the bottom first, along a ragged line
 *  of value noise. */
function burnMap(cols: number, rows: number): Float32Array {
  const octaves = [5, 10, 20, 40].map((cells) => {
    const across = cells + 1;
    const down = Math.ceil((cells * rows) / cols) + 1;
    return { cells, across, values: Float32Array.from({ length: across * (down + 1) }, () => Math.random()) };
  });
  const depth = new Float32Array(cols * rows);
  let low = Infinity;
  let high = -Infinity;
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      let noise = 0;
      let weight = 0.5;
      for (const { cells, across, values } of octaves) {
        const x = (i / cols) * cells;
        const y = (j / cols) * cells;
        const xi = Math.floor(x);
        const yi = Math.floor(y);
        const u = (x - xi) * (x - xi) * (3 - 2 * (x - xi));
        const v = (y - yi) * (y - yi) * (3 - 2 * (y - yi));
        const at = (a: number, b: number) => values[(yi + b) * across + xi + a];
        noise += weight * ((at(0, 0) * (1 - u) + at(1, 0) * u) * (1 - v) + (at(0, 1) * (1 - u) + at(1, 1) * u) * v);
        weight /= 2;
      }
      const value = 0.6 * (1 - j / (rows - 1)) + 0.04 * (i / (cols - 1)) + 0.5 * noise;
      depth[j * cols + i] = value;
      low = Math.min(low, value);
      high = Math.max(high, value);
    }
  }
  for (let i = 0; i < depth.length; i++) depth[i] = (depth[i] - low) / (high - low);
  return depth;
}

/** The map as an image for the filter: red is the level the fire must reach. */
function mapImage(depth: Float32Array, cols: number, rows: number): string {
  const canvas = document.createElement("canvas");
  canvas.width = cols;
  canvas.height = rows;
  const g = canvas.getContext("2d");
  const image = g?.createImageData(cols, rows);
  if (!g || !image) return "";
  for (let i = 0; i < depth.length; i++) image.data.set([Math.round(255 * depth[i]), 0, 0, 255], i * 4);
  g.putImageData(image, 0, 0);
  return canvas.toDataURL();
}

/** The SVG filter: the picture kept above the fire's level, charred just ahead of it, with a white-hot edge and a
 *  glowing flame just behind it, all within the window's shape. */
function fire(href: string, width: number, height: number) {
  const id = `iro-burn-${++filters}`;
  const band = (name: string) =>
    `<feComponentTransfer in="depth" result="${name}"><feFuncA type="linear" /></feComponentTransfer>`;
  document.body.insertAdjacentHTML(
    "beforeend",
    `<svg width="0" height="0" style="position:absolute" aria-hidden="true">
      <filter id="${id}" x="0" y="0" width="1" height="1" color-interpolation-filters="sRGB">
        <feImage href="${href}" x="0" y="0" width="${width}" height="${height}" preserveAspectRatio="none" />
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0" result="depth" />
        ${band("keep")}${band("sound")}${band("core")}${band("flame")}
        <feComposite in="SourceGraphic" in2="keep" operator="in" result="left" />
        <feComposite in="keep" in2="sound" operator="out" result="scorched" />
        <feFlood flood-color="rgb(28 12 4)" flood-opacity="0.8" />
        <feComposite in2="scorched" operator="in" />
        <feComposite in2="left" operator="in" result="char" />
        <feComposite in="flame" in2="keep" operator="out" />
        <feComposite in2="SourceAlpha" operator="in" result="flameBand" />
        <feFlood flood-color="rgb(255 120 30)" />
        <feComposite in2="flameBand" operator="in" result="flames" />
        <feGaussianBlur in="flames" stdDeviation="4" result="glow" />
        <feComposite in="core" in2="keep" operator="out" />
        <feComposite in2="SourceAlpha" operator="in" result="coreBand" />
        <feFlood flood-color="rgb(255 244 210)" />
        <feComposite in2="coreBand" operator="in" result="hot" />
        <feMerge>
          <feMergeNode in="left" /><feMergeNode in="char" /><feMergeNode in="glow" />
          <feMergeNode in="flames" /><feMergeNode in="hot" />
        </feMerge>
      </filter>
    </svg>`,
  );
  const svg = document.body.lastElementChild as SVGSVGElement;
  const funcs = Object.fromEntries(
    ["keep", "sound", "core", "flame"].map((name) => [
      name,
      svg.querySelector(`[result="${name}"] feFuncA`) as SVGFEFuncAElement,
    ]),
  );
  /** A threshold on the map: fully on `width`/1 above `level`, off below it. */
  const edge = (name: string, level: number, steep: number) => {
    funcs[name].setAttribute("slope", String(steep));
    funcs[name].setAttribute("intercept", (-steep * level).toFixed(3));
  };
  /** The fire at `level` (0–1 along the map); `heat` dims the flame as it dies out. */
  const burn = (level: number, heat: number) => {
    edge("keep", level, 26);
    edge("sound", level + 0.08, 9);
    edge("core", level - 0.014 * heat, 30);
    edge("flame", level - 0.055 * heat, 16);
  };
  return { filter: `url(#${id})`, burn, remove: () => svg.remove() };
}

/** The embers and ash that break off where the fire passes, decided up front so the effect plays either way. */
function motes(depth: Float32Array, cols: number, rows: number, width: number, height: number, full: boolean) {
  const list: Mote[] = [];
  const chance = full ? 0.09 : 0.035;
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      if (Math.random() > chance) continue;
      const ash = Math.random() < 0.28;
      list.push({
        x: ((i + Math.random()) / cols) * width,
        y: ((j + Math.random()) / rows) * height,
        when: (depth[j * cols + i] - FROM) / (TO - FROM),
        life: ash ? random(0.6, 1.1) : random(0.35, 0.9),
        vx: random(-16, 16),
        vy: -(ash ? random(25, 60) : random(50, 130)) * (full ? 1 : 0.5),
        sway: random(0, Math.PI * 2),
        size: ash ? random(1.5, 3.4) : random(1, 2.4),
        ash,
      });
    }
  }
  return list;
}

/** An ember's color as it cools: white-hot, then orange, then deep red. */
function ember(age: number): [number, number, number] {
  if (age < 0.3) {
    const k = age / 0.3;
    return [255, 244 - 74 * k, 208 - 150 * k];
  }
  const k = clamp((age - 0.3) / 0.7);
  return [255 - 55 * k, 170 - 130 * k, 58 - 40 * k];
}

/** Plays the burn on `node`; `forward` burns it away, otherwise it forms out of the flame. */
async function play(node: HTMLElement, full: boolean, speed: number, forward: boolean) {
  const scene = stage(node);
  const { width, height } = scene;
  const cols = 150;
  const rows = Math.max(8, Math.round((cols * height) / width));
  const depth = burnMap(cols, rows);
  const flame = fire(mapImage(depth, cols, rows), width, height);
  const list = motes(depth, cols, rows, width, height, full);
  const [r, g, b] = shade(node, "var(--iro-bg)");
  const dark = 0.2126 * r + 0.7152 * g + 0.0722 * b < 128;

  const canvas = document.createElement("canvas");
  const ratio = devicePixelRatio || 1;
  const canvasWidth = width + 2 * ROOM.side;
  const canvasHeight = height + ROOM.top;
  canvas.width = Math.round(canvasWidth * ratio);
  canvas.height = Math.round(canvasHeight * ratio);
  Object.assign(canvas.style, {
    position: "absolute",
    left: `${-ROOM.side}px`,
    top: `${-ROOM.top}px`,
    width: `${canvasWidth}px`,
    height: `${canvasHeight}px`,
  });
  scene.element.appendChild(canvas);
  const pen = canvas.getContext("2d");
  pen?.setTransform(ratio, 0, 0, ratio, ROOM.side * ratio, ROOM.top * ratio);
  const duration = full ? 1600 : 950;

  const done = await frames(node, duration / speed, (progress) => {
    const t = forward ? progress : 1 - progress;
    const level = FROM + (TO - FROM) * t;
    flame.burn(level, 1 - clamp((t - 0.88) / 0.12));
    node.style.filter = flame.filter;
    node.style.opacity = "1";
    if (!pen) return;
    pen.clearRect(-ROOM.side, -ROOM.top, canvasWidth, canvasHeight);
    for (const mote of list) {
      const seconds = (t - mote.when) * (duration / 1000);
      if (seconds < 0 || seconds > mote.life) continue;
      const age = seconds / mote.life;
      const x = mote.x + mote.vx * seconds + 6 * Math.sin(mote.sway + seconds * 5) * age;
      const y = mote.y + mote.vy * seconds - 30 * seconds * seconds;
      const size = mote.size * (1 - 0.5 * age);
      if (mote.ash) {
        pen.globalCompositeOperation = "source-over";
        pen.fillStyle = dark ? `rgb(120 110 104 / ${0.55 * (1 - age)})` : `rgb(40 34 30 / ${0.7 * (1 - age)})`;
      } else {
        pen.globalCompositeOperation = dark ? "lighter" : "source-over";
        const flicker = 0.75 + 0.25 * Math.sin(mote.sway * 7 + seconds * 31);
        const [er, eg, eb] = ember(age);
        pen.fillStyle = `rgb(${er} ${eg} ${eb} / ${((1 - age) ** 1.2 * flicker).toFixed(3)})`;
      }
      pen.fillRect(x - size / 2, y - size / 2, size, size);
    }
  });
  flame.remove();
  scene.remove();
  return done;
}

// ── Public API ────────────────────────────
/** Burns `node` away from its bottom edge, into embers and ash; it stays hidden (`opacity: 0`) until an open
 *  effect. */
export function closeBurn(node: HTMLElement, options: EffectOptions = {}): Promise<void> {
  return transition(node, "close", options, (full, speed) => play(node, full, speed, true));
}

/** Brings a hidden `node` back out of the flame, embers settling into place. Shown elements are left as they are. */
export function openBurn(node: HTMLElement, options: EffectOptions = {}): Promise<void> {
  return transition(node, "open", options, (full, speed) => play(node, full, speed, false));
}
