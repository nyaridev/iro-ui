// The dust layer: specks floating in the light from a window at the top left. Soft shafts of light fall across the
// backdrop; specks drift up and sway at three depths, the far ones small and sharp, the near ones wide, soft bokeh
// discs with a brighter rim, and they glint brighter where a shaft catches them.

// ── Dependencies ──────────────────────────
import { GLOWS, type Layer } from "./layer";

// ── Public API ────────────────────────────
/** Settings: `count` (how many specks), `size` (how big they are), `shafts` (how bright the window light is). */
export const DUST: Layer = {
  colors: GLOWS,
  settings: { count: [1, 0, 3], size: [1, 0.3, 3], shafts: [1, 0, 3] },
  glsl: `
/** How much window light falls at px: soft diagonal shafts, fading away from the top left. */
float dustShafts(vec2 px, vec2 size) {
  vec2 along = normalize(vec2(1.0, 0.6));
  float across = dot(px, vec2(-along.y, along.x));
  float shaft = smoothstep(0.3, 0.8, noise(vec2(across / 70.0, dust_time * 0.025)));
  shaft *= 0.6 + 0.4 * noise(vec2(across / 23.0 + 9.0, dust_time * 0.04));
  return shaft * exp(-dot(px, along) / max(size.x, size.y) * 1.1) * dust_shafts;
}

vec4 dust(vec2 px, vec2 size) {
  float now = dust_time;
  float shafts = dustShafts(px, size);
  vec3 sun = mix(dust_c3, vec3(1.0), 0.55);
  float beam = min(shafts * mix(0.1, 0.15, dark), 1.0);
  vec4 color = vec4(sun * beam, beam);

  // Far to near, so the near specks lie on top.
  for (int i = 0; i < 3; i++) {
    float layer = float(i);
    float near = layer / 2.0;
    float radius = mix(1.1, 13.0, near * near) * dust_size;
    float cell = mix(30.0, 96.0, near) * max(1.0, dust_size);
    vec2 q = px + vec2(sin(now * 0.07 + layer) * 14.0, now * mix(3.0, 9.0, near));
    q += (vec2(noise(q / 180.0 + now * 0.05), noise(q / 180.0 + 7.3 - now * 0.05)) - 0.5) * 24.0;
    vec2 id = floor(q / cell);
    float seed = hash(id + layer * 31.0);
    vec2 spot = (0.5 + (vec2(hash(id + 1.3), hash(id + 7.7)) - 0.5) * max(1.0 - 2.4 * radius / cell, 0.0)) * cell;
    float d = length(q - id * cell - spot);
    float r = radius * (0.7 + 0.6 * hash(id + 3.9));
    float soft = mix(0.7, r * 0.3, near);
    float disc = 1.0 - smoothstep(r - soft, r + soft, d);
    float rim = near * exp(-pow((d - r * 0.85) / max(r * 0.12, 0.5), 2.0)) * 0.3;
    float twinkle = 0.55 + 0.45 * sin(now * (0.7 + seed * 1.8) + seed * 40.0);
    // A share of the cells hold a speck: fewer near, and the count setting scales the share.
    float shown = step(1.0 - (1.0 - mix(0.55, 0.72, near)) * dust_count, seed);
    float a = (disc * (1.0 - near * 0.4) + rim * disc) * shown * twinkle * (0.3 + 1.4 * shafts) * mix(0.28, 0.75, dark);
    a = min(a, 1.0);
    // Pale motes on dark backgrounds; on light ones, soft grey-tinted specks rather than colored confetti.
    vec3 tint = mix(dust_c3, dust_c1, hash(id + 2.2));
    tint = mix(mix(tint, muted, 0.45), mix(tint, vec3(1.0), 0.5), dark);
    color = over(vec4(tint * a, a), color);
  }
  return color;
}`,
};
