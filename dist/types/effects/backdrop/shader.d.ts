import type { PointerTrack } from "./pointer";
/** Value noise and four-octave fbm, shared by every shader. */
export declare const NOISE = "\nfloat hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }\n\nfloat noise(vec2 p) {\n  vec2 i = floor(p);\n  vec2 f = fract(p);\n  vec2 u = f * f * (3.0 - 2.0 * f);\n  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),\n             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);\n}\n\nfloat fbm(vec2 p) {\n  float value = 0.0;\n  float amplitude = 0.5;\n  for (int i = 0; i < 4; i++) {\n    value += amplitude * noise(p);\n    p = p * 2.03 + vec2(1.7, 9.2);\n    amplitude *= 0.5;\n  }\n  return value;\n}";
export interface ShaderOptions {
    /** The fragment shader. It may read `resolution`, `scale` (canvas pixels per CSS pixel), `time`, `dark` (1 on a
     *  dark background), `pointer` (x and y in CSS pixels from the top left, and how lit, 0–1), `drift` (the pointer's
     *  eased speed, CSS pixels a second), a vec3 for each of `colors` and a float for each of `values`. */
    fragment: string;
    /** Uniform name → CSS color, resolved in the canvas's parent. Read again by `refresh`. */
    colors: Record<string, string>;
    /** Uniform name → number, sent with every frame, so a change shows at the next one. */
    values?: Record<string, number>;
    /** Canvas pixels per device pixel. */
    density: number;
    /** Draws with transparency (premultiplied alpha); otherwise opaque. */
    transparent?: boolean;
    /** How fast `time` runs (1 by default), on top of the motion mode. Read every frame. */
    speed?: number;
    /** Nothing in it moves on its own: it draws only when its size, colors, values or the pointer change. Read every
     *  frame. */
    still?: boolean;
    /** Runs each frame before drawing, with the seconds that passed scaled by the motion mode, to move clocks of the
     *  caller's own in `values`. */
    tick?: (seconds: number) => void;
    /** Passes the pointer to the shader, eased. */
    pointer?: PointerTrack;
}
export interface ShaderHandle {
    /** Stops drawing and frees the shader. */
    stop: () => void;
    /** Reads `colors` again and draws, for changes made while nothing moves. */
    refresh: () => void;
}
/** Starts `options.fragment` on `canvas` (already in the document). Returns its handle, or null without WebGL2.
 *  Where the browser compiles in the background, the page never waits for it; a shader that fails removes its
 *  canvas. */
export declare function startShader(canvas: HTMLCanvasElement, options: ShaderOptions): ShaderHandle | null;
