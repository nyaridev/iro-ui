// Wiggle: "try me" or "over here", a hint. It lifts a touch and tilts back and forth, quicker and smaller each time,
// then settles. Smooth motion tilts less, without the lift; reduced motion flashes an accent outline instead of
// moving; off does nothing. It moves with `rotate` and `scale`, so it adds to the element's own transform.

// ── Dependencies ──────────────────────────
import { motionOf } from "../motion";
import { type EffectOptions, held } from "../options";
import { animate, outlineFlash, within } from "./animate";

// ── Public API ────────────────────────────
/** Wiggles `node` as a hint; resolves when it has settled. */
export async function wiggle(node: HTMLElement, options: EffectOptions = {}): Promise<void> {
  const mode = motionOf(node);
  if (mode === "off") return;
  const speed = held(options.speed, 1, 0.25, 4);
  if (mode === "reduced") return outlineFlash(node, "wiggle", "var(--iro-accent)", 1, 520 / speed);
  const full = mode === "full";
  // Turns in radians, cut so a window's corners swing about as far as an icon's (a few px), not 20.
  const tilt = within(node, full ? 0.087 : 0.038, full ? 9 : 4) * (180 / Math.PI);
  const lift = full ? 1 + within(node, 0.04, 8) : 1;
  const swings = [-1, 0.9, -0.7, 0.5, -0.25, 0];
  const keyframes = [
    { rotate: "0deg", scale: "1", easing: "ease-in-out" },
    ...swings.map((swing, i) => ({
      easing: "ease-in-out",
      rotate: `${(tilt * swing).toFixed(2)}deg`,
      scale: String(i < swings.length - 1 ? lift : 1),
    })),
  ];
  return animate(node, "wiggle", keyframes, { duration: (full ? 640 : 440) / speed });
}
