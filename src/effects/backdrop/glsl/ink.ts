// The ink wash layer: sumi-e ink bleeding through wet paper. Domain-warped noise forms pools that slowly spread and
// recede; pigment settles darker at a pool's rim and granulates in it, and a fainter wash of the second color runs
// beside it. The ink is the text color touched with the first color: dark ink on light backgrounds, pale mist on dark.

// ── Dependencies ──────────────────────────
import { GLOWS, type Layer } from "./layer";

// ── Public API ────────────────────────────
/** Settings: `scale` (how large the pools are), `coverage` (how much of the backdrop the ink covers, 0 to 1). */
export const INK: Layer = {
  colors: GLOWS,
  settings: { scale: [1, 0.3, 3], coverage: [0.5, 0, 1] },
  glsl: `
vec4 ink(vec2 px, vec2 size) {
  vec2 p = px / max(size.x, size.y) * 2.4 / ink_scale;
  float t = ink_time * 0.022;
  vec2 q = vec2(fbm(p + vec2(0.0, t)), fbm(p + vec2(5.2, 1.3) - t));
  vec2 r = vec2(fbm(p + 2.0 * q + vec2(1.7, 9.2) + 0.5 * t), fbm(p + 2.0 * q + vec2(8.3, 2.8) - 0.4 * t));
  float f = fbm(p + 2.2 * r);

  // The waterline breathes, so pools spread and draw back.
  float waterline = mix(0.7, 0.36, ink_coverage) + 0.035 * sin(ink_time * 0.06);
  float pool = smoothstep(waterline, waterline + 0.12, f);
  float rim = smoothstep(waterline - 0.015, waterline + 0.01, f) * (1.0 - smoothstep(waterline + 0.01, waterline + 0.07, f));
  // Deeper in a pool the pigment thins out again, as a wash does.
  float body = pool * (0.75 - 0.35 * smoothstep(waterline + 0.12, waterline + 0.3, f));
  float granules = 0.78 + 0.44 * noise(px / 2.4) * noise(px / 9.0 + 3.0);
  float density = (body + rim * 0.7) * granules;

  vec3 pigment = mix(fg, ink_c1, 0.28);
  float a = min(density * mix(0.34, 0.24, dark), 1.0);
  float side = smoothstep(0.52, 0.72, r.y) * (1.0 - pool) * mix(0.14, 0.12, dark) * granules;
  return over(vec4(pigment * a, a), vec4(ink_c2 * side, side));
}`,
};
