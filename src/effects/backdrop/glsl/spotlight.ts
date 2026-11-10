// The spotlight layer: a soft light at the pointer, a bright core in a wide halo, that stretches a little along the
// way it moves. Inside it the colors flow slowly and a few specks of dust glint as they drift through the beam; on
// dark backgrounds the center burns paler.

// ── Dependencies ──────────────────────────
import { GLOWS, type Layer } from "./layer";

// ── Public API ────────────────────────────
/** Settings: `size` (how wide the light is), `specks` (how much dust glints in it). */
export const SPOTLIGHT: Layer = {
  colors: GLOWS,
  settings: { size: [1, 0.3, 3], specks: [1, 0, 3] },
  glsl: `
vec4 spotlight(vec2 px, vec2 size) {
  float on = pointer.z;
  if (on < 0.002) return vec4(0.0);
  float now = spotlight_time;
  vec2 d = (px - pointer.xy) / spotlight_size;
  float speed = length(drift);
  if (speed > 1.0) {
    vec2 way = drift / speed;
    float along = dot(d, way);
    d = d - way * along + way * along / (1.0 + min(speed / 1400.0, 0.7));
  }
  float r2 = dot(d, d);
  float core = exp(-r2 / 3600.0);
  float halo = exp(-r2 / 30000.0);

  vec2 q = px / 220.0;
  float flow = fbm(q + vec2(now * 0.05, -now * 0.035));
  float flow2 = fbm(q * 1.6 - vec2(now * 0.04, 0.0) + 3.0);
  vec3 tint = mix(spotlight_c1, spotlight_c2, smoothstep(0.32, 0.68, flow));
  tint = mix(tint, spotlight_c3, smoothstep(0.55, 0.85, flow2) * 0.55);
  tint = mix(tint, vec3(1.0), core * 0.3 * dark);

  // Dust: one speck in some 16 px cells, drifting up and twinkling, seen only where the light falls.
  vec2 drifting = px + vec2(sin(now * 0.3) * 6.0, now * 9.0);
  vec2 cell = floor(drifting / 16.0);
  float seed = hash(cell);
  vec2 spot = (cell + 0.25 + 0.5 * vec2(hash(cell + 7.1), hash(cell + 3.3))) * 16.0;
  float speck = step(0.86, seed) * exp(-dot(drifting - spot, drifting - spot) / 1.2)
    * (0.5 + 0.5 * sin(now * 2.5 + seed * 60.0)) * halo * spotlight_specks;

  float a = (halo * mix(0.26, 0.38, dark) * (0.7 + 0.6 * flow) + core * 0.22) * on;
  vec3 color = tint * a + mix(spotlight_c3, vec3(1.0), 0.6) * speck * mix(0.5, 0.9, dark) * on;
  a = min(a + speck * 0.5 * on, 1.0);
  return vec4(min(color, vec3(a)), a);
}`,
};
