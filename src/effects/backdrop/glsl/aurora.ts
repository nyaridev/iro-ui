// The aurora layer: up to three curtains of light across the top. Each hangs from a bright lower edge that sways and
// folds, with soft rays rising from it; the folds brighten and dim along the curtain, and the back curtains are
// fainter and slower. Their color climbs from the second color at the edge through the first to a touch of the third.

// ── Dependencies ──────────────────────────
import { GLOWS, type Layer } from "./layer";

// ── Public API ────────────────────────────
/** Settings: `height` (how far down the curtains hang), `rays` (how streaked they are), `curtains` (1 to 3). */
export const AURORA: Layer = {
  colors: GLOWS,
  settings: { height: [1, 0.3, 2.5], rays: [1, 0, 1], curtains: [3, 1, 3] },
  glsl: `
vec4 aurora(vec2 px, vec2 size) {
  vec2 uv = px / size;
  // Wider windows show more of the sky instead of stretching it.
  float x = uv.x * (1.0 + size.x / 900.0);
  float now = aurora_time;
  vec3 light = vec3(0.0);
  float amount = 0.0;
  for (int i = 0; i < 3; i++) {
    float layer = float(i);
    if (layer >= aurora_curtains) break;
    float depth = 1.0 - layer * 0.32;
    float t = now * (0.045 - layer * 0.01);
    float xs = x * (1.0 + layer * 0.4) + layer * 3.7;
    float edge = (0.34 + layer * 0.06) * aurora_height
      + (fbm(vec2(xs * 0.9 + t, layer * 7.3)) - 0.5) * 0.34
      + 0.07 * sin(xs * 1.7 + now * 0.1 + layer * 2.0)
      + 0.02 * sin(xs * 5.3 - now * 0.2 + layer);
    float up = edge - uv.y;
    // Rays: two widths of soft vertical streaks that bend and drift.
    float bend = 1.2 * fbm(vec2(xs * 2.5, now * 0.03 + layer));
    float rays = 0.6 * noise(vec2(xs * 22.0 + bend, up * 1.5 + now * 0.08 + layer * 5.0))
      + 0.4 * noise(vec2(xs * 55.0 + bend * 2.0, up * 3.0 - now * 0.05));
    rays = mix(1.0, smoothstep(0.2, 0.85, rays), aurora_rays);
    // The curtain starts just above its edge, softly, so it has no hard line; smooth curtains (no rays) softer still.
    float above = smoothstep(-mix(0.07, 0.03, aurora_rays), 0.012, up);
    float curtain = above * exp(-max(up, 0.0) * (3.6 + layer * 1.6) / aurora_height) * (0.3 + 0.7 * rays);
    // The lower edge: a thin bright seam with a soft glow just under it.
    float seam = exp(-up * up * 1400.0) * (0.6 + 0.4 * rays) + exp(min(up, 0.0) * 40.0) * 0.25 * (1.0 - above);
    // Folds: a wave with a noisy phase, so a few always show wherever the noise is.
    float phase = 4.0 * fbm(vec2(xs * 0.5 - t * 1.4, layer * 3.1 + 9.0));
    float fold = smoothstep(0.1, 0.9, 0.5 + 0.5 * sin(xs * 2.6 + phase + t * 2.0));
    // On light backgrounds the seam would read as an ink line, so it stays soft there.
    float glow = (curtain + seam * fold * mix(0.45, 1.0, dark)) * (0.04 + 0.96 * fold) * depth;
    // The colors climb with the curtain, so taller curtains keep the same bands.
    float rise = up / aurora_height;
    vec3 tint = mix(aurora_c2, aurora_c1, smoothstep(0.02, 0.2, rise));
    tint = mix(tint, aurora_c3, smoothstep(0.16, 0.42, rise) * 0.45);
    // The seam burns paler on dark backgrounds.
    tint = mix(tint, vec3(1.0), dark * 0.45 * exp(-up * up * 2500.0));
    light += tint * glow;
    amount += glow;
  }
  // A faint wash of sky behind the curtains.
  float haze = exp(-uv.y * 3.5 / aurora_height) * 0.14;
  light += mix(aurora_c1, aurora_c2, uv.x) * haze;
  amount += haze;
  // Fades out toward the bottom; hung lower, the fade starts lower, but always before the bottom edge.
  float fade = 1.0 - smoothstep(min(0.55 * aurora_height, 0.9), 1.02, uv.y);
  float a = (1.0 - exp(-amount * mix(0.6, 1.4, dark))) * fade;
  return vec4(light / max(amount, 1e-4) * a, a);
}`,
};
