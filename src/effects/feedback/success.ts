// Success: "saved" or "done". A small pop, and a ring in the success color that runs out from the edge and fades,
// with a soft glow. Smooth motion pops less and keeps the ring closer; reduced motion only glows; off does nothing.
// It moves with `scale`, so it adds to the element's own transform.

// ── Dependencies ──────────────────────────
import { motionOf } from "../motion";
import { type FeedbackOptions, held } from "../options";
import { animate, within } from "./animate";
import { rimLight } from "./pulse";

// ── Public API ────────────────────────────
/** Pops `node` with a ring of success; resolves when it has faded. */
export async function success(node: HTMLElement, options: FeedbackOptions = {}): Promise<void> {
  const mode = motionOf(node);
  if (mode === "off") return;
  const speed = held(options.speed, 1, 0.25, 4);
  const { glow, ring } = rimLight(node, options.color ?? "var(--iro-success)");
  if (mode === "reduced") {
    const keyframes = [{ boxShadow: glow(16, 2, 0) }, { boxShadow: glow(16, 2, 1) }, { boxShadow: glow(16, 2, 0) }];
    return animate(node, "success", keyframes, { duration: 700 / speed });
  }
  const full = mode === "full";
  const pop = full ? within(node, 0.05, 12) : within(node, 0.02, 5);
  const keyframes = [
    { ...ring(2, 0, 0), boxShadow: glow(0, 0, 0), scale: "1", offset: 0, easing: "ease-out" },
    { ...ring(2, 1, 1), boxShadow: glow(18, 2, 1), scale: String(1 + pop), offset: 0.18, easing: "ease-in-out" },
    { ...ring(1.5, full ? 7 : 4, 0.6), boxShadow: glow(24, 3, 0.6), scale: String(1 - pop / 4), offset: 0.4 },
    { ...ring(1, full ? 14 : 7, 0), boxShadow: glow(30, 4, 0), scale: "1", offset: 1 },
  ];
  return animate(node, "success", keyframes, { duration: (full ? 900 : 700) / speed });
}
