// The shown or hidden state every window effect shares (ADR-0016). A window is `open`, `closing`, `closed` or
// `opening` (its `data-iro-reveal`); an effect claims it, plays on the shared frame loop, and leaves it shown or
// hidden with no effect styles behind, so any close pairs with any open and a new effect takes over one mid-way.

// ── Dependencies ──────────────────────────
import { motionOf } from "../motion";
import { type EffectOptions, held } from "../options";

// ── Constants ─────────────────────────────
/** Inline styles the effects write on the window itself. */
const EFFECT_STYLES = [
  "clip-path",
  "filter",
  "transform",
  "transform-origin",
  "opacity",
  "mask-image",
  "--reveal-r",
  "--reveal-glow",
];

// ── Types ─────────────────────────────────
type State = "closed" | "opening" | "open" | "closing";

/** An effect in full or smooth motion: resolves true once it played to the end, false if another took over. */
export type Play = (full: boolean, speed: number) => Promise<boolean>;

// ── State ─────────────────────────────────
const playing = new WeakMap<HTMLElement, number>();
/** Bumped whenever an effect takes over an element, so an older one still running (or its stall timer) stops
 * instead of undoing the new one. */
const generations = new WeakMap<HTMLElement, number>();

// ── Private helpers ───────────────────────
const clamp = (n: number) => Math.min(1, Math.max(0, n));

function state(node: HTMLElement): State {
  return (node.dataset.iroReveal as State | undefined) ?? "open";
}

function takeOver(node: HTMLElement): number {
  cancelAnimationFrame(playing.get(node) ?? 0);
  const generation = (generations.get(node) ?? 0) + 1;
  generations.set(node, generation);
  return generation;
}

/** Removes every effect style and the parts effects add inside it (the reveal's rim, the CRT's scanlines). */
function reset(node: HTMLElement) {
  for (const property of EFFECT_STYLES) node.style.removeProperty(property);
  for (const part of node.querySelectorAll(":scope > .iro-effect-part")) part.remove();
}

/** Claims `node` as opening or closing, stopping whatever played on it. False when it's already there or on its way
 *  (an open window can't open again). */
function claim(node: HTMLElement, next: "opening" | "closing"): boolean {
  const now = state(node);
  if (next === "closing" ? now === "closed" || now === "closing" : now === "open" || now === "opening") return false;
  takeOver(node);
  node.dataset.iroReveal = next;
  return true;
}

// ── Public API ────────────────────────────
/** Hidden: a circle of radius 0, ready to open, with no other effect style. */
export function collapse(node: HTMLElement) {
  takeOver(node);
  node.dataset.iroReveal = "closed";
  reset(node);
  node.style.clipPath = "circle(0px at 50% 50%)";
  node.style.opacity = "0";
}

/** Fully shown, with every effect style and part removed. */
export function settle(node: HTMLElement) {
  takeOver(node);
  node.dataset.iroReveal = "open";
  reset(node);
}

/** Runs `draw` every frame for `duration` ms. If frames stall (a hidden or throttled page), it finishes on a timer,
 * so an element never stays invisible. Resolves `false` if another effect took over meanwhile. */
export function frames(node: HTMLElement, duration: number, draw: (t: number) => void): Promise<boolean> {
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

/** Opens or closes `node` with `play`, the way every window effect does: it claims `node` (and does nothing if it's
 *  already open or closed that way), clears what an interrupted effect left, jumps to the end under off motion,
 *  fades under reduced motion, and leaves it shown or hidden once `play` ends. `skipped` runs when `play` doesn't. An
 *  opening `node` starts hidden (`opacity: 0`): `play` shows it. */
export async function transition(
  node: HTMLElement,
  direction: "open" | "close",
  options: EffectOptions,
  play: Play,
  skipped?: () => void,
): Promise<void> {
  const opening = direction === "open";
  if (!claim(node, opening ? "opening" : "closing")) return;
  const end = () => (opening ? settle(node) : collapse(node));
  reset(node);
  if (opening) node.style.opacity = "0";
  const mode = motionOf(node);
  const speed = held(options.speed, 1, 0.25, 4);
  if (mode === "off" || mode === "reduced") skipped?.();
  if (mode === "off") return end();
  if (mode === "reduced") {
    const fade = (t: number) => (node.style.opacity = String(opening ? t : 1 - t));
    if (await frames(node, (opening ? 180 : 140) / speed, fade)) end();
    return;
  }
  if (await play(mode === "full", speed)) end();
}

/** Hides `node` at once, ready for any open effect (an element that should open with an effect starts hidden). */
export function hideWindow(node: HTMLElement) {
  collapse(node);
}
