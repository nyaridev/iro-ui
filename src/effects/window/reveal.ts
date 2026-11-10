// Opening and closing an element from its center, from UmeSync's windows: a circle grows out with a crisp edge and a
// glowing rim while the content inside starts color-inverted and warped like liquid, its noise boiling in steps, and
// settles into place. Closing plays it backwards, quicker. Smooth motion plays a calmer version.

// ── Dependencies ──────────────────────────
import type { EffectOptions } from "../options";
import { frames, transition } from "./state";

// ── Constants ─────────────────────────────
const FILTER_ID = "iro-reveal";

// ── State ─────────────────────────────────
let turbulence: SVGFETurbulenceElement | null = null;
let displacement: SVGFEDisplacementMapElement | null = null;

// ── Private helpers ───────────────────────
const clamp = (n: number) => Math.min(1, Math.max(0, n));
const easeOutExpo = (t: number) => (t >= 1 ? 1 : 1 - 2 ** (-11 * t));
const easeInCubic = (t: number) => t * t * t;

/** A damped spring from 0 to 1: overshoots a little, then settles. */
function spring(t: number): number {
  if (t >= 1) return 1;
  const damping = 0.5;
  const w = Math.log(250) / damping;
  const wd = w * Math.sqrt(1 - damping * damping);
  const decay = Math.exp(-damping * w * t);
  return 1 - decay * (Math.cos(wd * t) + ((damping * w) / wd) * Math.sin(wd * t));
}

/** A circle that covers all of `node`: its layout size, not its box on screen, which an effect may have turned. */
function radiusFor(node: HTMLElement): number {
  return Math.hypot(node.offsetWidth / 2, node.offsetHeight / 2) + 24;
}

// ── Public API ────────────────────────────
/** The SVG filter that warps the content like liquid: its id, and the displacement whose `scale` sets how much. */
export function liquidWarp(): { id: string; displacement: SVGFEDisplacementMapElement | null } {
  if (!document.getElementById(FILTER_ID)) {
    document.body.insertAdjacentHTML(
      "beforeend",
      `<svg width="0" height="0" style="position:absolute" aria-hidden="true">
        <filter id="${FILTER_ID}" x="-20%" y="-20%" width="140%" height="140%" color-interpolation-filters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.011 0.016" numOctaves="2" seed="3" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="0" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>`,
    );
  }
  turbulence = document.querySelector(`#${FILTER_ID} feTurbulence`);
  displacement = document.querySelector(`#${FILTER_ID} feDisplacementMap`);
  return { id: FILTER_ID, displacement };
}

/** Adds the glowing rim inside `node`'s opening circle (`--reveal-r` and `--reveal-glow` set it). */
export function ring(node: HTMLElement) {
  if (node.querySelector(":scope > .iro-reveal-ring")) return;
  const element = document.createElement("div");
  element.className = "iro-reveal-ring iro-effect-part";
  element.setAttribute("aria-hidden", "true");
  node.appendChild(element);
}

/** Opens a hidden `node` from its center. Shown elements are left as they are; `node` needs a position for the
 *  rim. */
export function openReveal(node: HTMLElement, options: EffectOptions = {}): Promise<void> {
  return transition(node, "open", options, (full, speed) => {
    liquidWarp();
    ring(node);
    const max = radiusFor(node);
    let lastSeed = 0;
    return frames(node, (full ? 780 : 460) / speed, (t) => {
      const radius = max * easeOutExpo(t);
      const flip = full ? clamp(1 - t / 0.26) : 0;
      const scale = full ? 0.9 + 0.1 * spring(t) : 0.96 + 0.04 * easeOutExpo(t);
      node.style.opacity = String(clamp(t * 6));
      node.style.clipPath = `circle(${radius.toFixed(1)}px at 50% 50%)`;
      node.style.transform = `scale(${scale.toFixed(4)})`;
      node.style.filter = `url(#${FILTER_ID}) invert(${flip.toFixed(3)}) hue-rotate(${(flip * 180).toFixed(1)}deg)`;
      node.style.setProperty("--reveal-r", `${radius.toFixed(1)}px`);
      node.style.setProperty("--reveal-glow", String(1 - t));
      displacement?.setAttribute("scale", ((full ? 70 : 28) * (1 - t) ** 2).toFixed(2));
      // The noise jumps in steps while it boils, then holds still.
      const now = performance.now();
      if (turbulence && t < 0.7 && now - lastSeed > 55) {
        lastSeed = now;
        turbulence.setAttribute("seed", String(1 + Math.floor(Math.random() * 999)));
      }
    });
  });
}

/** Closes `node` into its center; it stays hidden (`opacity: 0`) until an open effect. */
export function closeReveal(node: HTMLElement, options: EffectOptions = {}): Promise<void> {
  return transition(node, "close", options, (full, speed) => {
    liquidWarp();
    ring(node);
    const max = radiusFor(node);
    return frames(node, (full ? 300 : 220) / speed, (t) => {
      const radius = max * (1 - easeInCubic(t));
      const flip = full ? clamp((t - 0.55) / 0.45) : 0;
      node.style.clipPath = `circle(${radius.toFixed(1)}px at 50% 50%)`;
      node.style.transform = `scale(${(1 - 0.07 * t).toFixed(4)})`;
      node.style.filter = `url(#${FILTER_ID}) invert(${flip.toFixed(3)}) hue-rotate(${(flip * 180).toFixed(1)}deg)`;
      node.style.opacity = String(1 - clamp((t - 0.75) / 0.25));
      node.style.setProperty("--reveal-r", `${radius.toFixed(1)}px`);
      node.style.setProperty("--reveal-glow", String(t));
      displacement?.setAttribute("scale", ((full ? 50 : 20) * t).toFixed(2));
    });
  });
}
