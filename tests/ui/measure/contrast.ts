// Contrast measures beyond rendered text (axe-core checks that): placeholders read at 4.5:1, icons that are a control's
// only label at 3:1, and the edge or fill that shows where a control is at 3:1 (ADR-0014). Each runs on `iroUi`.

// ── Dependencies ──────────────────────────
import type { RawFinding, Rgba } from "./page";

// ── Public API ────────────────────────────
/** `contrast.placeholder`: placeholder text is text, so it reads at 4.5:1 on its field. */
export function placeholders(): RawFinding[] {
  const out: RawFinding[] = [];
  for (const field of iroUi.shown("input[placeholder], textarea[placeholder]") as HTMLInputElement[]) {
    if (field.value || field.disabled) continue;
    const seen = iroUi.painted(field, iroUi.rgba(getComputedStyle(field, "::placeholder").color));
    if (!seen) continue;
    const ratio = iroUi.ratio(seen.ink, seen.under);
    if (ratio < 4.5)
      out.push(
        iroUi.finding("contrast.placeholder", field, `placeholder "${field.placeholder}" is ${ratio}:1, needs 4.5:1`),
      );
  }
  return out;
}

/** `contrast.icon`: an icon that is a control's only label stands out at 3:1 (disabled controls aside). */
export function icons(): RawFinding[] {
  const out: RawFinding[] = [];
  const CONTROL = "button, a[href], [role='button'], [role='tab'], [role='menuitem'], [role='switch'], [role='option']";
  for (const icon of iroUi.shown("svg")) {
    const control = icon.closest(CONTROL);
    if (
      !control ||
      control.textContent?.trim() ||
      control.closest(":disabled, [aria-disabled='true'], [data-disabled]")
    )
      continue;
    const style = getComputedStyle(icon);
    const ink = style.stroke !== "none" ? style.stroke : style.fill;
    const seen = iroUi.painted(icon, iroUi.rgba(ink.startsWith("url") ? style.color : ink));
    if (!seen) continue;
    const ratio = iroUi.ratio(seen.ink, seen.under);
    if (ratio < 3) out.push(iroUi.finding("contrast.icon", control, `icon is ${ratio}:1 on its background, needs 3:1`));
  }
  return out;
}

/** `contrast.edge`: a field, checkbox, radio, switch or slider shows where it is: its edge or its fill against what's
 *  around it at 3:1. The box is the control, or the wrapper that draws it (a field's frame). */
export function edges(): RawFinding[] {
  const out: RawFinding[] = [];
  const CONTROL =
    "input:not([type='hidden']):not([type='range']):not([readonly]), textarea:not([readonly]), [role='checkbox'], [role='radio'], [role='switch'], [role='slider'], [role='combobox']";
  /** Whether a box draws itself: a full border (or an underline on the control itself), a ring, or a fill that
   *  differs from what's behind it. A row's divider or a fill like its parent's doesn't. */
  const drawn = (node: Element, control: Element) => {
    const style = getComputedStyle(node);
    const width = (side: string) => Number.parseFloat(style.getPropertyValue(`border-${side}-width`));
    const behind = node.parentElement && iroUi.backdrop(node.parentElement);
    const fill = iroUi.backdrop(node);
    return (
      style.backgroundImage !== "none" ||
      ["top", "right", "bottom", "left"].every((side) => width(side) > 0) ||
      (node === control && width("bottom") > 0) ||
      iroUi.ring(style.boxShadow) !== null ||
      (!!behind && !!fill && iroUi.ratio(fill, behind) > 1.05)
    );
  };
  const seen = new Set<Element>();
  for (const control of iroUi.shown(CONTROL)) {
    if (control.closest(":disabled, [aria-disabled='true'], [data-disabled]")) continue;
    // The box that draws the control: itself, or the closest wrapper about its size that draws (a field's frame
    // around a bare input, a prompt's frame around its text and tools), never a panel it sits in.
    const height = control.getBoundingClientRect().height;
    let box: Element | null = null;
    for (let node: Element | null = control, depth = 0; node && !box && depth < 4; node = node.parentElement, depth++)
      if (drawn(node, control) && node.getBoundingClientRect().height <= Math.max(height * 1.5, height + 64))
        box = node;
    // A frame holding this one field and its tools (a prompt with attachments and a picker) can be taller.
    for (let node = control.parentElement, depth = 1; node && !box && depth < 4; node = node.parentElement, depth++)
      if (drawn(node, control) && node.querySelectorAll(control.tagName).length === 1) box = node;
    // A control drawn as an icon (a rating star) shows where it is by the icon's own lines.
    const icon = !box && control.querySelector("svg");
    if (icon) {
      const style = getComputedStyle(icon);
      const seen = iroUi.painted(icon, iroUi.rgba(style.stroke !== "none" ? style.stroke : style.fill));
      const ratio = seen ? iroUi.ratio(seen.ink, seen.under) : 3;
      if (ratio < 3)
        out.push(iroUi.finding("contrast.edge", control, `its icon is ${ratio}:1 on its background, needs 3:1`));
      continue;
    }
    if (!box) {
      out.push(iroUi.finding("contrast.edge", control, "draws no edge or fill to show where it is"));
      continue;
    }
    if (seen.has(box)) continue;
    seen.add(box);
    const around = box.parentElement && iroUi.backdrop(box.parentElement);
    const fill = iroUi.backdrop(box);
    if (!around || !fill) continue;
    const style = getComputedStyle(box);
    const edgeColors: Rgba[] = [];
    if (Number.parseFloat(style.borderBottomWidth) > 0) edgeColors.push(iroUi.rgba(style.borderBottomColor));
    if (Number.parseFloat(style.borderTopWidth) > 0) edgeColors.push(iroUi.rgba(style.borderTopColor));
    const ring = iroUi.ring(style.boxShadow);
    if (ring) edgeColors.push(ring);
    const over = (top: Rgba, bottom: Rgba): Rgba =>
      [0, 1, 2].map((i) => top[i] * top[3] + bottom[i] * (1 - top[3])).concat(1) as Rgba;
    const ratios = [iroUi.ratio(fill, around), ...edgeColors.map((edge) => iroUi.ratio(over(edge, fill), around))];
    const best = Math.max(...ratios);
    // A checked toggle shows its state by the mark inside (a check, a thumb) against its fill (WCAG 1.4.11).
    const mark = control.matches("[aria-checked='true'], [data-checked]") && box.querySelector("svg, [class*='thumb']");
    if (mark) {
      const style = getComputedStyle(mark);
      const color =
        mark instanceof SVGElement ? (style.stroke !== "none" ? style.stroke : style.fill) : style.backgroundColor;
      if (iroUi.ratio(over(iroUi.rgba(color), fill), fill) >= 3) continue;
    }
    if (best < 3)
      out.push(
        iroUi.finding("contrast.edge", box, `edge and fill reach ${best}:1 against what's around, needs 3:1 for one`),
      );
  }
  return out;
}
