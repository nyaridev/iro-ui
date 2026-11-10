// Flash: "this changed" or "found it". A wash of highlight color fills the element behind its content and fades, the
// way an updated row or a search hit catches the eye. The wash is its own layer, over the element's background and
// any backdrop in it, under its content, and keeps to its corners. It moves nothing, so reduced motion plays it as it
// is; off does nothing.

// ── Dependencies ──────────────────────────
import { css, shade } from "../color";
import { motionOf } from "../motion";
import { type FeedbackOptions, held } from "../options";
import { addPart } from "./animate";

// ── Public API ────────────────────────────
/** Washes `node` in a highlight that fades; resolves when it's gone. */
export async function flash(node: HTMLElement, options: FeedbackOptions = {}): Promise<void> {
  if (motionOf(node) === "off") return;
  const speed = held(options.speed, 1, 0.25, 4);
  // A new flash replaces one still fading.
  for (const old of node.querySelectorAll(":scope > .iro-flash")) for (const run of old.getAnimations()) run.cancel();
  const [wash, remove] = addPart(node, "iro-flash");
  wash.style.backgroundColor = css(shade(node, options.color ?? "var(--iro-yellow)"), 0.3);
  const keyframes = [
    { opacity: 0, offset: 0 },
    { opacity: 1, offset: 0.12, easing: "ease-out" },
    { opacity: 0, offset: 1 },
  ];
  await wash.animate(keyframes, { duration: 1100 / speed }).finished.catch(() => undefined);
  remove();
}
