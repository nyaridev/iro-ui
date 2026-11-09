// Layout measures (ADR-0014): small controls sit evenly in the box at the end of a row, labels and icons sit on their
// box's middle, text isn't cut off or outside its box, and stacked text lines up. Each runs in the page on `iroUi`.

// ── Dependencies ──────────────────────────
import type { RawFinding } from "./page";

// ── Public API ────────────────────────────
/** `layout.end-gap`: a small button at the end of a row keeps the same gap above and below as at its side. */
export function endGaps(): RawFinding[] {
  const ROWISH = /(row|item|head|header|bar|tab|chip|tag|hash|field|option|trigger|toast|banner|notice|card|pill)\b/;
  const boxed = (style: CSSStyleDeclaration) =>
    iroUi.rgba(style.backgroundColor)[3] > 0 ||
    ["Top", "Right", "Bottom", "Left"].some(
      (side) => Number.parseFloat(style.getPropertyValue(`border-${side.toLowerCase()}-width`)) > 0,
    );
  const frameOf = (button: Element) => {
    let node = button.parentElement;
    for (let depth = 0; node && depth < 6 && node !== iroUi.root(); depth++, node = node.parentElement) {
      const iro = [...node.classList].find((name) => name.startsWith("iro-"));
      if (!iro || iro === "iro-root" || iro === "iro-root-layer") continue;
      const style = getComputedStyle(node);
      if (boxed(style) || (Number.parseFloat(style.borderTopLeftRadius) > 0 && ROWISH.test(iro))) return node;
    }
    return null;
  };
  const out: RawFinding[] = [];
  const buttons = iroUi.shown(
    ".iro-icon-button, .iro-button[data-size='sm'], button[class*='-remove'], button[class*='-close']",
  );
  for (const button of buttons) {
    const frame = frameOf(button);
    if (!frame) continue;
    const box = button.getBoundingClientRect();
    const outer = frame.getBoundingClientRect();
    const style = getComputedStyle(frame);
    const top = Math.round(box.top - outer.top - Number.parseFloat(style.borderTopWidth));
    const bottom = Math.round(outer.bottom - Number.parseFloat(style.borderBottomWidth) - box.bottom);
    const right = Math.round(outer.right - Number.parseFloat(style.borderRightWidth) - box.right);
    const left = Math.round(box.left - outer.left - Number.parseFloat(style.borderLeftWidth));
    const side = Math.min(left, right);
    // Only buttons tucked against an end of their box: there, the side gap is what the top and bottom should echo.
    if (side > 16 || outer.height > 2.2 * box.height) continue;
    // Equal gaps matter in a one-line row; beside a title and a description the button centres instead.
    // biome-ignore lint/performance/useDomNodeTextContent: the rendered line breaks are what this reads.
    const oneLine = !frame.innerText.trim().includes("\n");
    const message =
      top < 0 || bottom < 0
        ? `sticks out of its box: ${top}px above, ${bottom}px below`
        : Math.min(top, bottom) <= 1 && side >= 2
          ? `touches its box's ${top <= bottom ? "top" : "bottom"} edge while ${side}px from its side`
          : Math.abs(top - bottom) > 3
            ? `sits off centre in its box: ${top}px above, ${bottom}px below`
            : oneLine && Math.abs(Math.min(top, bottom) - side) > 2
              ? `${Math.min(top, bottom)}px above and below, but ${side}px at its side`
              : null;
    if (message) out.push(iroUi.finding("layout.end-gap", button, message));
  }
  return out;
}

/** `layout.text-center` and `layout.icon-center`: a one-line label's cap height sits on its box's middle, and an icon
 *  on its label's. */
export function centering(): RawFinding[] {
  const TOLERANCE = 1.5;
  const canvas = document.createElement("canvas").getContext("2d");
  if (!canvas) return [];
  const boxed = (style: CSSStyleDeclaration) =>
    iroUi.rgba(style.backgroundColor)[3] > 0 || Number.parseFloat(style.borderTopWidth) > 0;
  /** The middle of the text's cap height, in viewport pixels, or null when it wraps. */
  const middleOf = (text: Text) => {
    const range = document.createRange();
    range.selectNodeContents(text);
    const rects = range.getClientRects();
    if (rects.length !== 1) return null;
    const style = getComputedStyle(text.parentElement as Element);
    // Layout rounds the ascent to whole pixels, as canvas does at the real size; the cap height is read at ten times
    // the size for sub-pixel precision.
    const size = Number.parseFloat(style.fontSize);
    canvas.font = `${style.fontStyle} ${style.fontWeight} ${size}px ${style.fontFamily}`;
    const baseline = rects[0].top + canvas.measureText("H").fontBoundingBoxAscent;
    canvas.font = `${style.fontStyle} ${style.fontWeight} ${size * 10}px ${style.fontFamily}`;
    return { middle: baseline - canvas.measureText("H").actualBoundingBoxAscent / 20, rect: rects[0] };
  };
  const texts: Text[] = [];
  const walker = document.createTreeWalker(iroUi.root(), NodeFilter.SHOW_TEXT);
  for (let node = walker.nextNode(); node; node = walker.nextNode()) {
    const parent = node.parentElement;
    if (node.textContent?.trim() && parent?.checkVisibility({ opacityProperty: true, visibilityProperty: true }))
      texts.push(node as Text);
  }

  const out: RawFinding[] = [];
  const seen = new Set<Element>();
  for (const text of texts) {
    let frame = text.parentElement;
    while (frame && frame !== iroUi.root() && !boxed(getComputedStyle(frame))) frame = frame.parentElement;
    if (!frame || frame === iroUi.root() || seen.has(frame)) continue;
    seen.add(frame);
    const outer = frame.getBoundingClientRect();
    const label = middleOf(text);
    if (!label || outer.height > 64 || outer.height < label.rect.height) continue;
    // Only boxes holding one line: every text inside sits on the same line as this one.
    // biome-ignore lint/performance/useDomNodeTextContent: the rendered line breaks are what this reads.
    const inner = frame.innerText.trim();
    if (inner.includes("\n") || frame.querySelector("input, textarea, select, img, canvas")) continue;
    const style = getComputedStyle(frame);
    const top = outer.top + Number.parseFloat(style.borderTopWidth);
    const bottom = outer.bottom - Number.parseFloat(style.borderBottomWidth);
    const off = Math.round((label.middle - (top + bottom) / 2) * 10) / 10;
    if (Math.abs(off) > TOLERANCE)
      out.push(
        iroUi.finding(
          "layout.text-center",
          frame,
          `"${inner.slice(0, 24)}" sits ${Math.abs(off)}px ${off < 0 ? "above" : "below"} its box's middle`,
        ),
      );
  }

  for (const icon of iroUi.shown("svg")) {
    const box = icon.getBoundingClientRect();
    if (box.height > 32 || getComputedStyle(icon).position === "absolute") continue;
    // The label is the icon's neighbour: the node next to it, or next to a wrapper that fits it closely. An icon alone
    // in a control or a bigger tile has no label to line up with.
    let own: Element = icon;
    while (
      own.parentElement?.childNodes.length === 1 &&
      !own.parentElement.matches("button, a, [role]") &&
      own.parentElement.getBoundingClientRect().height <= box.height * 1.5
    )
      own = own.parentElement;
    const next = [own.previousSibling, own.nextSibling].find((node) => node?.textContent?.trim());
    // A neighbour taller than one line (a title over a description) is a block the icon centres on as a whole.
    const tall =
      next instanceof Element &&
      next.getBoundingClientRect().height > 1.6 * Number.parseFloat(getComputedStyle(next).fontSize) * 1.5;
    const text = next && !tall ? texts.find((node) => next === node || next.contains(node)) : undefined;
    const label = text && middleOf(text);
    if (!label || label.rect.bottom < box.top || label.rect.top > box.bottom) continue;
    const off = Math.round((box.top + box.height / 2 - label.middle) * 10) / 10;
    if (Math.abs(off) > TOLERANCE)
      out.push(
        iroUi.finding(
          "layout.icon-center",
          icon,
          `sits ${Math.abs(off)}px ${off < 0 ? "above" : "below"} the middle of "${text.data.trim().slice(0, 24)}"`,
        ),
      );
  }
  return out;
}

/** `layout.clip` and `layout.overflow`: text isn't cut off by a box that hides overflow (ellipsis and line clamps
 *  aside), and doesn't run out of the box drawn around it. */
export function overflow(): RawFinding[] {
  const SLACK = 1;
  const out: RawFinding[] = [];
  const seen = new Set<Element>();
  const walker = document.createTreeWalker(iroUi.root(), NodeFilter.SHOW_TEXT);
  for (let node = walker.nextNode(); node; node = walker.nextNode()) {
    const parent = node.parentElement;
    if (!node.textContent?.trim() || !parent || seen.has(parent)) continue;
    if (!parent.checkVisibility({ opacityProperty: true, visibilityProperty: true })) continue;
    const range = document.createRange();
    range.selectNodeContents(node);
    const text = range.getBoundingClientRect();
    const own = parent.getBoundingClientRect();
    // Visually hidden text (a 1 px box) is for screen readers, not cut.
    if (text.width === 0 || own.width <= 2 || own.height <= 2) continue;
    let truncates = false;
    let boxedBy: Element | null = null;
    for (let box: Element | null = parent; box && box !== iroUi.root(); box = box.parentElement) {
      const style = getComputedStyle(box);
      if (style.textOverflow === "ellipsis" || style.getPropertyValue("-webkit-line-clamp") !== "none")
        truncates = true;
      // Inside a scrolling box, text may be scrolled out of view on purpose.
      if (/auto|scroll/.test(style.overflowX + style.overflowY)) break;
      const rect = box.getBoundingClientRect();
      const inside = {
        left: rect.left + Number.parseFloat(style.borderLeftWidth),
        right: rect.right - Number.parseFloat(style.borderRightWidth),
        top: rect.top + Number.parseFloat(style.borderTopWidth),
        bottom: rect.bottom - Number.parseFloat(style.borderBottomWidth),
      };
      const past = {
        x: Math.max(inside.left - text.left, text.right - inside.right),
        y: Math.max(inside.top - text.top, text.bottom - inside.bottom),
      };
      const hides = (axis: "x" | "y") => /hidden|clip/.test(axis === "x" ? style.overflowX : style.overflowY);
      // Visually hidden text (a tiny or clipped box) is for screen readers.
      if (rect.width < 4 || rect.height < 4 || style.clipPath !== "none") break;
      // Text wholly outside is scrolled or slid away on purpose; only a partly hidden line is cut.
      const overlaps = text.right > inside.left && text.left < inside.right && text.bottom > inside.top;
      const cut = (["x", "y"] as const).find((axis) => hides(axis) && past[axis] > SLACK);
      if (cut && !truncates && overlaps && text.top < inside.bottom) {
        seen.add(parent);
        out.push(
          iroUi.finding(
            "layout.clip",
            parent,
            `"${node.textContent.trim().slice(0, 24)}" is cut off by ${cut === "x" ? "the sides" : "the top or bottom"} of its box (${Math.round(past[cut])}px)`,
          ),
        );
        break;
      }
      // A box drawn around text: a fill or a full border, at least as tall as the text (not a rule or a bar).
      const drawn =
        iroUi.rgba(style.backgroundColor)[3] > 0 ||
        ["top", "right", "bottom", "left"].every(
          (side) => Number.parseFloat(style.getPropertyValue(`border-${side}-width`)) > 0,
        );
      if (!boxedBy && drawn && !truncates && rect.height >= text.height) {
        boxedBy = box;
        const worst = Math.max(past.x, past.y);
        if (worst > SLACK && !cut) {
          seen.add(parent);
          out.push(
            iroUi.finding(
              "layout.overflow",
              parent,
              `"${node.textContent.trim().slice(0, 24)}" runs ${Math.round(worst)}px outside the box drawn around it`,
            ),
          );
          break;
        }
      }
    }
  }
  return out;
}

/** `layout.near-align`: left-aligned text stacked in a column starts at the same x, not a pixel or three apart. */
export function nearAlign(): RawFinding[] {
  const out: RawFinding[] = [];
  const startOf = (element: Element) => {
    const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
    for (let node = walker.nextNode(); node; node = walker.nextNode()) {
      if (!node.textContent?.trim()) continue;
      const parent = node.parentElement as Element;
      const style = getComputedStyle(parent);
      // Text centred in a badge or an avatar's initials isn't where the line starts; the next text is.
      if (style.justifyContent === "center" || style.justifyItems === "center") continue;
      if (!/start|left/.test(style.textAlign)) return null;
      const range = document.createRange();
      range.selectNodeContents(node);
      return range.getClientRects()[0]?.left ?? null;
    }
    return null;
  };
  // Columns inside a component or a template; how the Lab stacks its demos isn't a component's promise.
  for (const column of iroUi.shown("[class*='iro-'], [class*='tpl-']")) {
    const kids = [...column.children].filter((kid) => kid.getBoundingClientRect().height > 0);
    if (kids.length < 3) continue;
    const boxes = kids.map((kid) => kid.getBoundingClientRect());
    if (boxes.some((box, index) => index > 0 && box.top < boxes[index - 1].bottom - 1)) continue;
    const starts = kids.map(startOf);
    const counts = new Map<number, number>();
    for (const start of starts)
      if (start !== null) counts.set(Math.round(start), (counts.get(Math.round(start)) ?? 0) + 1);
    const [common, times] = [...counts].sort((a, b) => b[1] - a[1])[0] ?? [0, 0];
    if (times < 2) continue;
    starts.forEach((start, index) => {
      const off = start === null ? 0 : Math.round((start - common) * 10) / 10;
      if (Math.abs(off) > 1.5 && Math.abs(off) <= 4)
        out.push(iroUi.finding("layout.near-align", kids[index], `text starts ${off}px from the column's other lines`));
    });
  }
  return out;
}
