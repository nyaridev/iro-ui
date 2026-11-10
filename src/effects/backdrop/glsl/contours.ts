// The contour lines layer: a living elevation map. A slowly shifting noise terrain is drawn as hairline contours,
// every fifth one bolder, in the first color (the accent), turning toward the second in the valleys and the third on
// the peaks; on dark backgrounds the bold lines glow faintly. Lines thin out where they'd crowd together.

// ── Dependencies ──────────────────────────
import type { Layer } from "./layer";

// ── Public API ────────────────────────────
/** Settings: `density` (how many lines), `scale` (how large the hills are), `width` (how thick the lines are). */
export const CONTOURS: Layer = {
  colors: ["var(--iro-accent)", "var(--iro-glow-2)", "var(--iro-glow-3)"],
  settings: { density: [1, 0.3, 3], scale: [1, 0.3, 4], width: [1, 0.3, 4] },
  glsl: `
vec4 contours(vec2 px, vec2 size) {
  vec2 p = px / (280.0 * contours_scale);
  float t = contours_time * 0.012;
  vec2 warp = vec2(fbm(p * 0.6 + vec2(t, 0.0)), fbm(p * 0.6 + vec2(3.1, -t))) - 0.5;
  float h = fbm(p + warp * 0.9 + vec2(-t * 0.5, t * 0.3));
  float levels = h * 42.0 * contours_density;
  // Distance to the nearest contour, in canvas pixels.
  float spacing = max(fwidth(levels), 1e-4);
  float dist = min(fract(levels), 1.0 - fract(levels)) / spacing;
  float major = 1.0 - step(0.5, mod(floor(levels + 0.5), 5.0));
  float width = mix(0.5, 0.9, major) * contours_width * scale;
  float line = 1.0 - smoothstep(width - 0.6, width + 0.6, dist);
  // Where lines crowd under about three pixels apart, each would shimmer; they blend into the tone they'd average to
  // instead, so none drops out.
  float crowd = smoothstep(0.3, 0.6, spacing);
  line = mix(line, min(2.0 * width * spacing, 1.0), crowd);
  float glow = exp(-dist * dist / (20.0 * scale * scale)) * major * dark * 0.1 * (1.0 - crowd);

  vec3 tint = mix(contours_c1, contours_c2, (1.0 - smoothstep(0.25, 0.45, h)) * 0.55);
  tint = mix(tint, contours_c3, smoothstep(0.6, 0.8, h) * 0.5);
  tint = mix(tint, vec3(1.0), dark * 0.15);
  float a = min(line * mix(0.26, 0.5, mix(major, 0.2, crowd)) + glow, 1.0);
  // A faint wash by height between the lines, so the hills read.
  float wash = smoothstep(0.35, 0.75, h) * mix(0.03, 0.05, dark);
  return over(vec4(tint * a, a), vec4(tint * wash, wash));
}`,
};
