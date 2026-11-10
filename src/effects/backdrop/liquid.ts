// The flowing "liquid" background, from UmeSync: one WebGL2 fragment shader of domain-warped noise blending four
// colors from the root's tokens, at half resolution. `shader.ts` runs it and follows the motion mode; its speed,
// strength and colors change while it runs.

// ── Dependencies ──────────────────────────
import { held, type LiquidOptions } from "../options";
import { NOISE, startShader } from "./shader";

// ── Constants ─────────────────────────────
const FRAGMENT = `#version 300 es
precision highp float;
uniform vec2 resolution;
uniform float time;
uniform float liquid_intensity;
uniform vec3 colorA;
uniform vec3 colorB;
uniform vec3 colorC;
uniform vec3 colorD;
out vec4 fragColor;
${NOISE}

void main() {
  vec2 uv = gl_FragCoord.xy / resolution.y * 1.3;
  float t = time * 0.06;
  vec2 q = vec2(fbm(uv + vec2(0.0, t)), fbm(uv + vec2(5.2, 1.3) - t));
  vec2 r = vec2(fbm(uv + 2.2 * q + vec2(1.7, 9.2) + 0.7 * t), fbm(uv + 2.2 * q + vec2(8.3, 2.8) - 0.6 * t));
  float f = fbm(uv + 2.4 * r);
  vec3 color = mix(colorA, colorB, smoothstep(0.25, 0.85, f));
  color = mix(color, colorC, smoothstep(0.45, 1.1, length(q)) * 0.85);
  color = mix(color, colorD, smoothstep(0.55, 0.95, r.x) * 0.6);
  fragColor = vec4(clamp(mix(colorA, color, liquid_intensity), 0.0, 1.0), 1.0);
}`;

/** The background, then each color mixed into it (UmeSync's 24%, 13% and 9%). */
const MIXES = [76, 87, 91];

// ── Types ─────────────────────────────────
export interface LiquidHandle {
  stop: () => void;
  /** Applies new settings and colors. */
  update: (options: LiquidOptions) => void;
}

// ── Public API ────────────────────────────
/** Starts the liquid on `canvas` (already in the document). Returns its handle, or null without WebGL2. */
export function startLiquid(canvas: HTMLCanvasElement, options: LiquidOptions = {}): LiquidHandle | null {
  // Half resolution: the result is soft anyway.
  const shader = { fragment: FRAGMENT, colors: {}, values: {}, density: 0.5, speed: 1 };
  const apply = (next: LiquidOptions) => {
    shader.speed = held(next.speed, 1, 0, 4);
    shader.values = { liquid_intensity: held(next.intensity, 1, 0, 2) };
    shader.colors = {
      colorA: "var(--iro-bg)",
      ...Object.fromEntries(
        MIXES.map((bg, i) => [
          `color${"BCD"[i]}`,
          `color-mix(in oklab, var(--iro-bg) ${bg}%, ${next.colors?.[i] ?? `var(--iro-glow-${i + 1})`})`,
        ]),
      ),
    };
  };
  apply(options);
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
