// In-page helpers every measure uses: where the checks look, how a finding names and boxes its element, and the colors
// the browser paints. `install` runs in the page before the Lab loads, so it closes over nothing.

// ── Types ─────────────────────────────────
/** A box in viewport pixels. */
export interface Box {
  x: number;
  y: number;
  width: number;
  height: number;
}

/** What a measure found, before the walker adds the page and look. */
export interface RawFinding {
  /** The check's id, `<area>.<name>`: `layout.end-gap`. */
  check: string;
  message: string;
  /** The element's index in the page's registry, for exceptions and crops. */
  id: number;
  /** A short readable name: its nearest iro-ui owner and itself (`.iro-tree-row › button.iro-icon-button`). */
  path: string;
}

/** sRGB channels 0–255 and alpha 0–1. */
export type Rgba = [number, number, number, number];

export interface IroUi {
  /** The checked area: the Lab's first column, with any overlay it opened. */
  root(): Element;
  /** Every element in the checked area that renders: bigger than a visually hidden 1 px box, not hidden or clear. */
  shown(selector?: string): HTMLElement[];
  /** Records a finding on an element. */
  finding(check: string, element: Element, message: string): RawFinding;
  /** Whether a recorded element is or sits inside an element matching `selector`. */
  within(id: number, selector: string): boolean;
  /** Scrolls a recorded element into view, outlines it, and returns the box to crop. */
  outline(id: number): Box;
  /** Removes the outline. */
  unoutline(): void;
  /** A CSS color as sRGB, through a canvas so every color syntax the browser knows works. */
  rgba(color: string): Rgba;
  /** The opaque color behind an element (its ancestors' fills, opacity included), or null over a gradient or image. */
  backdrop(element: Element): Rgba | null;
  /** A color drawn inside `element` as it reaches the screen: blended over its fill and its ancestors' opacity. */
  painted(element: Element, color: Rgba): { ink: Rgba; under: Rgba } | null;
  /** The WCAG contrast ratio of two opaque colors. */
  ratio(a: Rgba, b: Rgba): number;
  /** The widest ring a `box-shadow` draws (`0 0 0 <n>px <color>`), as styles draw some borders and focus rings. */
  ring(shadow: string): Rgba | null;
}

declare global {
  var iroUi: IroUi;
}

// ── Public API ────────────────────────────
/** Installs `globalThis.iroUi` in the page. */
export function install() {
  const registry: Element[] = [];
  let canvas: CanvasRenderingContext2D | null = null;
  let mark: HTMLElement | null = null;

  const named = (node: Element) => {
    const cls = [...node.classList].find((name) => /^(iro|tpl|lab)-/.test(name));
    const label = node.getAttribute("aria-label");
    return `${node.tagName.toLowerCase()}${cls ? `.${cls}` : ""}${label ? `[aria-label="${label}"]` : ""}`;
  };
  const over = (top: Rgba, bottom: Rgba): Rgba => {
    const a = top[3];
    return [0, 1, 2].map((i) => top[i] * a + bottom[i] * (1 - a)).concat(1) as Rgba;
  };
  const chain = (element: Element) => {
    const nodes: Element[] = [];
    for (let node: Element | null = element; node; node = node.parentElement) nodes.unshift(node);
    return nodes;
  };

  const ui: IroUi = {
    root: () => document.querySelector(".lab-column") ?? document.body,
    shown(selector = "*") {
      return [...ui.root().querySelectorAll<HTMLElement>(selector)].filter((node) => {
        const box = node.getBoundingClientRect();
        return (
          box.width > 2 && box.height > 2 && node.checkVisibility({ opacityProperty: true, visibilityProperty: true })
        );
      });
    },
    finding(check, element, message) {
      let owner = element.parentElement;
      while (owner && owner !== ui.root() && ![...owner.classList].some((name) => name.startsWith("iro-")))
        owner = owner.parentElement;
      const own = named(element);
      const path = owner && owner !== ui.root() ? `${named(owner)} › ${own}` : own;
      return { check, message, id: registry.push(element) - 1, path };
    },
    within: (id, selector) => registry[id]?.closest(selector) != null,
    outline(id) {
      const element = registry[id];
      element.scrollIntoView({ block: "center", inline: "center" });
      const box = element.getBoundingClientRect();
      mark = document.createElement("div");
      Object.assign(mark.style, {
        position: "fixed",
        left: `${box.left - 3}px`,
        top: `${box.top - 3}px`,
        width: `${box.width + 6}px`,
        height: `${box.height + 6}px`,
        outline: "2px solid #ff00c8",
        pointerEvents: "none",
        zIndex: "2147483647",
      });
      document.body.append(mark);
      return { x: box.left, y: box.top, width: box.width, height: box.height };
    },
    unoutline() {
      mark?.remove();
      mark = null;
    },
    rgba(color) {
      canvas ??= document.createElement("canvas").getContext("2d", { willReadFrequently: true });
      if (!canvas) throw new Error("No 2D canvas");
      canvas.clearRect(0, 0, 1, 1);
      canvas.fillStyle = color;
      canvas.fillRect(0, 0, 1, 1);
      const [r, g, b, a] = canvas.getImageData(0, 0, 1, 1).data;
      return [r, g, b, a / 255];
    },
    backdrop(element) {
      return ui.painted(element, [0, 0, 0, 0])?.under ?? null;
    },
    painted(element, color) {
      let under: Rgba = [255, 255, 255, 1];
      let known = true;
      // Opacity blends a whole subtree with what was under it, innermost first.
      const groups: { under: Rgba; opacity: number }[] = [];
      for (const node of chain(element)) {
        const style = getComputedStyle(node);
        const opacity = Number(style.opacity);
        if (opacity < 1) groups.push({ under, opacity });
        const fill = ui.rgba(style.backgroundColor);
        if (style.backgroundImage !== "none") known = false;
        else if (fill[3] === 1) known = true;
        under = over(fill, under);
      }
      if (!known) return null;
      let ink = over(color, under);
      for (const group of groups.reverse()) {
        ink = over([...ink.slice(0, 3), group.opacity] as Rgba, group.under);
        under = over([...under.slice(0, 3), group.opacity] as Rgba, group.under);
      }
      return { ink, under };
    },
    ring(shadow) {
      let widest: { spread: number; color: string } | null = null;
      for (const part of shadow.split(/,(?![^(]*\))/)) {
        const color = part.match(/(rgba?|oklch|oklab|lab|lch|hsla?|color)\([^)]*\)/)?.[0];
        const [x, y, blur, spread] =
          part
            .replace(color ?? "", "")
            .match(/-?[\d.]+px/g)
            ?.map(Number.parseFloat) ?? [];
        if (color && x === 0 && y === 0 && blur === 0 && spread >= 1 && spread > (widest?.spread ?? 0))
          widest = { spread, color };
      }
      return widest && ui.rgba(widest.color);
    },
    ratio(a, b) {
      const luminance = (color: Rgba) => {
        const [r, g, bl] = color.slice(0, 3).map((value) => {
          const c = value / 255;
          return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
        });
        return 0.2126 * r + 0.7152 * g + 0.0722 * bl;
      };
      const [x, y] = [luminance(a), luminance(b)];
      return Math.round(((Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05)) * 100) / 100;
    },
  };
  globalThis.iroUi = ui;
}
