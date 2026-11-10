// The mesh gradient layer: four color points (the three colors and a blend of the first two) drift on slow loops over
// the background, and each pixel blends them smoothly by distance, in Oklab so no blend turns muddy, through a gentle
// noise warp, under soft folds of light like silk. Opaque: it replaces the background.

// ── Dependencies ──────────────────────────
import { GLOWS, type Layer } from "./layer";

// ── Public API ────────────────────────────
/** Settings: `scale` (how large the color fields are). */
export const MESH: Layer = {
  colors: GLOWS,
  settings: { scale: [1, 0.4, 3] },
  glsl: `
vec3 toOklab(vec3 c) {
  c = pow(c, vec3(2.2));
  vec3 lms = mat3(0.4122, 0.2119, 0.0883, 0.5363, 0.6807, 0.2817, 0.0514, 0.1074, 0.6300) * c;
  lms = pow(max(lms, 0.0), vec3(1.0 / 3.0));
  return mat3(0.2105, 1.9780, 0.0259, 0.7936, -2.4286, 0.7828, -0.0041, 0.4506, -0.8087) * lms;
}

vec3 fromOklab(vec3 lab) {
  vec3 lms = mat3(1.0, 1.0, 1.0, 0.3963, -0.1056, -0.0895, 0.2158, -0.0639, -1.2915) * lab;
  lms = lms * lms * lms;
  vec3 c = mat3(4.0767, -1.2684, -0.0042, -3.3077, 2.6098, -0.7034, 0.2310, -0.3413, 1.7076) * lms;
  return pow(clamp(c, 0.0, 1.0), vec3(1.0 / 2.2));
}

/** How much of a point shows at squared distance d2: wide and soft, so the colors meet in long gradients. */
float meshWeight(float d2, float reach) { return exp(-d2 / (reach * mesh_scale * mesh_scale)); }

vec4 mesh(vec2 px, vec2 size) {
  float aspect = size.x / size.y;
  vec2 p = px / size;
  p.x *= aspect;
  float t = mesh_time * 0.06;
  vec2 n = p / mesh_scale;
  vec2 warp = vec2(fbm(n * 1.1 + vec2(t, -t * 0.7)), fbm(n * 1.1 + vec2(-t * 0.8, t) + 5.2)) - 0.5;
  p += warp * 0.3 * mesh_scale;

  vec2 a = vec2(aspect * (0.18 + 0.16 * sin(t * 1.10)), 0.20 + 0.14 * cos(t * 0.90));
  vec2 b = vec2(aspect * (0.84 + 0.12 * cos(t * 0.80 + 1.3)), 0.82 + 0.12 * sin(t * 1.20 + 0.4));
  vec2 c = vec2(aspect * (0.82 + 0.14 * sin(t * 0.70 + 2.1)), 0.16 + 0.12 * cos(t * 1.00 + 2.7));
  vec2 d = vec2(aspect * (0.20 + 0.14 * cos(t * 0.95 + 4.0)), 0.86 + 0.10 * sin(t * 0.75 + 1.9));
  float wa = meshWeight(dot(p - a, p - a), 0.22);
  float wb = meshWeight(dot(p - b, p - b), 0.2);
  float wc = meshWeight(dot(p - c, p - c), 0.07);
  float wd = meshWeight(dot(p - d, p - d), 0.16);

  // The background carries a steady share, so the colors float in it instead of filling every corner.
  float strength = mix(0.5, 0.7, dark);
  vec3 lab = toOklab(bg) * 0.35;
  lab += toOklab(mix(bg, mesh_c1, strength)) * wa;
  lab += toOklab(mix(bg, mesh_c2, strength * 0.85)) * wb;
  // The third color is often a warm one that turns olive when dimmed, so it's a small, bright spot instead.
  lab += toOklab(mix(bg, mesh_c3, min(strength * 1.15, 0.85))) * wc;
  lab += toOklab(mix(bg, mix(mesh_c1, mesh_c2, 0.5), strength * 0.7)) * wd;
  lab /= 0.35 + wa + wb + wc + wd;

  // Folds of light and shade, drifting with the warp.
  float fold = smoothstep(0.25, 0.75, fbm(n * 1.2 + warp * 1.5 + vec2(t * 0.5, -t * 0.3)));
  lab.x *= 1.0 + mix(0.05, 0.12, dark) * (fold - 0.5);
  return vec4(fromOklab(lab), 1.0);
}`,
};
