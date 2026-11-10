// Attention pulse: "look here". The window's rim lights up in the spark color with a soft glow, then the light runs
// outward as a thin ring and fades, once or a few times. The ring is an outline, so it follows the element's corners;
// the glow adds to the element's own shadows. Smooth motion keeps the ring closer; reduced motion only fades the glow
// in and out, without spreading; off does nothing. It leaves no style behind (the element's own outline is hidden
// while it plays).

// ── Dependencies ──────────────────────────
import { css, shade } from "../color";
import { motionOf } from "../motion";
import { held, type PulseOptions } from "../options";
import { animate } from "./animate";

// ── Public API ────────────────────────────
/** Keyframe parts for light on `node`'s rim in `color`: a glow (added to its own shadows) and a ring outline. */
export function rimLight(node: HTMLElement, color: string, strength = 1) {
  const rgb = shade(node, color);
  const own = getComputedStyle(node).boxShadow;
  const under = own && own !== "none" ? `, ${own}` : "";
  const lit = (alpha: number) => css(rgb, Math.min(alpha * strength, 1));
  return {
    /** The glow around the rim, `blur` px soft and spread `spread` px, at `alpha`. */
    glow: (blur: number, spread: number, alpha: number) =>
      `0 0 ${blur.toFixed(1)}px ${spread.toFixed(1)}px ${lit(alpha * 0.55)}${under}`,
    /** The ring, `width` px thick and `gap` px out from the edge, at `alpha`. */
    ring: (width: number, gap: number, alpha: number) => ({
      outline: `${width.toFixed(1)}px solid ${lit(alpha * 0.9)}`,
      outlineOffset: `${gap.toFixed(1)}px`,
    }),
  };
}

/** Pulses a glowing ring out of `node`'s edge; resolves when the last pulse has faded. */
export async function pulse(node: HTMLElement, options: PulseOptions = {}): Promise<void> {
  const mode = motionOf(node);
  if (mode === "off") return;
  const speed = held(options.speed, 1, 0.25, 4);
  const strength = held(options.strength, 1, 0.25, 3);
  const count = Math.round(held(options.count, 1, 1, 3));
  const { glow, ring } = rimLight(node, options.color ?? "var(--iro-spark)", strength);
  const reach = (mode === "full" ? 18 : 9) * strength;
  const keyframes =
    mode === "reduced"
      ? [{ boxShadow: glow(18, 2, 0) }, { boxShadow: glow(18, 2, 1) }, { boxShadow: glow(18, 2, 0) }]
      : [
          { ...ring(2, 0, 0), boxShadow: glow(0, 0, 0), offset: 0, easing: "ease-out" },
          { ...ring(2, 1, 1), boxShadow: glow(20, 2, 1), offset: 0.16, easing: "cubic-bezier(0.33, 1, 0.68, 1)" },
          { ...ring(1, reach, 0), boxShadow: glow(32, 4, 0), offset: 1 },
        ];
  return animate(node, "pulse", keyframes, { duration: (mode === "full" ? 900 : 700) / speed, iterations: count });
}
