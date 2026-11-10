// Where the pointer is over a backdrop, for its spotlight and dot grid: CSS pixels from the host's top left, and
// whether it's over the host. Mouse and pen only, in full and smooth motion: the light moves with the hand, so reduced
// and off motion leave it out. `shader.ts` eases the light toward it.

// ── Dependencies ──────────────────────────
import { motionOf } from "../motion";

// ── Types ─────────────────────────────────
export interface PointerTrack {
  x: number;
  y: number;
  inside: boolean;
  /** Stops tracking. */
  stop: () => void;
}

// ── Public API ────────────────────────────
/** Tracks the pointer over `host` until `stop` runs. */
export function followPointer(host: HTMLElement): PointerTrack {
  const move = (event: PointerEvent) => {
    if (event.pointerType === "touch") return;
    const box = host.getBoundingClientRect();
    track.x = event.clientX - box.left;
    track.y = event.clientY - box.top;
    const mode = motionOf(host);
    track.inside =
      (mode === "full" || mode === "smooth") &&
      track.x >= 0 &&
      track.y >= 0 &&
      track.x <= box.width &&
      track.y <= box.height;
  };
  // relatedTarget is null when the pointer leaves the page.
  const leave = (event: PointerEvent) => {
    if (!event.relatedTarget) track.inside = false;
  };
  const track: PointerTrack = {
    x: 0,
    y: 0,
    inside: false,
    stop: () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerout", leave);
    },
  };

  window.addEventListener("pointermove", move, { passive: true });
  document.addEventListener("pointerout", leave);
  return track;
}
