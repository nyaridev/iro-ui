// Shake: a window saying no, for a blocked action (a click outside a dialog that can't close, a wrong password). It
// shakes side to side, quick and damped, like a head shaken once. Smooth motion shakes less and more briefly; reduced
// motion flashes a ring in the danger color instead of moving; off does nothing. It moves with the `translate`
// property, so it adds to any transform the element has, and it leaves no style behind.

// ── Dependencies ──────────────────────────
import { motionOf } from "../motion";
import { held, type ShakeOptions } from "../options";
import { animate, outlineFlash } from "./animate";

// ── Constants ─────────────────────────────
/** Frames sampled from the damped swing. */
const STEPS = 24;

// ── Public API ────────────────────────────
/** Shakes `node` side to side; resolves when it has settled. */
export async function shake(node: HTMLElement, options: ShakeOptions = {}): Promise<void> {
  const mode = motionOf(node);
  if (mode === "off") return;
  const speed = held(options.speed, 1, 0.25, 4);
  if (mode === "reduced") return outlineFlash(node, "shake", "var(--iro-danger)", 2, 640 / speed);
  const strength = held(options.strength, 1, 0.25, 3);
  const full = mode === "full";
  const swings = full ? 4.5 : 3;
  const reach = (full ? 10 : 5) * strength;
  const keyframes = Array.from({ length: STEPS + 1 }, (_, i) => {
    const t = i / STEPS;
    const x = reach * Math.sin(t * swings * 2 * Math.PI) * (1 - t) ** 1.7;
    return { translate: `${x.toFixed(2)}px 0` };
  });
  return animate(node, "shake", keyframes, { duration: (full ? 520 : 380) / speed, easing: "linear" });
}
