// Running a fragment shader over a canvas, for the liquid and the backdrop's layers: one triangle that covers it,
// colors from tokens (repainted when the root's style, theme or accent changes), numbers the caller can change while
// it runs, about 30 frames a second (every frame while the pointer lights it), paused with the page. Speed follows the
// motion mode; reduced and off hold one still frame.

// ── Dependencies ──────────────────────────
import { shade } from "../color";
import { motionOf } from "../motion";
import type { PointerTrack } from "./pointer";

// ── Constants ─────────────────────────────
const VERTEX = `#version 300 es
in vec2 position;
void main() { gl_Position = vec4(position, 0.0, 1.0); }`;

/** Value noise and four-octave fbm, shared by every shader. */
export const NOISE = `
float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}

float fbm(vec2 p) {
  float value = 0.0;
  float amplitude = 0.5;
  for (int i = 0; i < 4; i++) {
    value += amplitude * noise(p);
    p = p * 2.03 + vec2(1.7, 9.2);
    amplitude *= 0.5;
  }
  return value;
}`;

const SPEEDS = { full: 1, smooth: 0.6, reduced: 0, off: 0 };

// ── Types ─────────────────────────────────
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

// ── State ─────────────────────────────────
// Where the last shader's clock stopped, so the flow carries on when a backdrop remounts. Starts at a random point.
let clock = 40 + Math.random() * 40;

// ── Private helpers ───────────────────────
/** A compiling shader; its status is read once the program links, so the browser can compile in the background. */
function compile(gl: WebGL2RenderingContext, type: number, source: string): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  return shader;
}

/** Draws a linked `program` on `canvas` until its handle stops it. */
function run(
  gl: WebGL2RenderingContext,
  program: WebGLProgram,
  canvas: HTMLCanvasElement,
  options: ShaderOptions,
): ShaderHandle {
  const { density, pointer } = options;
  // biome-ignore lint/correctness/useHookAtTopLevel: WebGL's useProgram, not a React hook.
  gl.useProgram(program);

  // One triangle that covers the canvas.
  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const position = gl.getAttribLocation(program, "position");
  gl.enableVertexAttribArray(position);
  gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

  const locations = new Map<string, WebGLUniformLocation | null>();
  const uniform = (name: string) => {
    if (!locations.has(name)) locations.set(name, gl.getUniformLocation(program, name));
    return locations.get(name) ?? null;
  };

  // The light, eased toward the pointer: where it is, how lit, and how fast it moves.
  const light = { x: 0, y: 0, on: 0, vx: 0, vy: 0 };
  let own = clock;
  let last = performance.now();
  let previous = 0;
  let frame = 0;

  const draw = () => {
    gl.uniform1f(uniform("time"), own);
    for (const [name, value] of Object.entries(options.values ?? {})) gl.uniform1f(uniform(name), value);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  };
  /** Eases the light by `dt` seconds; true while it shows or is coming in. */
  const follow = (dt: number): boolean => {
    if (!pointer) return false;
    const target = pointer.inside ? 1 : 0;
    // Coming in from dark, the light starts at the pointer instead of streaking across.
    if (light.on < 0.01 && target) Object.assign(light, { x: pointer.x, y: pointer.y, vx: 0, vy: 0 });
    const step = 1 - Math.exp(-dt * 12);
    const dx = (pointer.x - light.x) * step;
    const dy = (pointer.y - light.y) * step;
    light.x += dx;
    light.y += dy;
    const blend = 1 - Math.exp(-dt * 8);
    light.vx += (dx / Math.max(dt, 0.001) - light.vx) * blend;
    light.vy += (dy / Math.max(dt, 0.001) - light.vy) * blend;
    light.on += (target - light.on) * (1 - Math.exp(-dt * 5));
    gl.uniform4f(uniform("pointer"), light.x, light.y, light.on, 0);
    gl.uniform2f(uniform("drift"), light.vx, light.vy);
    return target === 1 || light.on > 0.003;
  };
  const recolor = () => {
    const parent = canvas.parentElement ?? canvas;
    for (const [name, expression] of Object.entries(options.colors)) {
      const rgb = shade(parent, expression);
      gl.uniform3f(uniform(name), rgb[0] / 255, rgb[1] / 255, rgb[2] / 255);
    }
    const [r, g, b] = shade(parent, "var(--iro-bg)");
    gl.uniform1f(uniform("dark"), 0.2126 * r + 0.7152 * g + 0.0722 * b < 128 ? 1 : 0);
    draw();
  };
  const resize = () => {
    const ratio = density * (devicePixelRatio || 1);
    canvas.width = Math.max(1, Math.round(canvas.clientWidth * ratio));
    canvas.height = Math.max(1, Math.round(canvas.clientHeight * ratio));
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.uniform2f(uniform("resolution"), canvas.width, canvas.height);
    gl.uniform1f(uniform("scale"), canvas.width / Math.max(1, canvas.clientWidth));
    draw();
  };
  const loop = (now: number) => {
    frame = requestAnimationFrame(loop);
    // A long pause (a hidden tab) doesn't jump the flow.
    const dt = Math.min((now - last) / 1000, 0.1);
    last = now;
    const speed = options.still ? 0 : SPEEDS[motionOf(canvas)];
    own += dt * speed * (options.speed ?? 1);
    options.tick?.(dt * speed);
    const lighting = follow(dt);
    if ((!lighting && now - previous < 33) || (!lighting && speed === 0)) return;
    previous = now;
    draw();
  };

  // A new style, theme or accent on the root, or the system's light or dark (themes may follow it), repaints.
  const root = canvas.closest("[data-iro-style]");
  const attributes = new MutationObserver(() => requestAnimationFrame(recolor));
  if (root)
    attributes.observe(root, {
      attributes: true,
      attributeFilter: ["data-iro-style", "data-iro-theme", "data-iro-accent"],
    });
  const scheme = matchMedia("(prefers-color-scheme: dark)");
  scheme.addEventListener("change", recolor);
  const sizes = new ResizeObserver(resize);
  sizes.observe(canvas);
  recolor();
  resize();
  frame = requestAnimationFrame(loop);

  return {
    stop: () => {
      cancelAnimationFrame(frame);
      clock = own;
      attributes.disconnect();
      sizes.disconnect();
      scheme.removeEventListener("change", recolor);
      gl.deleteBuffer(buffer);
    },
    refresh: recolor,
  };
}

// ── Public API ────────────────────────────
/** Starts `options.fragment` on `canvas` (already in the document). Returns its handle, or null without WebGL2.
 *  Where the browser compiles in the background, the page never waits for it; a shader that fails removes its
 *  canvas. */
export function startShader(canvas: HTMLCanvasElement, options: ShaderOptions): ShaderHandle | null {
  const gl = canvas.getContext("webgl2", {
    antialias: false,
    alpha: options.transparent ?? false,
    premultipliedAlpha: true,
    powerPreference: "low-power",
  });
  const vertex = gl && compile(gl, gl.VERTEX_SHADER, VERTEX);
  const fragment = gl && compile(gl, gl.FRAGMENT_SHADER, options.fragment);
  const program = gl?.createProgram();
  if (!gl || !vertex || !fragment || !program) return null;
  gl.attachShader(program, vertex);
  gl.attachShader(program, fragment);
  gl.linkProgram(program);
  const parallel = gl.getExtension("KHR_parallel_shader_compile");

  let waiting = 0;
  let running: ShaderHandle | null = null;
  const start = () => {
    if (parallel && !gl.getProgramParameter(program, parallel.COMPLETION_STATUS_KHR)) {
      waiting = requestAnimationFrame(start);
      return;
    }
    if (gl.getProgramParameter(program, gl.LINK_STATUS)) running = run(gl, program, canvas, options);
    else canvas.remove();
  };
  start();

  return {
    stop: () => {
      cancelAnimationFrame(waiting);
      running?.stop();
      gl.deleteProgram(program);
      gl.deleteShader(vertex);
      gl.deleteShader(fragment);
    },
    refresh: () => running?.refresh(),
  };
}
