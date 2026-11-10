// What the effects that take a window apart draw with: a stage fixed over the window, copies of the window for the
// pieces (each shows its part, so each needs a copy), and the colors under it. Copies are pictures, not the app: no
// ids, inert and hidden from assistive tech, their canvases painted from the originals, frames and media left
// unloaded, and nothing in them animates.

// ── Dependencies ──────────────────────────
import { rgba } from "../color";

// ── Types ─────────────────────────────────
export interface Stage {
  /** Fixed over the window, the size of its layout box, above the page. */
  element: HTMLElement;
  /** The window on screen when the stage was set. */
  box: DOMRect;
  width: number;
  height: number;
  /** A new copy of the window filling the stage, ready to clip and move. */
  copy: () => HTMLElement;
  remove: () => void;
}

// ── Public API ────────────────────────────
/** Sets a stage over `node`, beside it in the document so the copies keep its inherited look. */
export function stage(node: HTMLElement): Stage {
  const box = node.getBoundingClientRect();
  const width = node.offsetWidth;
  const height = node.offsetHeight;
  const element = document.createElement("div");
  element.className = "iro-effect-stage";
  element.setAttribute("aria-hidden", "true");
  element.inert = true;
  Object.assign(element.style, {
    left: `${box.left}px`,
    top: `${box.top}px`,
    width: `${width}px`,
    height: `${height}px`,
  });
  node.after(element);
  // Under a transformed ancestor `fixed` is relative to it: move the stage by what's off.
  const placed = element.getBoundingClientRect();
  element.style.left = `${2 * box.left - placed.left}px`;
  element.style.top = `${2 * box.top - placed.top}px`;

  const canvases = [...node.querySelectorAll("canvas")];
  const copy = () => {
    const clone = node.cloneNode(true) as HTMLElement;
    clone.removeAttribute("id");
    clone.removeAttribute("data-iro-reveal");
    for (const part of clone.querySelectorAll(":scope > .iro-effect-part")) part.remove();
    for (const named of clone.querySelectorAll("[id]")) named.removeAttribute("id");
    // A copied frame or video would load again: copies leave them empty.
    for (const frame of clone.querySelectorAll("iframe")) frame.removeAttribute("src");
    for (const media of clone.querySelectorAll<HTMLMediaElement>("video, audio")) {
      media.removeAttribute("autoplay");
      media.preload = "none";
    }
    // Their own animations and transitions would replay from the start: a copy is a still picture.
    for (const element of [clone, ...clone.querySelectorAll<HTMLElement | SVGElement>("*")]) {
      element.style.animation = "none";
      element.style.transition = "none";
    }
    clone.querySelectorAll("canvas").forEach((canvas, i) => {
      try {
        if (canvases[i]) canvas.getContext("2d")?.drawImage(canvases[i], 0, 0);
      } catch {
        // A canvas tainted by another origin stays blank in the copy.
      }
    });
    Object.assign(clone.style, {
      position: "absolute",
      inset: "0 auto auto 0",
      margin: "0",
      boxSizing: "border-box",
      width: `${width}px`,
      height: `${height}px`,
      transform: "none",
      translate: "none",
      rotate: "none",
      scale: "none",
      opacity: "1",
      clipPath: "none",
      filter: "none",
    });
    return clone;
  };
  return { element, box, width, height, copy, remove: () => element.remove() };
}

/** What the UI inside `node` looks like, as a `cols` by `rows` grid of CSS colors: each cell holds the first solid
 *  background under its center, or one of `fallback` (the backdrop's tints) where that's `node` itself. */
export function colorsUnder(node: HTMLElement, cols: number, rows: number, fallback: string[]): string[][] {
  const rect = node.getBoundingClientRect();
  const cells: string[][] = [];
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      let element = document.elementFromPoint(
        rect.left + ((col + 0.5) / cols) * rect.width,
        rect.top + ((row + 0.5) / rows) * rect.height,
      );
      let found = "";
      while (element && element !== node && element !== document.body && !found) {
        const [r, g, b, a] = rgba(getComputedStyle(element).backgroundColor);
        if (a > 0.35) found = `rgb(${r} ${g} ${b})`;
        element = element.parentElement;
      }
      cells.push(found ? [found] : fallback);
    }
  }
  return cells;
}
