// Accessibility measures axe-core can't make: every element Tab reaches shows where focus is, with a ring that stands
// out at 3:1 (ADR-0014). Runs in the page on `iroUi`; call it right after a key press, so focus shows the way it does
// for keyboard users.

// ── Dependencies ──────────────────────────
import type { RawFinding, Rgba } from "./page";

// ── Public API ────────────────────────────
/** `a11y.focus` and `a11y.focus-contrast`: focusing each element changes how it, its parent, grandparent or a child
 *  looks, and an outline ring reaches 3:1 against what's around it. */
export function focus(): RawFinding[] {
  const TABBABLE = "a[href], button, input, select, textarea, summary, [tabindex], [contenteditable='true']";
  const look = (node: Element) => {
    const style = getComputedStyle(node);
    const after = getComputedStyle(node, "::after");
    const before = getComputedStyle(node, "::before");
    return [
      style.outlineStyle,
      style.outlineWidth,
      style.outlineColor,
      style.boxShadow,
      style.borderTopColor,
      style.borderBottomColor,
      style.backgroundColor,
      style.color,
      style.textDecorationLine,
      after.boxShadow,
      after.outlineStyle,
      after.borderTopColor,
      after.opacity,
      before.boxShadow,
      before.outlineStyle,
      before.opacity,
    ].join("|");
  };
  /** Where focus may show: the element, its parent, grandparent and first children, if they can be seen (a
   *  visually hidden input's outline shows nothing). */
  const near = (node: Element) =>
    [node, node.parentElement, node.parentElement?.parentElement, ...[...node.children].slice(0, 3)].filter(
      (each): each is Element =>
        !!each &&
        Math.max(each.getBoundingClientRect().width, each.getBoundingClientRect().height) > 2 &&
        getComputedStyle(each).clipPath === "none",
    );
  // With an overlay open, only its contents: the page was checked closed, and an open trigger already looks active.
  const layer = iroUi.overlay();
  const open = !!layer;
  const targets = iroUi
    .shown(TABBABLE)
    // An option Base UI already highlights (its virtual focus) looks the same when focused for real.
    .filter((node) => node.tabIndex >= 0 && !node.matches(":disabled, [data-highlighted]") && !node.closest("[inert]"))
    .filter((node) => !open || layer?.contains(node));
  // What had focus (a dialog focuses its first button) would look unchanged when focused again.
  const back = document.activeElement as HTMLElement | null;
  back?.blur();
  const before = new Map<Element, string>();
  for (const target of targets) for (const node of near(target)) before.set(node, look(node));

  const out: RawFinding[] = [];
  for (const target of targets) {
    if (!target.isConnected) continue;
    // Shown the way Tab shows it: WebKit hides the ring of a script's focus after a click opened the overlay.
    target.focus({ preventScroll: true, focusVisible: true } as FocusOptions);
    // A modal keeps focus inside itself; whatever it sent focus to is checked on its own turn.
    if (document.activeElement !== target) continue;
    const changed = near(target).filter((node) => look(node) !== before.get(node));
    if (changed.length === 0) {
      out.push(iroUi.finding("a11y.focus", target, "shows nothing when focused"));
      continue;
    }
    // The ring as drawn, an outline or a box-shadow ring, on whichever of them shows it.
    const ringOf = (node: Element) => {
      const style = getComputedStyle(node);
      if (style.outlineStyle !== "none" && Number.parseFloat(style.outlineWidth) >= 1)
        return iroUi.rgba(style.outlineColor);
      return iroUi.ring(style.boxShadow);
    };
    const ringed = changed.find((node) => ringOf(node));
    // What the ring sits on: the first box around it at least as tall (past a slider's thin track).
    let outside = ringed?.parentElement;
    while (outside && outside.getBoundingClientRect().height < (ringed?.getBoundingClientRect().height ?? 0))
      outside = outside.parentElement;
    const around = outside && iroUi.backdrop(outside);
    const ring = ringed && ringOf(ringed);
    if (!ring || !around) continue;
    const drawn = [0, 1, 2].map((i) => ring[i] * ring[3] + around[i] * (1 - ring[3])).concat(1) as Rgba;
    const ratio = iroUi.ratio(drawn, around);
    if (ratio < 3) out.push(iroUi.finding("a11y.focus-contrast", ringed, `focus ring is ${ratio}:1, needs 3:1`));
  }
  (document.activeElement as HTMLElement | null)?.blur();
  back?.focus({ preventScroll: true });
  return out;
}
