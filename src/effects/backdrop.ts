// Everything behind a window's content, from UmeSync and PrepKit: soft glows, the optional liquid shader, film grain
// and a vignette, in that order. Without WebGL the liquid is left out and the glows remain.

// ── Dependencies ──────────────────────────
import { startLiquid } from "./liquid";

// ── Types ─────────────────────────────────
export interface BackdropOptions {
  /** Adds the flowing WebGL background over the glows. */
  liquid?: boolean;
}

// ── Private helpers ───────────────────────
function layer(parent: HTMLElement, part: string, tag = "div"): HTMLElement {
  const element = document.createElement(tag);
  element.className = `iro-backdrop-${part}`;
  parent.appendChild(element);
  return element;
}

// ── Public API ────────────────────────────
/** Fills `host`, an empty element behind the content, with the backdrop's layers. Returns the cleanup. */
export function mountBackdrop(host: HTMLElement, { liquid = false }: BackdropOptions = {}): () => void {
  host.classList.add("iro-backdrop");
  host.setAttribute("aria-hidden", "true");
  layer(host, "glows");
  const canvas = liquid ? (layer(host, "liquid", "canvas") as HTMLCanvasElement) : null;
  const stopLiquid = canvas && startLiquid(canvas);
  if (canvas && !stopLiquid) canvas.remove();
  layer(host, "grain");
  layer(host, "vignette");

  return () => {
    stopLiquid?.();
    host.replaceChildren();
    host.classList.remove("iro-backdrop");
  };
}
