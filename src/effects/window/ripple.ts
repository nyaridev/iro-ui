// Ripple: a drop falls on the window (its center, or `from`: a button, a click) and rings of ripples spread across
// it like water seen from a little above. The picture bends through each ripple and the crests catch the light from
// the top left, while the window washes away from the drop outward, under the waves. Opening, the window wells up
// from the drop as the rings spread. Smooth motion makes shallower ripples and plays quicker.

// ── Dependencies ──────────────────────────
import { type RippleOptions, spotOf } from "../options";
import { frames, transition } from "./state";

// ── Constants ─────────────────────────────
/** Pixels across the ripple map; the browser smooths it up to the ring's size. */
const MAP = 360;
/** Where the leading crest sits in the map, as a part of its radius. */
const FRONT = 0.86;

// ── State ─────────────────────────────────
let map: string | null = null;
let filters = 0;

// ── Private helpers ───────────────────────
const clamp = (n: number) => Math.min(1, Math.max(0, n));
const smooth = (a: number, b: number, t: number) => {
  const x = clamp((t - a) / (b - a));
  return x * x * (3 - 2 * x);
};

/** The water's height at `rho` (0 the drop, 1 the map's edge): a leading crest and the smaller ripples behind it. */
function height(rho: number): number {
  const ahead = rho - FRONT;
  const envelope = ahead > 0 ? Math.exp(-((ahead / 0.06) ** 2)) : Math.exp(-((ahead / 0.4) ** 2)) * (0.3 + 0.7 * rho);
  return envelope * Math.cos((2 * Math.PI * ahead) / 0.16);
}

/** One ring of ripples as an image, drawn once: red and green push the picture sideways by the water's slope (128 is
 *  still), blue is the water's height, for the light. */
function rippleMap(): string {
  if (map) return map;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = MAP;
  const g = canvas.getContext("2d");
  const image = g?.createImageData(MAP, MAP);
  if (!g || !image) return "";
  const half = MAP / 2;
  const step = 1 / half;
  let steepest = 0;
  const slopes = new Float32Array(MAP * MAP);
  for (let i = 0; i < MAP * MAP; i++) {
    const rho = Math.hypot((i % MAP) + 0.5 - half, Math.floor(i / MAP) + 0.5 - half) / half;
    slopes[i] = (height(rho + step) - height(rho - step)) / (2 * step);
    steepest = Math.max(steepest, Math.abs(slopes[i]));
  }
  for (let i = 0; i < MAP * MAP; i++) {
    const x = (i % MAP) + 0.5 - half;
    const y = Math.floor(i / MAP) + 0.5 - half;
    const rho = Math.hypot(x, y) / half;
    const slope = slopes[i] / steepest;
    const reach = rho > 0 ? 1 / (rho * half) : 0;
    image.data.set(
      [
        Math.round(128 + 127 * slope * x * reach),
        Math.round(128 + 127 * slope * y * reach),
        Math.round(128 + 127 * height(rho)),
        255,
      ],
      i * 4,
    );
  }
  g.putImageData(image, 0, 0);
  map = canvas.toDataURL();
  return map;
}

/** The SVG filter: two rings of ripples bending the picture, and their crests lit. */
function water() {
  const id = `iro-ripple-${++filters}`;
  const href = rippleMap();
  document.body.insertAdjacentHTML(
    "beforeend",
    `<svg width="0" height="0" style="position:absolute" aria-hidden="true">
      <filter id="${id}" x="-5%" y="-5%" width="110%" height="110%" color-interpolation-filters="sRGB">
        <feFlood flood-color="rgb(128 128 128)" result="calm" />
        <feImage href="${href}" preserveAspectRatio="none" />
        <feComposite in2="calm" operator="over" result="first" />
        <feImage href="${href}" preserveAspectRatio="none" />
        <feComposite in2="calm" operator="over" result="second" />
        <feComposite in="first" in2="second" operator="arithmetic" k2="1" k3="1" k4="-0.5" result="water" />
        <feDisplacementMap in="SourceGraphic" in2="water" scale="0" xChannelSelector="R" yChannelSelector="G" result="bent" />
        <feColorMatrix in="water" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 0" result="height" />
        <feDiffuseLighting in="height" surfaceScale="0" diffuseConstant="2" lighting-color="white" result="relief">
          <feDistantLight azimuth="225" elevation="30" />
        </feDiffuseLighting>
        <feComposite in="bent" in2="relief" operator="arithmetic" k1="0" k2="1" result="shaded" />
        <feSpecularLighting in="height" surfaceScale="0" specularConstant="1" specularExponent="26" lighting-color="white">
          <feDistantLight azimuth="225" elevation="30" />
        </feSpecularLighting>
        <feComposite in2="bent" operator="in" result="glint" />
        <feComposite in="shaded" in2="glint" operator="arithmetic" k2="1" k3="0" />
      </filter>
    </svg>`,
  );
  const svg = document.body.lastElementChild as SVGSVGElement;
  const rings = [...svg.querySelectorAll("feImage")];
  const bend = svg.querySelector("feDisplacementMap") as SVGFEDisplacementMapElement;
  const light = svg.querySelector("feSpecularLighting") as SVGFESpecularLightingElement;
  const relief = svg.querySelector("feDiffuseLighting") as SVGFEDiffuseLightingElement;
  const shading = svg.querySelector('[result="shaded"]') as SVGFECompositeElement;
  const glint = svg.lastElementChild?.lastElementChild as SVGFECompositeElement;
  /** A ring whose leading crest is `radius` px out from `[x, y]`; 0 hides it. */
  const ring = (index: number, x: number, y: number, radius: number) => {
    const size = Math.max(radius, 0.01) / FRONT;
    rings[index].setAttribute("x", (x - size).toFixed(1));
    rings[index].setAttribute("y", (y - size).toFixed(1));
    rings[index].setAttribute("width", (radius > 0 ? 2 * size : 0).toFixed(1));
    rings[index].setAttribute("height", (radius > 0 ? 2 * size : 0).toFixed(1));
  };
  /** Ripples `depth` px deep, lit at `shine` (0–1): crests catch the light, troughs fall into shade. */
  const surface = (depth: number, shine: number) => {
    bend.setAttribute("scale", depth.toFixed(2));
    light.setAttribute("surfaceScale", (depth / 3).toFixed(2));
    relief.setAttribute("surfaceScale", (depth / 3).toFixed(2));
    // The picture times the light on the water, mixed with the picture as it is.
    shading.setAttribute("k1", (0.55 * shine).toFixed(3));
    shading.setAttribute("k2", (1 - 0.55 * shine).toFixed(3));
    glint.setAttribute("k3", shine.toFixed(3));
  };
  return { filter: `url(#${id})`, ring, surface, remove: () => svg.remove() };
}

/** Plays the ripple on `node`; closing washes it away from the drop, opening wells it up from there. */
async function play(node: HTMLElement, full: boolean, speed: number, closing: boolean, options: RippleOptions) {
  const box = node.getBoundingClientRect();
  const width = node.offsetWidth;
  const height = node.offsetHeight;
  const spot = spotOf(options.from, box);
  const x = clamp((spot.x - box.left) / box.width) * width;
  const y = clamp((spot.y - box.top) / box.height) * height;
  const reach = Math.max(
    Math.hypot(x, y),
    Math.hypot(width - x, y),
    Math.hypot(x, height - y),
    Math.hypot(width - x, height - y),
  );
  const pool = water();
  const spread = (t: number) => (t <= 0 ? 0 : Math.max(18, reach * 1.35 * (1 - (1 - clamp(t)) ** 2.2)));

  const done = await frames(node, (full ? 1450 : 900) / speed, (t) => {
    const front = spread(t);
    pool.ring(0, x, y, front);
    pool.ring(1, x, y, full ? 0.72 * spread(t - 0.16) : 0);
    const calm = (1 - t) ** 0.8;
    pool.surface((full ? 24 : 11) * calm * smooth(0, 0.04, t), (full ? 0.85 : 0.5) * calm);
    // The window fades under the waves behind the leading crest, and is gone by the end.
    const clear = front * (0.38 + 0.47 * t * t);
    const edge = front * (0.95 + 0.1 * t) + 10;
    const [inside, outside] = closing ? ["transparent", "black"] : ["black", "transparent"];
    node.style.maskImage = `radial-gradient(circle at ${x.toFixed(1)}px ${y.toFixed(1)}px, ${inside} ${clear.toFixed(1)}px, ${outside} ${edge.toFixed(1)}px)`;
    node.style.filter = pool.filter;
    node.style.opacity = "1";
  });
  pool.remove();
  return done;
}

// ── Public API ────────────────────────────
/** Drops water on `node` at `options.from` (its center by default): ripples spread and wash it away; it stays
 *  hidden (`opacity: 0`) until an open effect. */
export function closeRipple(node: HTMLElement, options: RippleOptions = {}): Promise<void> {
  return transition(node, "close", options, (full, speed) => play(node, full, speed, true, options));
}

/** Brings a hidden `node` back from a drop at `options.from`: it wells up as the ripples spread. Shown elements are
 *  left as they are. */
export function openRipple(node: HTMLElement, options: RippleOptions = {}): Promise<void> {
  return transition(node, "open", options, (full, speed) => play(node, full, speed, false, options));
}
