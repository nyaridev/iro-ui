// The dot grid layer: crisp dots that fade toward the edges and shimmer as slow waves pass. Around the pointer the
// grid swells like a lens (its dots spread and grow) and lights up in the colors, each dot with a small halo.

// ── Dependencies ──────────────────────────
import { GLOWS, type Layer } from "./layer";

// ── Public API ────────────────────────────
/** Settings: `gap` (px between dots), `size` (how big the dots are), `reach` (px the lens reaches), `lens` (how
 *  much it swells). */
export const GRID: Layer = {
  colors: GLOWS,
  settings: { gap: [22, 8, 80], size: [1, 0.3, 3], reach: [150, 40, 600], lens: [1, 0, 2] },
  glsl: `
vec4 grid(vec2 px, vec2 size) {
  float reach = grid_reach;
  vec2 d = px - pointer.xy;
  float lens = exp(-dot(d, d) / (reach * reach)) * pointer.z;
  // Sampling nearer the pointer magnifies the dots there.
  vec2 s = px - d * 0.3 * lens * grid_lens;
  vec2 cell = floor(s / grid_gap + 0.5);
  float dist = length(s - cell * grid_gap);

  float radius = mix(0.9, 1.9, lens) * grid_size;
  float soft = 0.75 / scale;
  float dotShape = 1.0 - smoothstep(radius - soft, radius + soft, dist);
  float halo = exp(-dist * dist / (14.0 * grid_size * grid_size)) * lens * 0.45;

  vec2 uv = px / size;
  float edges = smoothstep(0.0, 0.14, uv.x) * smoothstep(0.0, 0.14, 1.0 - uv.x)
    * smoothstep(0.0, 0.14, uv.y) * smoothstep(0.0, 0.14, 1.0 - uv.y);
  float shimmer = 0.45 + 0.55 * smoothstep(0.25, 0.85, noise(cell * 0.11 + vec2(grid_time * 0.07, -grid_time * 0.05)));

  vec3 hot = mix(grid_c1, grid_c2, smoothstep(-reach, reach, d.x));
  hot = mix(hot, grid_c3, smoothstep(0.0, reach, -d.y) * 0.45);
  vec3 tint = mix(muted, hot, smoothstep(0.0, 0.6, lens));
  float a = min(dotShape * mix(0.42 * shimmer * edges, 1.0, lens) + halo, 1.0);
  return vec4(tint * a, a);
}`,
};
