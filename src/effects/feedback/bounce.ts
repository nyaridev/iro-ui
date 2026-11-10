// Bounce: "something new here". It crouches, hops up and lands with a little squash, then a smaller hop, like an app
// icon in a dock calling for you. Smooth motion hops once, lower, without the squash; reduced motion flashes an
// accent outline instead of moving; off does nothing. It moves with `translate` and `scale` from its bottom edge, so
// it adds to the element's own transform, and it leaves no style behind.

// ── Dependencies ──────────────────────────
import { motionOf } from "../motion";
import { type BounceOptions, held } from "../options";
import { animate, outlineFlash, within } from "./animate";

// ── Constants ─────────────────────────────
const UP = "cubic-bezier(0.2, 0.7, 0.4, 1)";
const DOWN = "cubic-bezier(0.6, 0, 0.8, 0.4)";

// ── Public API ────────────────────────────
/** Bounces `node` to call attention to it; resolves when it has landed. */
export async function bounce(node: HTMLElement, options: BounceOptions = {}): Promise<void> {
  const mode = motionOf(node);
  if (mode === "off") return;
  const speed = held(options.speed, 1, 0.25, 4);
  if (mode === "reduced") return outlineFlash(node, "bounce", "var(--iro-accent)", 1, 520 / speed);
  const height = 14 * held(options.height, 1, 0.25, 3);
  // The squash in hundredths of the size, up to about 1.4 px each on a window.
  const give = within(node, 0.01, 1.4);
  const at = (offset: number, y: number, wide: number, tall: number, easing: string) => ({
    offset,
    easing,
    translate: `0 ${(-y).toFixed(1)}px`,
    scale: `${(1 + give * wide).toFixed(4)} ${(1 + give * tall).toFixed(4)}`,
    transformOrigin: "50% 100%",
  });
  const keyframes =
    mode === "full"
      ? [
          at(0, 0, 0, 0, "ease-out"),
          at(0.08, 0, 6, -7, UP),
          at(0.32, height, -4, 5, DOWN),
          at(0.5, 0, 7, -8, UP),
          at(0.67, height * 0.4, -1, 2, DOWN),
          at(0.82, 0, 3, -3, "ease-out"),
          at(1, 0, 0, 0, "linear"),
        ]
      : [
          at(0, 0, 0, 0, UP),
          at(0.42, height * 0.55, 0, 0, DOWN),
          at(0.84, 0, 0, 0, "ease-out"),
          at(1, 0, 0, 0, "linear"),
        ];
  return animate(node, "bounce", keyframes, { duration: (mode === "full" ? 760 : 460) / speed });
}
