// What a backdrop layer is (ADR-0016): its GLSL function, the settings it takes and its colors.

/** A setting: its default, then the lowest and highest it may be. */
export type Setting = readonly [fallback: number, min: number, max: number];

export interface Layer {
  /** `vec4 <name>(vec2 px, vec2 size)`: a premultiplied color at `px` (CSS pixels from the top left). It reads its
   *  own clock `<name>_time`, colors `<name>_c1` to `<name>_c3` and settings `<name>_<setting>`; `layers.ts`
   *  declares them. */
  glsl: string;
  /** Every setting it takes; `speed` and `intensity` are added to each. */
  settings: Record<string, Setting>;
  /** Its three colors when the app gives none, as CSS. */
  colors: readonly [string, string, string];
}

/** The style's glows: what most layers are drawn in. */
export const GLOWS = ["var(--iro-glow-1)", "var(--iro-glow-2)", "var(--iro-glow-3)"] as const;
