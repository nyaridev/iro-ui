// Paper fold: the window folds up like a letter, in an accordion. It creases into bands that tilt toward you and
// away in turn, each lit or shaded by its angle, until it's a thin folded stack that lifts away and fades. Opening
// unfolds it. Smooth motion folds it in two bands, without the lift.

// ── Dependencies ──────────────────────────
import type { EffectOptions } from "../options";
import { stage } from "./stage";
import { frames, transition } from "./state";

// ── Types ─────────────────────────────────
interface Band {
  /** The band's hinge: it turns about its top edge, carrying the bands below it. */
  hinge: HTMLElement;
  light: HTMLElement;
  /** 1 when its bottom edge comes toward you (it faces down, away from the light), -1 when it goes back. */
  way: number;
}

// ── Private helpers ───────────────────────
const clamp = (n: number) => Math.min(1, Math.max(0, n));
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);
const easeIn = (t: number) => t * t;

/** Plays the fold on `node`; `forward` folds it up, otherwise it unfolds. */
async function play(node: HTMLElement, full: boolean, speed: number, forward: boolean) {
  const scene = stage(node);
  const { width, height } = scene;
  scene.element.style.perspective = `${Math.round(Math.max(width, height) * 2.2)}px`;
  const count = full ? Math.max(2, Math.min(4, Math.round(height / 70))) : 2;
  const band = height / count;

  // Each band's hinge sits inside the one above, so turning one carries the rest.
  const bands: Band[] = [];
  let parent = scene.element;
  for (let i = 0; i < count; i++) {
    const hinge = document.createElement("div");
    hinge.className = "iro-fold-hinge";
    hinge.style.transformOrigin = `50% ${(i * band).toFixed(2)}px`;
    const face = document.createElement("div");
    face.className = "iro-fold-face";
    face.style.clipPath = `inset(${(i * band).toFixed(2)}px 0 ${(height - (i + 1) * band).toFixed(2)}px 0)`;
    const light = document.createElement("div");
    light.className = "iro-fold-light";
    face.append(scene.copy(), light);
    hinge.appendChild(face);
    parent.appendChild(hinge);
    parent = hinge;
    bands.push({ hinge, light, way: i % 2 === 0 ? 1 : -1 });
  }

  const most = full ? 84 : 78;
  const done = await frames(node, (full ? 1100 : 650) / speed, (progress) => {
    const t = forward ? progress : 1 - progress;
    node.style.opacity = "0";
    const angle = most * easeInOut(clamp(t / (full ? 0.72 : 0.8)));
    const away = full ? easeIn(clamp((t - 0.68) / 0.32)) : clamp((t - 0.7) / 0.3);
    const tilt = Math.sin((angle * Math.PI) / 180);
    bands.forEach((piece, i) => {
      // The first band turns from the window's top; each after turns twice as far back the other way.
      const turn = i === 0 ? angle : -2 * angle * bands[i - 1].way;
      piece.hinge.style.transform = `rotateX(${turn.toFixed(2)}deg)`;
      // Facing down it falls into shade; facing up it catches the light from above.
      piece.light.style.background = piece.way > 0 ? "black" : "white";
      piece.light.style.opacity = (piece.way > 0 ? 0.3 * tilt : 0.1 * tilt).toFixed(3);
    });
    // The folds gather toward the window's middle, then the stack lifts away.
    const gathered = (height * (1 - Math.cos((angle * Math.PI) / 180))) / 2;
    scene.element.style.transform = `translateY(${(gathered - 28 * away).toFixed(1)}px) scale(${(1 - 0.12 * away).toFixed(4)})`;
    scene.element.style.opacity = (1 - away).toFixed(3);
  });
  scene.remove();
  return done;
}

// ── Public API ────────────────────────────
/** Folds `node` up like a letter that lifts away; it stays hidden (`opacity: 0`) until an open effect. */
export function closeFold(node: HTMLElement, options: EffectOptions = {}): Promise<void> {
  return transition(node, "close", options, (full, speed) => play(node, full, speed, true));
}

/** Unfolds a hidden `node` from a folded letter. Shown elements are left as they are. */
export function openFold(node: HTMLElement, options: EffectOptions = {}): Promise<void> {
  return transition(node, "open", options, (full, speed) => play(node, full, speed, false));
}
