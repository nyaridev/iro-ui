// CRT: a window switching off like an old tube screen, and back on. Off, it squeezes into a bright horizontal line as
// it overexposes and scanlines show, the line pulls into a glowing dot, and the dot fades. On plays it the other way:
// a dot sparks, stretches into a line, and the picture rolls open from it with a little overshoot. Full motion plays
// it all, smooth a shorter version without scanlines or overshoot.

// ── Dependencies ──────────────────────────
import type { CrtOptions } from "../options";
import { frames, transition } from "./state";

// ── Types ─────────────────────────────────
interface Parts {
  /** Scanlines inside the window. */
  lines: HTMLElement;
  /** The bright line and dot, drawn over the page so the window's squeeze doesn't flatten their glow. */
  glow: HTMLElement;
  /** The window's box before the effect. */
  box: DOMRect;
  remove: () => void;
}

// ── Private helpers ───────────────────────
const clamp = (n: number) => Math.min(1, Math.max(0, n));
const mix = (a: number, b: number, t: number) => a + (b - a) * t;
const easeIn = (t: number) => t * t * t;
const easeOut = (t: number) => 1 - (1 - t) ** 3;
/** Past 1 a little, then back: the picture's roll open. */
const overshoot = (t: number) => 1 + 2.2 * (t - 1) ** 3 + 1.2 * (t - 1) ** 2;

function parts(node: HTMLElement, color: string | undefined): Parts {
  const lines = document.createElement("div");
  lines.className = "iro-crt-lines iro-effect-part";
  lines.setAttribute("aria-hidden", "true");
  node.appendChild(lines);
  const glow = document.createElement("div");
  glow.className = "iro-crt-glow";
  glow.setAttribute("aria-hidden", "true");
  if (color) glow.style.setProperty("--crt-glow", color);
  (node.closest("[data-iro-style]") ?? document.body).appendChild(glow);
  return {
    lines,
    glow,
    box: node.getBoundingClientRect(),
    remove: () => {
      lines.remove();
      glow.remove();
    },
  };
}

/** The glow as a bar `width` by `height` px at the window's center, at `alpha`. */
function place({ glow, box }: Parts, width: number, height: number, alpha: number) {
  glow.style.left = `${(box.left + box.width / 2 - width / 2).toFixed(1)}px`;
  glow.style.top = `${(box.top + box.height / 2 - height / 2).toFixed(1)}px`;
  glow.style.width = `${width.toFixed(1)}px`;
  glow.style.height = `${height.toFixed(1)}px`;
  glow.style.opacity = alpha.toFixed(3);
}

/** The window squeezed to `sx` by `sy` and overexposed by `burn` (0–1). */
function squeeze(node: HTMLElement, sx: number, sy: number, burn: number) {
  node.style.transform = `scale(${sx.toFixed(4)}, ${sy.toFixed(4)})`;
  node.style.filter = `brightness(${(1 + 2.4 * burn).toFixed(3)}) saturate(${(1 - 0.6 * burn).toFixed(3)}) contrast(${(1 + 0.3 * burn).toFixed(3)})`;
}

// ── Public API ────────────────────────────
/** Switches `node` off into a line and a dot; it stays hidden (`opacity: 0`) until an open effect. */
export function closeCrt(node: HTMLElement, options: CrtOptions = {}): Promise<void> {
  return transition(node, "close", options, async (full, speed) => {
    const scene = parts(node, options.color);
    const { width } = scene.box;
    const done = await frames(node, (full ? 560 : 400) / speed, (t) => {
      const flat = easeIn(clamp(t / 0.42));
      const pinch = easeIn(clamp((t - 0.42) / 0.3));
      const sx = (1 + (full ? 0.06 : 0) * flat) * mix(1, 0.004, pinch);
      squeeze(node, sx, mix(1, 0.008, flat), flat * (full ? 1 : 0.6));
      node.style.opacity = String(1 - clamp((t - 0.62) / 0.12));
      scene.lines.style.opacity = full ? String(flat * 0.8) : "0";
      // The line, then the dot it pulls into, then the dot fading.
      const shown = clamp((t - 0.32) / 0.1) * (1 - clamp((t - 0.86) / 0.14));
      if (t < 0.72) place(scene, Math.max(width * sx, 6), 2, shown * (full ? 1 : 0.7));
      else {
        const fade = (t - 0.72) / 0.28;
        place(scene, mix(12, 3, fade), mix(12, 3, fade), shown * (full ? 1 : 0.7));
      }
    });
    scene.remove();
    return done;
  });
}

/** Switches a hidden `node` back on: a dot, a line, then the picture rolling open. Shown elements are left as they
 *  are. */
export function openCrt(node: HTMLElement, options: CrtOptions = {}): Promise<void> {
  return transition(node, "open", options, async (full, speed) => {
    const scene = parts(node, options.color);
    const { width } = scene.box;
    const done = await frames(node, (full ? 620 : 420) / speed, (t) => {
      const spark = easeOut(clamp(t / 0.18));
      const stretch = easeOut(clamp((t - 0.18) / 0.22));
      const roll = clamp((t - 0.4) / 0.6);
      const open = full ? overshoot(roll) : easeOut(roll);
      if (t < 0.18) place(scene, mix(2, 12, spark), mix(2, 12, spark), spark);
      else place(scene, mix(12, width, stretch), mix(12, 2, stretch), 1 - clamp((t - 0.44) / 0.12));
      node.style.opacity = t < 0.4 ? "0" : "1";
      squeeze(node, 1 + (full ? 0.05 : 0) * (1 - roll), mix(0.008, 1, open), 1 - easeOut(roll));
      scene.lines.style.opacity = full ? String(0.8 * (1 - roll)) : "0";
    });
    scene.remove();
    return done;
  });
}
