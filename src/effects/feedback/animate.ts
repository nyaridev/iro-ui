// Feedback runs on Web Animations: a new one of the same kind on an element replaces the last, and nothing stays
// behind when it ends. Feedback that moves flashes an outline instead under reduced motion.

// ── Dependencies ──────────────────────────
import { css, shade } from "../color";

// ── State ─────────────────────────────────
const running = new WeakMap<Element, Map<string, Animation>>();
/** How many parts each element holds, and how to undo what holding them changed. */
const holding = new WeakMap<HTMLElement, { parts: number; undo: () => void }>();

// ── Public API ────────────────────────────
/** Plays `keyframes` on `node` as its `kind` of feedback, stopping the last one of that kind; resolves when done. */
export async function animate(
  node: HTMLElement,
  kind: string,
  keyframes: Keyframe[],
  timing: KeyframeAnimationOptions,
): Promise<void> {
  let kinds = running.get(node);
  if (!kinds) {
    kinds = new Map();
    running.set(node, kinds);
  }
  kinds.get(kind)?.cancel();
  const animation = node.animate(keyframes, timing);
  kinds.set(kind, animation);
  await animation.finished.catch(() => undefined);
  if (kinds.get(kind) === animation) kinds.delete(kind);
}

/**
 * Adds a hidden `<span class={className}>` inside `node` and returns it with the function that takes it out. While
 * any are in, the node is positioned and isolated, so a part can sit over its content, or at `z-index: -1` between
 * its backdrop and its content.
 */
export function addPart(node: HTMLElement, className: string): [HTMLSpanElement, () => void] {
  let held = holding.get(node);
  if (!held) {
    const { position, isolation } = getComputedStyle(node);
    const before = { position: node.style.position, isolation: node.style.isolation };
    if (position === "static") node.style.position = "relative";
    if (isolation !== "isolate") node.style.isolation = "isolate";
    held = { parts: 0, undo: () => Object.assign(node.style, before) };
    holding.set(node, held);
  }
  const owner = held;
  owner.parts++;
  const part = document.createElement("span");
  part.className = className;
  part.setAttribute("aria-hidden", "true");
  node.appendChild(part);
  const remove = () => {
    if (!part.isConnected) return;
    part.remove();
    if (--owner.parts > 0) return;
    owner.undo();
    holding.delete(node);
  };
  return [part, remove];
}

/** `ratio` of `node`'s size, cut to at most `px` on its longer side, so a window moves as much as an icon, not more. */
export function within(node: HTMLElement, ratio: number, px: number) {
  const { width, height } = node.getBoundingClientRect();
  return Math.min(ratio, px / Math.max(width, height, 1));
}

/** The stand-in for moving feedback under reduced motion: an outline in `color` flashing `times` times. */
export function outlineFlash(
  node: HTMLElement,
  kind: string,
  color: string,
  times: number,
  duration: number,
): Promise<void> {
  const rgb = shade(node, color);
  const ring = (alpha: number) => ({ outline: `2px solid ${css(rgb, alpha)}`, outlineOffset: "2px" });
  const keyframes = [ring(0)];
  for (let i = 0; i < times; i++) keyframes.push(ring(0.9), ring(i === times - 1 ? 0 : 0.15));
  return animate(node, kind, keyframes, { duration });
}
