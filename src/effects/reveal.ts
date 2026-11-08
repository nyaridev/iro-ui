// Opening and closing an element from its center, from UmeSync's windows: a circle grows out with a crisp edge and a
// glowing rim while the content inside starts color-inverted and warped like liquid, its noise boiling in steps, and
// settles into place. Closing plays it backwards, quicker. Full motion plays it all, smooth a calmer version, reduced
// only fades, off shows or hides at once.

// ── Dependencies ──────────────────────────
import { fitter } from "./fit";
import { motionOf } from "./motion";

// ── Constants ─────────────────────────────
const FILTER_ID = "iro-reveal";
const EFFECT_STYLES = ["clip-path", "filter", "transform", "opacity", "--reveal-r", "--reveal-glow"];

// ── Types ─────────────────────────────────
type State = "closed" | "opening" | "open" | "closing";

// ── State ─────────────────────────────────
const playing = new WeakMap<HTMLElement, number>();
/** Bumped whenever an effect takes over an element, so an older one still running (or its stall timer) stops
 * instead of undoing the new one. */
const generations = new WeakMap<HTMLElement, number>();
/** Elements that fell into a black hole: they come back out gently. */
const swallowed = new WeakSet<HTMLElement>();

let turbulence: SVGFETurbulenceElement | null = null;
let displacement: SVGFEDisplacementMapElement | null = null;

// ── Private helpers ───────────────────────
/** The SVG filter that warps the content while it opens. */
function ensureFilter() {
  if (!document.getElementById(FILTER_ID)) {
    document.body.insertAdjacentHTML(
      "beforeend",
      `<svg width="0" height="0" style="position:absolute" aria-hidden="true">
        <filter id="${FILTER_ID}" x="-20%" y="-20%" width="140%" height="140%" color-interpolation-filters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.011 0.016" numOctaves="2" seed="3" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="0" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>`,
    );
  }
  turbulence = document.querySelector(`#${FILTER_ID} feTurbulence`);
  displacement = document.querySelector(`#${FILTER_ID} feDisplacementMap`);
}

const clamp = (n: number) => Math.min(1, Math.max(0, n));
const easeOutExpo = (t: number) => (t >= 1 ? 1 : 1 - 2 ** (-11 * t));
const easeInCubic = (t: number) => t * t * t;
const easeOutQuint = (t: number) => 1 - (1 - t) ** 5;

/** A damped spring from 0 to 1: overshoots a little, then settles. */
function spring(t: number): number {
  if (t >= 1) return 1;
  const damping = 0.5;
  const w = Math.log(250) / damping;
  const wd = w * Math.sqrt(1 - damping * damping);
  const decay = Math.exp(-damping * w * t);
  return 1 - decay * (Math.cos(wd * t) + ((damping * w) / wd) * Math.sin(wd * t));
}

function state(node: HTMLElement): State {
  return (node.dataset.iroReveal as State | undefined) ?? "open";
}

function ring(node: HTMLElement) {
  if (node.querySelector(":scope > .iro-reveal-ring")) return;
  const element = document.createElement("div");
  element.className = "iro-reveal-ring";
  element.setAttribute("aria-hidden", "true");
  node.appendChild(element);
}

function takeOver(node: HTMLElement): number {
  cancelAnimationFrame(playing.get(node) ?? 0);
  const generation = (generations.get(node) ?? 0) + 1;
  generations.set(node, generation);
  return generation;
}

/** Hidden: a circle of radius 0, ready to open. */
function collapse(node: HTMLElement) {
  takeOver(node);
  node.dataset.iroReveal = "closed";
  node.style.clipPath = "circle(0px at 50% 50%)";
  node.style.opacity = "0";
}

/** Fully shown, with every effect style and the rim removed. */
function settle(node: HTMLElement) {
  takeOver(node);
  swallowed.delete(node);
  node.dataset.iroReveal = "open";
  for (const property of EFFECT_STYLES) node.style.removeProperty(property);
  node.querySelector(":scope > .iro-reveal-ring")?.remove();
}

/** Runs `draw` every frame for `duration` ms. If frames stall (a hidden or throttled page), it finishes on a timer,
 * so an element never stays invisible. Resolves `false` if another effect took over meanwhile. */
function frames(node: HTMLElement, duration: number, draw: (t: number) => void): Promise<boolean> {
  const generation = takeOver(node);
  const current = () => generations.get(node) === generation;
  return new Promise((resolve) => {
    const start = performance.now();
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      if (!current()) return resolve(false);
      cancelAnimationFrame(playing.get(node) ?? 0);
      draw(1);
      resolve(true);
    };
    const step = (now: number) => {
      if (done) return;
      if (!current()) {
        done = true;
        return resolve(false);
      }
      const t = clamp((now - start) / duration);
      draw(t);
      if (t < 1) playing.set(node, requestAnimationFrame(step));
      else finish();
    };
    playing.set(node, requestAnimationFrame(step));
    setTimeout(finish, duration + 500);
  });
}

/** A circle that covers all of `node`: its layout size, not its box on screen, which an effect may have turned. */
function radiusFor(node: HTMLElement): number {
  return Math.hypot(node.offsetWidth / 2, node.offsetHeight / 2) + 24;
}

/** Back from a black hole: unfurls out of the spot, turning back from the spin and coming into focus. */
async function unfurl(node: HTMLElement, full: boolean, max: number) {
  swallowed.delete(node);
  displacement?.setAttribute("scale", "0");
  node.style.transform = "none";
  const fitTo = fitter(node);
  const done = await frames(node, full ? 640 : 460, (t) => {
    const e = easeOutQuint(t);
    const radius = max * e;
    const turn = (full ? 36 : 14) * (1 - e);
    const scale = Math.min(0.62 + 0.38 * e, fitTo((turn * Math.PI) / 180, radius, 2));
    node.style.opacity = String(clamp(t * 4));
    node.style.clipPath = `circle(${radius.toFixed(1)}px at 50% 50%)`;
    node.style.transform = `rotate(${turn.toFixed(2)}deg) scale(${scale.toFixed(4)})`;
    node.style.filter = `url(#${FILTER_ID}) blur(${(5 * (1 - e)).toFixed(2)}px)`;
    node.style.setProperty("--reveal-r", `${radius.toFixed(1)}px`);
    node.style.setProperty("--reveal-glow", String(0.6 * (1 - t)));
    displacement?.setAttribute("scale", ((full ? 26 : 12) * (1 - t) ** 3).toFixed(2));
  });
  if (done) settle(node);
}

// ── Public API ────────────────────────────
/** Hides `node` at once, ready for `openReveal` (an element that should open with the effect starts hidden). */
export function hideForReveal(node: HTMLElement) {
  collapse(node);
}

/** Opens `node` from its center. Shown elements are left as they are; `node` needs a position for the rim. */
export async function openReveal(node: HTMLElement): Promise<void> {
  if (state(node) === "open" || state(node) === "opening") return;
  const mode = motionOf(node);
  if (mode === "off") return settle(node);
  cancelAnimationFrame(playing.get(node) ?? 0);
  node.dataset.iroReveal = "opening";

  if (mode === "reduced") {
    node.style.clipPath = "none";
    if (await frames(node, 180, (t) => (node.style.opacity = String(t)))) settle(node);
    return;
  }

  ensureFilter();
  ring(node);
  const full = mode === "full";
  const max = radiusFor(node);
  if (swallowed.has(node)) return unfurl(node, full, max);

  let lastSeed = 0;
  const done = await frames(node, full ? 780 : 460, (t) => {
    const radius = max * easeOutExpo(t);
    const flip = full ? clamp(1 - t / 0.26) : 0;
    const scale = full ? 0.9 + 0.1 * spring(t) : 0.96 + 0.04 * easeOutExpo(t);
    node.style.opacity = String(clamp(t * 6));
    node.style.clipPath = `circle(${radius.toFixed(1)}px at 50% 50%)`;
    node.style.transform = `scale(${scale.toFixed(4)})`;
    node.style.filter = `url(#${FILTER_ID}) invert(${flip.toFixed(3)}) hue-rotate(${(flip * 180).toFixed(1)}deg)`;
    node.style.setProperty("--reveal-r", `${radius.toFixed(1)}px`);
    node.style.setProperty("--reveal-glow", String(1 - t));
    displacement?.setAttribute("scale", ((full ? 70 : 28) * (1 - t) ** 2).toFixed(2));
    // The noise jumps in steps while it boils, then holds still.
    const now = performance.now();
    if (turbulence && t < 0.7 && now - lastSeed > 55) {
      lastSeed = now;
      turbulence.setAttribute("seed", String(1 + Math.floor(Math.random() * 999)));
    }
  });
  if (done) settle(node);
}

/** Closes `node` into its center; it stays hidden (`opacity: 0`) until `openReveal`. */
export async function closeReveal(node: HTMLElement): Promise<void> {
  if (state(node) === "closed" || state(node) === "closing") return;
  const mode = motionOf(node);
  if (mode === "off") return collapse(node);
  cancelAnimationFrame(playing.get(node) ?? 0);
  node.dataset.iroReveal = "closing";

  if (mode === "reduced") {
    if (await frames(node, 140, (t) => (node.style.opacity = String(1 - t)))) collapse(node);
    return;
  }

  ensureFilter();
  ring(node);
  const full = mode === "full";
  const max = radiusFor(node);
  const done = await frames(node, full ? 300 : 220, (t) => {
    const radius = max * (1 - easeInCubic(t));
    const flip = full ? clamp((t - 0.55) / 0.45) : 0;
    node.style.clipPath = `circle(${radius.toFixed(1)}px at 50% 50%)`;
    node.style.transform = `scale(${(1 - 0.07 * t).toFixed(4)})`;
    node.style.filter = `url(#${FILTER_ID}) invert(${flip.toFixed(3)}) hue-rotate(${(flip * 180).toFixed(1)}deg)`;
    node.style.opacity = String(1 - clamp((t - 0.75) / 0.25));
    node.style.setProperty("--reveal-r", `${radius.toFixed(1)}px`);
    node.style.setProperty("--reveal-glow", String(t));
    displacement?.setAttribute("scale", ((full ? 50 : 20) * t).toFixed(2));
  });
  if (done) collapse(node);
}

/** For the black hole: claims `node` as closing and marks it to come back gently. False if it's already closed. */
export function beginSwallow(node: HTMLElement): boolean {
  if (state(node) === "closed" || state(node) === "closing") return false;
  takeOver(node);
  node.dataset.iroReveal = "closing";
  swallowed.add(node);
  for (const property of ["--reveal-r", "--reveal-glow"]) node.style.removeProperty(property);
  return true;
}

/** For the black hole: leaves `node` hidden once it's gone. */
export const endSwallow = collapse;
