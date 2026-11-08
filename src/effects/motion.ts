// Motion mode lookup for components that animate from JavaScript (a counter counting up): the same answer the CSS
// motion modes give (ADR-0007).

// ── Types ─────────────────────────────────
export type MotionMode = "full" | "smooth" | "reduced" | "off";

// ── Public API ────────────────────────────
/** The motion mode `element` is in: its root's `data-iro-motion`, or the system's reduced-motion setting. */
export function motionOf(element: Element | null): MotionMode {
  const set = element?.closest("[data-iro-style]")?.getAttribute("data-iro-motion");
  if (set === "full" || set === "smooth" || set === "reduced" || set === "off") return set;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "reduced" : "full";
}
