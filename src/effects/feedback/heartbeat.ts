// Heartbeat: "liked". Two quick beats, the second softer, with a warm glow that blooms and fades. Smooth motion beats
// smaller; reduced motion only glows; off does nothing. It moves with `scale`, so it adds to the element's own
// transform, and its glow adds to the element's own shadows.

// ── Dependencies ──────────────────────────
import { motionOf } from "../motion";
import { type FeedbackOptions, held } from "../options";
import { animate, within } from "./animate";
import { rimLight } from "./pulse";

// ── Public API ────────────────────────────
/** Beats `node` twice with a glow, for a like or a favorite; resolves when it's still. */
export async function heartbeat(node: HTMLElement, options: FeedbackOptions = {}): Promise<void> {
  const mode = motionOf(node);
  if (mode === "off") return;
  const speed = held(options.speed, 1, 0.25, 4);
  const { glow } = rimLight(node, options.color ?? "var(--iro-pink)");
  const beat = within(node, 0.14, 16) * (mode === "full" ? 1 : mode === "smooth" ? 0.5 : 0);
  const at = (offset: number, swell: number, light: number) => ({
    offset,
    easing: "ease-in-out",
    scale: (1 + swell * beat).toFixed(4),
    boxShadow: glow(10 + 14 * light, 1 + 3 * light, light),
  });
  const keyframes = [
    at(0, 0, 0),
    at(0.14, 1, 1),
    at(0.28, -0.2, 0.6),
    at(0.42, 0.57, 0.8),
    at(0.62, 0, 0.4),
    at(1, 0, 0),
  ];
  return animate(node, "heartbeat", keyframes, { duration: 820 / speed });
}
