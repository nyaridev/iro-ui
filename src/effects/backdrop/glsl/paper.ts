// The paper layer: a sheet's surface. Fine tooth, long fibers that curve across it, and the cloudy unevenness of
// pressed pulp, turned into light and shade by their relief; light backgrounds get a warm tint, the first color. It
// overlays what's under it, so paper over the mesh is tinted paper. Still by default, lit from the top left; animated,
// the light sways slowly back and forth, as a window's does through the day, and the shadows in the fibers turn with it.

// ── Dependencies ──────────────────────────
import type { Layer } from "./layer";

// ── Public API ────────────────────────────
/** Settings: `animated` (0 or 1), `fibers` (how many show), `warmth` (how warm the sheet is on light backgrounds). */
export const PAPER: Layer = {
  colors: ["rgb(255 240 209)", "var(--iro-glow-2)", "var(--iro-glow-3)"],
  settings: { animated: [0, 0, 1], fibers: [1, 0, 3], warmth: [1, 0, 3] },
  glsl: `
float paperHeight(vec2 px) {
  float tooth = 0.6 * noise(px / 1.7) + 0.4 * noise(px / 4.1 + 11.0);
  float fibers = 0.0;
  for (int i = 0; i < 3; i++) {
    // Each set of fibers turns slowly across the sheet, so no direction lines up into a hatch.
    float angle = float(i) * 2.1 + 0.4 + 2.5 * (noise(px / 260.0 + float(i) * 13.0) - 0.5);
    vec2 q = mat2(cos(angle), sin(angle), -sin(angle), cos(angle)) * px;
    float strand = noise(vec2(q.x / 46.0, q.y / 1.3) + float(i) * 17.0);
    // Strands show in patches, as fibers do; more fibers widen the patches.
    float patches = smoothstep(0.85 - 0.3 * min(paper_fibers, 2.0), 0.95, noise(q / 34.0 + float(i) * 5.0));
    fibers += (1.0 - smoothstep(0.0, 0.05, abs(strand - 0.5))) * patches;
  }
  float pulp = fbm(px / 110.0);
  return tooth * 0.4 + fibers * 0.3 * paper_fibers + pulp * 1.6;
}

vec4 paper(vec2 px, vec2 size) {
  float h = paperHeight(px);
  vec2 slope = vec2(paperHeight(px + vec2(0.7, 0.0)), paperHeight(px + vec2(0.0, 0.7))) - h;
  // The light comes from the top left; animated, it sways around that.
  float angle = 0.785 + paper_animated * 0.7 * sin(paper_time * 0.12);
  vec2 toward = vec2(cos(angle), sin(angle)) * 1.414;
  float lit = clamp(-dot(slope, toward) * 1.6, -1.0, 1.0);
  float mottle = (fbm(px / 70.0 + 4.0 + paper_animated * vec2(paper_time * 0.01, 0.0)) - 0.5) * 0.35;
  float shade = lit + mottle;
  float strength = mix(0.1, 0.08, dark);
  vec4 color = shade > 0.0 ? vec4(vec3(1.0), 1.0) * shade * strength : vec4(0.0, 0.0, 0.0, 1.0) * -shade * strength * 1.3;
  // A warm sheet on light backgrounds.
  float warm = min((1.0 - dark) * 0.07 * paper_warmth, 1.0);
  return over(color, vec4(paper_c1 * warm, warm));
}`,
};
