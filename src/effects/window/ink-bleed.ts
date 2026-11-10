// Ink bleed: the window runs like wet ink. Its picture streaks downward and softens as the color bleeds into an ink
// tint, then it breaks into wet pools that shrink away, pigment gathering in a darker line at each pool's edge, the
// way a watercolor dries. Opening plays it backwards: pools spread and join, and the picture draws back up sharp.
// Smooth motion bleeds less and plays quicker.

// ── Dependencies ──────────────────────────
import { type Rgb, shade } from "../color";
import type { InkBleedOptions } from "../options";
import { frames, transition } from "./state";

// ── State ─────────────────────────────────
let filters = 0;

// ── Private helpers ───────────────────────
const clamp = (n: number) => Math.min(1, Math.max(0, n));
const smooth = (a: number, b: number, t: number) => {
  const x = clamp((t - a) / (b - a));
  return x * x * (3 - 2 * x);
};

/** The SVG filter: the picture run and softened, tinted toward `ink`, kept only in pools of noise above a rising
 *  level, with an ink line just outside each pool. */
function bleed([r, g, b]: Rgb) {
  const id = `iro-ink-${++filters}`;
  const seed = Math.floor(Math.random() * 999);
  document.body.insertAdjacentHTML(
    "beforeend",
    `<svg width="0" height="0" style="position:absolute" aria-hidden="true">
      <filter id="${id}" x="-12%" y="-12%" width="124%" height="140%" color-interpolation-filters="sRGB">
        <feTurbulence type="fractalNoise" baseFrequency="0.03 0.005" numOctaves="3" seed="${seed}" />
        <feComponentTransfer result="flow"><feFuncG type="linear" slope="0.6" intercept="0.08" /></feComponentTransfer>
        <feDisplacementMap in="SourceGraphic" in2="flow" scale="0" xChannelSelector="R" yChannelSelector="G" />
        <feGaussianBlur stdDeviation="0" />
        <feColorMatrix type="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0" result="wet" />
        <feTurbulence type="fractalNoise" baseFrequency="0.012" numOctaves="4" seed="${seed + 7}" />
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1.6 0 0 0 -0.3" result="depth" />
        <feComponentTransfer in="depth" result="keep"><feFuncA type="linear" slope="9" intercept="9" /></feComponentTransfer>
        <feComponentTransfer in="depth" result="reach"><feFuncA type="linear" slope="9" intercept="9" /></feComponentTransfer>
        <feComposite in="reach" in2="keep" operator="out" result="edge" />
        <feFlood flood-color="rgb(${r} ${g} ${b})" flood-opacity="0" />
        <feComposite in2="edge" operator="in" />
        <feComposite in2="wet" operator="in" result="rim" />
        <feComposite in="wet" in2="keep" operator="in" result="pools" />
        <feMerge><feMergeNode in="pools" /><feMergeNode in="rim" /></feMerge>
      </filter>
    </svg>`,
  );
  const svg = document.body.lastElementChild as SVGSVGElement;
  const run = svg.querySelector("feDisplacementMap") as SVGFEDisplacementMapElement;
  const soften = svg.querySelector("feGaussianBlur") as SVGFEGaussianBlurElement;
  const tint = svg.querySelector('feColorMatrix[result="wet"]') as SVGFEColorMatrixElement;
  const [keep, reach] = [...svg.querySelectorAll("feComponentTransfer[in] feFuncA")];
  const flood = svg.querySelector("feFlood") as SVGFEFloodElement;
  /** Ran `streak` px, blurred `blur` px, tinted `toward` (0–1), dried to `dry` (0 none, 1 gone), rim at `rim`. */
  const set = (streak: number, blur: number, toward: number, dry: number, rim: number) => {
    run.setAttribute("scale", streak.toFixed(1));
    soften.setAttribute("stdDeviation", blur.toFixed(2));
    const rest = (1 - toward).toFixed(3);
    const add = (channel: number) => ((channel / 255) * toward).toFixed(3);
    tint.setAttribute("values", `${rest} 0 0 0 ${add(r)} 0 ${rest} 0 0 ${add(g)} 0 0 ${rest} 0 ${add(b)} 0 0 0 1 0`);
    // The level the noise must clear to keep its pool: from everything kept (9) to nothing (-9).
    const level = 9 - 18 * dry;
    keep.setAttribute("intercept", level.toFixed(2));
    reach.setAttribute("intercept", (level + 1.1).toFixed(2));
    flood.setAttribute("flood-opacity", rim.toFixed(3));
  };
  return { filter: `url(#${id})`, set, remove: () => svg.remove() };
}

/** Plays the bleed on `node`; `forward` bleeds it away, otherwise it comes back. */
async function play(node: HTMLElement, full: boolean, speed: number, forward: boolean, options: InkBleedOptions) {
  // Dark ink on light themes; on dark ones a deep dye of the accent, so the window darkens instead of going milky.
  const [br, bg, bb] = shade(node, "var(--iro-bg)");
  const dark = 0.2126 * br + 0.7152 * bg + 0.0722 * bb < 128;
  const fallback = dark
    ? "color-mix(in oklab, var(--iro-accent) 55%, var(--iro-bg))"
    : "color-mix(in oklab, var(--iro-fg) 80%, var(--iro-accent))";
  const ink = shade(node, options.color ?? fallback);
  const wet = bleed(ink);
  const done = await frames(node, (full ? 1250 : 800) / speed, (progress) => {
    const t = forward ? progress : 1 - progress;
    const runs = smooth(0, 1, t);
    wet.set(
      (full ? 70 : 30) * runs * runs,
      (full ? 1.4 : 0.9) * runs,
      (dark ? 0.32 : 0.18) * smooth(0, 0.6, t),
      smooth(0.18, 0.96, t),
      0.85 * smooth(0.12, 0.3, t) * (1 - smooth(0.8, 1, t)),
    );
    node.style.opacity = "1";
    node.style.filter = wet.filter;
  });
  wet.remove();
  return done;
}

// ── Public API ────────────────────────────
/** Lets `node` run like wet ink and dry away in pools; it stays hidden (`opacity: 0`) until an open effect. */
export function closeInkBleed(node: HTMLElement, options: InkBleedOptions = {}): Promise<void> {
  return transition(node, "close", options, (full, speed) => play(node, full, speed, true, options));
}

/** Brings a hidden `node` back: wet pools spread and join, and the picture draws back up sharp. Shown elements are
 *  left as they are. */
export function openInkBleed(node: HTMLElement, options: InkBleedOptions = {}): Promise<void> {
  return transition(node, "open", options, (full, speed) => play(node, full, speed, false, options));
}
