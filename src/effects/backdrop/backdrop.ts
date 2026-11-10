// Everything behind a window's content, from UmeSync and PrepKit: soft glows, the optional liquid shader, the other
// layers asked for (all on one shader canvas, `layers.ts`), then film grain and a vignette, in that order. Without
// WebGL the shaders are left out and the glows remain. `updateBackdrop` changes the settings while it runs.

import type { BackdropOptions } from "../options";
// ── Dependencies ──────────────────────────
import { LAYER_NAMES, type LayersHandle, startLayers } from "./layers";
import { type LiquidHandle, startLiquid } from "./liquid";
import { followPointer } from "./pointer";

// ── Types ─────────────────────────────────
interface Running {
  /** Which layers are on: changing it needs a new shader. */
  shape: string;
  liquid: LiquidHandle | null;
  layers: LayersHandle | null;
  stop: () => void;
}

// ── State ─────────────────────────────────
const running = new WeakMap<HTMLElement, Running>();

// ── Private helpers ───────────────────────
function layer(parent: HTMLElement, part: string, tag = "div"): HTMLElement {
  const element = document.createElement(tag);
  element.className = `iro-backdrop-${part}`;
  parent.appendChild(element);
  return element;
}

/** A shader canvas that's dropped again when WebGL2 isn't there. */
function shaderLayer<T>(parent: HTMLElement, part: string, start: (canvas: HTMLCanvasElement) => T | null): T | null {
  const canvas = layer(parent, part, "canvas") as HTMLCanvasElement;
  const handle = start(canvas);
  if (!handle) canvas.remove();
  return handle;
}

const shapeOf = (options: BackdropOptions) =>
  [options.liquid ? "liquid" : "", ...LAYER_NAMES.filter((name) => options[name])].join(" ");

/** Stops whatever runs on `host` and empties it. */
function unmount(host: HTMLElement) {
  running.get(host)?.stop();
  running.delete(host);
}

// ── Public API ────────────────────────────
/** Fills `host`, an empty element behind the content, with the backdrop's layers. Returns the cleanup. */
export function mountBackdrop(host: HTMLElement, options: BackdropOptions = {}): () => void {
  unmount(host);
  host.classList.add("iro-backdrop");
  host.setAttribute("aria-hidden", "true");
  layer(host, "glows");
  const liquidOptions = typeof options.liquid === "object" ? options.liquid : {};
  const liquid = options.liquid ? shaderLayer(host, "liquid", (canvas) => startLiquid(canvas, liquidOptions)) : null;
  const pointer = options.spotlight || options.grid ? followPointer(host) : undefined;
  const shape = shapeOf(options);
  const layers = LAYER_NAMES.some((name) => options[name])
    ? shaderLayer(host, "layers", (canvas) => startLayers(canvas, options, pointer))
    : null;
  layer(host, "grain");
  layer(host, "vignette");

  running.set(host, {
    shape,
    liquid,
    layers,
    stop: () => {
      liquid?.stop();
      layers?.stop();
      pointer?.stop();
      host.replaceChildren();
      host.classList.remove("iro-backdrop");
    },
  });
  return () => unmount(host);
}

/** Changes a running backdrop to `options`: new settings and colors apply at once, without restarting; turning a
 *  layer on or off rebuilds it. On a `host` with nothing running yet, it mounts one. Returns the cleanup. */
export function updateBackdrop(host: HTMLElement, options: BackdropOptions): () => void {
  const now = running.get(host);
  if (!now || now.shape !== shapeOf(options)) return mountBackdrop(host, options);
  now.liquid?.update(typeof options.liquid === "object" ? options.liquid : {});
  now.layers?.update(options);
  return () => unmount(host);
}
