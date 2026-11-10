// The backdrop's shader layers (ADR-0016): the ones asked for, drawn by one fragment shader on one canvas, each
// composited over the last in a fixed order: the surfaces (mesh, ink wash, paper), what's drawn on them (contour
// lines), then what floats above (aurora, dust, dot grid, spotlight). Each layer's settings, colors and clock are
// uniforms of its own, so they change while it runs. Each layer's look is in `glsl/`.

import type { BackdropOptions, LayerOptions } from "../options";
// ── Dependencies ──────────────────────────
import { AURORA } from "./glsl/aurora";
import { CONTOURS } from "./glsl/contours";
import { DUST } from "./glsl/dust";
import { GRID } from "./glsl/grid";
import { INK } from "./glsl/ink";
import type { Layer, Setting } from "./glsl/layer";
import { MESH } from "./glsl/mesh";
import { PAPER } from "./glsl/paper";
import { SPOTLIGHT } from "./glsl/spotlight";
import type { PointerTrack } from "./pointer";
import { NOISE, startShader } from "./shader";

// ── Constants ─────────────────────────────
/** Each layer, in drawing order. */
const LAYERS = {
  mesh: MESH,
  ink: INK,
  paper: PAPER,
  contours: CONTOURS,
  aurora: AURORA,
  dust: DUST,
  grid: GRID,
  spotlight: SPOTLIGHT,
} satisfies Record<string, Layer>;

/** Settings every layer takes. */
const COMMON: Record<string, Setting> = { speed: [1, 0, 4], intensity: [1, 0, 2] };

/** Layers with fine detail, drawn at every pixel; the soft ones look the same at half resolution. */
const SHARP = ["grid", "contours", "paper"];

const SHARED_COLORS = { bg: "var(--iro-bg)", fg: "var(--iro-fg)", muted: "var(--iro-fg-4)" };

// ── Types ─────────────────────────────────
export type LayerName = keyof typeof LAYERS;

export interface LayersHandle {
  stop: () => void;
  /** Applies new settings and colors to the same layers, without recompiling. */
  update: (options: BackdropOptions) => void;
}

// ── Private helpers ───────────────────────
/** Every setting of `name`, with its default and range. */
const settingsOf = (name: LayerName): Record<string, Setting> => ({ ...COMMON, ...LAYERS[name].settings });

/** A setting's value: the app's number (or boolean) held to its range, or its default. */
function settle(given: unknown, [fallback, min, max]: Setting): number {
  const value = typeof given === "boolean" ? Number(given) : given;
  return typeof value === "number" && Number.isFinite(value) ? Math.min(max, Math.max(min, value)) : fallback;
}

// ── Public API ────────────────────────────
/** Every layer's name, in drawing order. */
export const LAYER_NAMES = Object.keys(LAYERS) as LayerName[];

/** Each layer's settings with their defaults and ranges, for building controls (the Lab's tuner). */
export const LAYER_SETTINGS = Object.fromEntries(LAYER_NAMES.map((name) => [name, settingsOf(name)])) as Record<
  LayerName,
  Record<string, Setting>
>;

/** Starts the layers `options` turns on, on `canvas` (already in the document). Returns its handle, or null without
 *  WebGL2. */
export function startLayers(
  canvas: HTMLCanvasElement,
  options: BackdropOptions,
  pointer?: PointerTrack,
): LayersHandle | null {
  const chosen = LAYER_NAMES.filter((name) => options[name]);
  const values: Record<string, number> = {};
  const colors: Record<string, string> = { ...SHARED_COLORS };
  for (const name of chosen) values[`${name}_time`] = 40 + Math.random() * 40;

  const shader = {
    fragment: "",
    colors,
    values,
    density: chosen.some((name) => SHARP.includes(name)) ? 1 : 0.5,
    transparent: true,
    still: false,
    pointer,
    tick: (seconds: number) => {
      for (const name of chosen) values[`${name}_time`] += seconds * values[`${name}_speed`];
    },
  };
  const apply = (next: BackdropOptions) => {
    for (const name of chosen) {
      const given: LayerOptions & Record<string, unknown> = typeof next[name] === "object" ? { ...next[name] } : {};
      for (const [key, setting] of Object.entries(settingsOf(name)))
        values[`${name}_${key}`] = settle(given[key], setting);
      LAYERS[name].colors.forEach((fallback, i) => {
        colors[`${name}_c${i + 1}`] = given.colors?.[i] ?? fallback;
      });
    }
    // Nothing to draw between frames when every layer is held still (paper is still unless animated).
    shader.still = chosen.every(
      (name) => values[`${name}_speed`] === 0 || (name === "paper" && values.paper_animated === 0),
    );
  };
  apply(options);

  const declare = (name: LayerName) =>
    [
      `uniform float ${name}_time;`,
      ...Object.keys(settingsOf(name)).map((key) => `uniform float ${name}_${key};`),
      ...[1, 2, 3].map((i) => `uniform vec3 ${name}_c${i};`),
    ].join("\n");
  shader.fragment = `#version 300 es
precision highp float;
uniform vec2 resolution;
uniform float scale;
uniform float time;
uniform float dark;
uniform vec4 pointer;
uniform vec2 drift;
${Object.keys(SHARED_COLORS)
  .map((name) => `uniform vec3 ${name};`)
  .join("\n")}
${chosen.map(declare).join("\n")}
out vec4 fragColor;
${NOISE}

vec4 over(vec4 top, vec4 under) { return top + under * (1.0 - top.a); }

// A layer's color at a multiple of its strength, still a valid premultiplied color.
vec4 tone(vec4 color, float amount) {
  color *= amount;
  float a = min(color.a, 1.0);
  return vec4(min(color.rgb, vec3(a)), a);
}
${chosen.map((name) => LAYERS[name].glsl).join("\n")}

void main() {
  vec2 size = resolution / scale;
  vec2 px = vec2(gl_FragCoord.x, resolution.y - gl_FragCoord.y) / scale;
  vec4 color = vec4(0.0);
  ${chosen.map((name) => `color = over(tone(${name}(px, size), ${name}_intensity), color);`).join("\n  ")}
  // A touch of noise keeps the long gradients from banding.
  color.rgb += (hash(gl_FragCoord.xy) - 0.5) / 255.0 * color.a;
  fragColor = color;
}`;

  const handle = startShader(canvas, shader);
  return (
    handle && {
      stop: handle.stop,
      update: (next) => {
        apply(next);
        handle.refresh();
      },
    }
  );
}
