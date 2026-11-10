// Tap: "got your press". A soft circle of the element's own text color spreads from where it was pressed (or its
// center) across it and fades, kept inside its rounded edge, fainter on a big element such as a window. Smooth motion
// plays it quicker; reduced motion only washes the element in and out; off does nothing. While it plays, the element
// is positioned and isolated to hold the circle.

// ── Dependencies ──────────────────────────
import { motionOf } from "../motion";
import { held, spotOf, type TapOptions } from "../options";
import { addPart, within } from "./animate";

// ── Public API ────────────────────────────
/** Spreads a press circle across `node` from `options.from` (a pointer event's point, say); resolves when faded. */
export async function tap(node: HTMLElement, options: TapOptions = {}): Promise<void> {
  const mode = motionOf(node);
  if (mode === "off") return;
  const speed = held(options.speed, 1, 0.25, 4);
  const box = node.getBoundingClientRect();
  const spot = spotOf(options.from, box);
  const x = spot.x - box.left;
  const y = spot.y - box.top;
  const radius = Math.hypot(Math.max(x, box.width - x), Math.max(y, box.height - y));

  const [holder, remove] = addPart(node, "iro-tap");
  const ink = document.createElement("span");
  ink.className = "iro-tap-ink";
  Object.assign(ink.style, {
    left: `${x - radius}px`,
    top: `${y - radius}px`,
    width: `${2 * radius}px`,
    height: `${2 * radius}px`,
  });
  holder.appendChild(ink);

  // A button's circle is strong; across a whole window the same ink would gray it out, so it thins with size.
  const strength = 0.4 + 0.6 * within(node, 1, 60);
  const keyframes =
    mode === "reduced"
      ? [{ opacity: 0 }, { opacity: 0.16 * strength }, { opacity: 0 }]
      : [
          { transform: "scale(0)", opacity: 0.28 * strength, easing: "cubic-bezier(0.2, 0, 0, 1)" },
          { transform: "scale(1)", opacity: 0.18 * strength, offset: 0.6, easing: "ease-out" },
          { transform: "scale(1)", opacity: 0 },
        ];
  const animation = ink.animate(keyframes, { duration: (mode === "full" ? 620 : 420) / speed });
  await animation.finished.catch(() => undefined);
  remove();
}
