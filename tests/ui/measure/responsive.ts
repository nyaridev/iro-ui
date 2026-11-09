// Phone measures (ADR-0014): nothing runs past the screen's edge at 320 px, and nothing waits for a hover a touch
// screen can't give. Runs in the page on `iroUi`.

// ── Dependencies ──────────────────────────
import type { RawFinding } from "./page";

// ── Public API ────────────────────────────
/** `responsive.overflow`: no element runs past the Lab's stage (or the window, for overlays) unless something
 *  around it scrolls or clips sideways. Only the outermost element that runs past is named. */
export function sideways(): RawFinding[] {
  const root = iroUi.root();
  const stage = root.closest(".lab-stage") ?? document.documentElement;
  const box = stage.getBoundingClientRect();
  const left = Math.max(0, box.left);
  const right = Math.min(document.documentElement.clientWidth, box.left + stage.clientWidth);
  const past = (node: Element) => {
    const rect = node.getBoundingClientRect();
    return Math.max(rect.right - right, left - rect.left);
  };
  const held = (node: Element) => {
    for (let up = node.parentElement; up && up !== root; up = up.parentElement)
      if (/auto|scroll|hidden|clip/.test(getComputedStyle(up).overflowX)) return true;
    return false;
  };
  const out: RawFinding[] = [];
  for (const node of iroUi.shown()) {
    const by = past(node);
    if (by <= 1 || held(node)) continue;
    const parent = node.parentElement;
    if (parent && parent !== root && past(parent) > 1) continue;
    out.push(iroUi.finding("responsive.overflow", node, `runs ${Math.round(by)}px past the screen's edge`));
  }
  return out;
}

/** `responsive.hover-only`: under a touch screen (`hover: none`), no button or link is invisible until hovered. */
export function hoverOnly(): RawFinding[] {
  if (!matchMedia("(hover: none)").matches) return [];
  const CONTROL = "button, a[href], [role='button'], [role='menuitem'], [role='tab']";
  const out: RawFinding[] = [];
  for (const node of iroUi.root().querySelectorAll(CONTROL)) {
    const rect = node.getBoundingClientRect();
    // An overlay that is still entering or leaving is see-through for a frame, not hover-only.
    const away = "[inert], [aria-hidden='true'], [hidden], [data-starting-style], [data-ending-style]";
    if (rect.width <= 2 || rect.height <= 2 || node.closest(away)) continue;
    // Rendered (not display: none) but see-through or hidden: it shows only on hover.
    if (!node.checkVisibility() || node.checkVisibility({ opacityProperty: true, visibilityProperty: true })) continue;
    out.push(
      iroUi.finding("responsive.hover-only", node, "is invisible until hovered, and a touch screen can't hover"),
    );
  }
  return out;
}
