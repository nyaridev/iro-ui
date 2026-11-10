// Genie: a window minimizing into a target (a dock or taskbar button) the way a genie pours back into its lamp, and
// back out. The side nearest the target pinches toward it, curving the window into a funnel (an SVG warp pulls each
// line across the window in, more the nearer it lies to the target), and the window pours in, squashing and
// shrinking to the target's size; opening plays it backwards. Smooth motion plays a shorter version that bends less.

// ── Dependencies ──────────────────────────
import { type GenieOptions, held } from "../options";
import { frames, transition } from "./state";

// ── Constants ─────────────────────────────
/** Pixels across the warp map; the browser smooths it up to the window's size. */
const MAP = 32;

// ── Types ─────────────────────────────────
type Side = "top" | "bottom" | "left" | "right";

interface Setup {
  side: Side;
  /** Where along that side the target's center falls, 0–1. */
  focus: number;
  box: DOMRect;
  target: DOMRect;
  /** How hard it bends: the warp's strength at full pinch, in pixels. */
  bend: number;
  /** The warp's displacement, whose `scale` the pose sets. */
  map: SVGFEDisplacementMapElement;
  /** A slight blur that grows with the warp: it smooths the whole-pixel steps the warp leaves in slanted edges. */
  blur: SVGFEGaussianBlurElement;
  filter: string;
}

// ── State ─────────────────────────────────
let filters = 0;

// ── Private helpers ───────────────────────
const clamp = (n: number) => Math.min(1, Math.max(0, n));
const mix = (a: number, b: number, t: number) => a + (b - a) * t;
const easeIn = (t: number) => t * t * t;
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);

const vertical = (side: Side) => side === "top" || side === "bottom";

/** Which side of the window the target lies off, and where along it the target's center falls. */
function aim(box: DOMRect, target: DOMRect): { side: Side; focus: number } {
  const tx = target.left + target.width / 2;
  const ty = target.top + target.height / 2;
  const dx = (tx - (box.left + box.width / 2)) / box.width;
  const dy = (ty - (box.top + box.height / 2)) / box.height;
  if (Math.abs(dy) >= Math.abs(dx))
    return { side: dy >= 0 ? "bottom" : "top", focus: clamp((tx - box.left) / box.width) };
  return { side: dx >= 0 ? "right" : "left", focus: clamp((ty - box.top) / box.height) };
}

/** An SVG filter that pulls each line across the window toward `focus`, more the nearer it lies to `side`. */
function warp(side: Side, focus: number) {
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = MAP;
  const g = canvas.getContext("2d");
  const image = g?.createImageData(MAP, MAP);
  const reach = Math.max(focus, 1 - focus, 0.01);
  for (let j = 0; image && j < MAP; j++) {
    for (let i = 0; i < MAP; i++) {
      const x = i / (MAP - 1);
      const y = j / (MAP - 1);
      const near = { bottom: y, top: 1 - y, right: x, left: 1 - x }[side];
      const across = ((vertical(side) ? x : y) - focus) / reach;
      // Displacement reads 0.5 as still: above it samples farther from the focus, pulling the content in.
      const pull = Math.round(255 * (0.5 + 0.5 * across * near * near));
      const k = (j * MAP + i) * 4;
      image.data.set(vertical(side) ? [pull, 128, 0, 255] : [128, pull, 0, 255], k);
    }
  }
  if (g && image) g.putImageData(image, 0, 0);
  const id = `iro-genie-${++filters}`;
  document.body.insertAdjacentHTML(
    "beforeend",
    `<svg width="0" height="0" style="position:absolute" aria-hidden="true">
      <filter id="${id}" x="0" y="0" width="1" height="1" color-interpolation-filters="sRGB">
        <feImage href="${canvas.toDataURL()}" preserveAspectRatio="none" result="map" />
        <feDisplacementMap in="SourceGraphic" in2="map" scale="0" xChannelSelector="R" yChannelSelector="G" />
        <feGaussianBlur stdDeviation="0" />
      </filter>
    </svg>`,
  );
  const svg = document.body.lastElementChild as SVGSVGElement;
  return {
    id,
    map: svg.querySelector("feDisplacementMap") as SVGFEDisplacementMapElement,
    blur: svg.querySelector("feGaussianBlur") as SVGFEGaussianBlurElement,
    remove: () => svg.remove(),
  };
}

/** `node` at `t` of the way into its target: 0 is the window as it is, 1 inside the target. */
function pose(node: HTMLElement, t: number, { side, focus, box, target, bend, map, blur, filter }: Setup) {
  const pinch = easeInOut(clamp(t / 0.6));
  const pour = easeIn(clamp((t - 0.25) / 0.75));
  const upright = vertical(side);
  const length = upright ? box.height : box.width;
  const breadth = upright ? box.width : box.height;
  // The point on the near side across from the target: it stays put while the window squashes toward it.
  const origin = {
    bottom: [box.left + focus * box.width, box.bottom],
    top: [box.left + focus * box.width, box.top],
    right: [box.right, box.top + focus * box.height],
    left: [box.left, box.top + focus * box.height],
  }[side];
  const dx = (target.left + target.width / 2 - origin[0]) * pour;
  const dy = (target.top + target.height / 2 - origin[1]) * pour;
  const along = mix(1, Math.max(4 / length, 0.02), pour) * mix(1, 0.82, pinch);
  const across = mix(1, Math.max((upright ? target.width : target.height) / breadth, 0.04), pour);
  const at = `${upright ? `${(focus * 100).toFixed(2)}%` : side === "left" ? "0%" : "100%"} ${upright ? (side === "top" ? "0%" : "100%") : `${(focus * 100).toFixed(2)}%`}`;
  node.style.transformOrigin = at;
  node.style.transform = `translate(${dx.toFixed(1)}px, ${dy.toFixed(1)}px) scale(${(upright ? across : along).toFixed(4)}, ${(upright ? along : across).toFixed(4)})`;
  node.style.filter = filter;
  node.style.opacity = String(1 - clamp((t - 0.8) / 0.2));
  map.setAttribute("scale", (bend * pinch).toFixed(1));
  blur.setAttribute("stdDeviation", (0.8 * pinch).toFixed(2));
}

/** The target's box: the given element or box, or a small dock at the bottom center of the viewport. */
function targetBox(target: GenieOptions["target"]): DOMRect {
  if (target instanceof Element) return target.getBoundingClientRect();
  return target ?? new DOMRect(innerWidth / 2 - 24, innerHeight - 12, 48, 8);
}

/** Measures `node` and its target and builds the warp for a genie between them. */
function prepare(node: HTMLElement, full: boolean, options: GenieOptions) {
  const box = node.getBoundingClientRect();
  const target = targetBox(options.target);
  const { side, focus } = aim(box, target);
  const { id, map, blur, remove } = warp(side, focus);
  const breadth = vertical(side) ? box.width : box.height;
  const bend = breadth * (full ? 2.2 : 1.1) * held(options.bend, 1, 0, 2);
  return { setup: { side, focus, box, target, bend, map, blur, filter: `url(#${id})` } satisfies Setup, remove };
}

// ── Public API ────────────────────────────
/** Pours `node` into its target (`options.target`: a dock button, say); it stays hidden (`opacity: 0`) until an open
 *  effect. */
export function closeGenie(node: HTMLElement, options: GenieOptions = {}): Promise<void> {
  return transition(node, "close", options, async (full, speed) => {
    const { setup, remove } = prepare(node, full, options);
    const done = await frames(node, (full ? 640 : 440) / speed, (t) => pose(node, t, setup));
    remove();
    return done;
  });
}

/** Pours a hidden `node` back out of its target. Shown elements are left as they are. */
export function openGenie(node: HTMLElement, options: GenieOptions = {}): Promise<void> {
  return transition(node, "open", options, async (full, speed) => {
    const { setup, remove } = prepare(node, full, options);
    const done = await frames(node, (full ? 580 : 420) / speed, (t) => pose(node, 1 - t, setup));
    remove();
    return done;
  });
}
