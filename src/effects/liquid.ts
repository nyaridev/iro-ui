// The flowing "liquid" background, from UmeSync: one WebGL2 fragment shader of domain-warped noise blending four
// colors from the root's tokens. Half resolution (the result is soft anyway), about 30 frames a second, paused with
// the page by the browser. Speed follows the motion mode; reduced and off hold one still frame.

// ── Dependencies ──────────────────────────
import { shade } from "./color";
import { motionOf } from "./motion";

// ── Constants ─────────────────────────────
const VERTEX = `#version 300 es
in vec2 position;
void main() { gl_Position = vec4(position, 0.0, 1.0); }`;

const FRAGMENT = `#version 300 es
precision highp float;
uniform vec2 resolution;
uniform float time;
uniform vec3 colorA;
uniform vec3 colorB;
uniform vec3 colorC;
uniform vec3 colorD;
out vec4 fragColor;

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
}

void main() {
  vec2 uv = gl_FragCoord.xy / resolution.y * 1.3;
  float t = time * 0.06;
  vec2 q = vec2(fbm(uv + vec2(0.0, t)), fbm(uv + vec2(5.2, 1.3) - t));
  vec2 r = vec2(fbm(uv + 2.2 * q + vec2(1.7, 9.2) + 0.7 * t), fbm(uv + 2.2 * q + vec2(8.3, 2.8) - 0.6 * t));
  float f = fbm(uv + 2.4 * r);
  vec3 color = mix(colorA, colorB, smoothstep(0.25, 0.85, f));
  color = mix(color, colorC, smoothstep(0.45, 1.1, length(q)) * 0.85);
  color = mix(color, colorD, smoothstep(0.55, 0.95, r.x) * 0.6);
  fragColor = vec4(color, 1.0);
}`;

/** The four colors: the background, then each glow mixed into it (UmeSync's 24%, 13% and 9%). */
const COLORS = [
  "var(--iro-bg)",
  "color-mix(in oklab, var(--iro-bg) 76%, var(--iro-glow-1))",
  "color-mix(in oklab, var(--iro-bg) 87%, var(--iro-glow-2))",
  "color-mix(in oklab, var(--iro-bg) 91%, var(--iro-glow-3))",
];

const SPEEDS = { full: 1, smooth: 0.6, reduced: 0, off: 0 };

// ── State ─────────────────────────────────
// One clock for the page, so the flow carries on where it was when a backdrop remounts. Starts at a random point.
let clock = 40 + Math.random() * 40;

// ── Private helpers ───────────────────────
function compile(gl: WebGL2RenderingContext, type: number, source: string): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  return gl.getShaderParameter(shader, gl.COMPILE_STATUS) ? shader : null;
}

// ── Public API ────────────────────────────
/** Starts the liquid on `canvas` (already in the document). Returns its cleanup, or null without WebGL2. */
export function startLiquid(canvas: HTMLCanvasElement): (() => void) | null {
  const gl = canvas.getContext("webgl2", { antialias: false, alpha: false, powerPreference: "low-power" });
  const vertex = gl && compile(gl, gl.VERTEX_SHADER, VERTEX);
  const fragment = gl && compile(gl, gl.FRAGMENT_SHADER, FRAGMENT);
  const program = gl?.createProgram();
  if (!gl || !vertex || !fragment || !program) return null;
  gl.attachShader(program, vertex);
  gl.attachShader(program, fragment);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return null;
  // biome-ignore lint/correctness/useHookAtTopLevel: WebGL's useProgram, not a React hook.
  gl.useProgram(program);

  // One triangle that covers the canvas.
  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const position = gl.getAttribLocation(program, "position");
  gl.enableVertexAttribArray(position);
  gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

  const resolution = gl.getUniformLocation(program, "resolution");
  const time = gl.getUniformLocation(program, "time");
  const colors = ["colorA", "colorB", "colorC", "colorD"].map((name) => gl.getUniformLocation(program, name));

  let last = performance.now();
  let previous = 0;
  let frame = 0;

  const draw = (now: number) => {
    clock += ((now - last) / 1000) * SPEEDS[motionOf(canvas)];
    last = now;
    gl.uniform1f(time, clock);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  };
  const recolor = () => {
    COLORS.forEach((expression, i) => {
      const rgb = shade(canvas.parentElement ?? canvas, expression);
      gl.uniform3f(colors[i], rgb[0] / 255, rgb[1] / 255, rgb[2] / 255);
    });
    draw(performance.now());
  };
  const resize = () => {
    const scale = 0.5 * (devicePixelRatio || 1);
    canvas.width = Math.max(1, Math.round(canvas.clientWidth * scale));
    canvas.height = Math.max(1, Math.round(canvas.clientHeight * scale));
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.uniform2f(resolution, canvas.width, canvas.height);
    draw(performance.now());
  };
  const loop = (now: number) => {
    frame = requestAnimationFrame(loop);
    if (now - previous < 33) return;
    previous = now;
    if (SPEEDS[motionOf(canvas)] > 0) draw(now);
    else last = now;
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

  return () => {
    cancelAnimationFrame(frame);
    attributes.disconnect();
    sizes.disconnect();
    scheme.removeEventListener("change", recolor);
    gl.deleteBuffer(buffer);
    gl.deleteProgram(program);
    gl.deleteShader(vertex);
    gl.deleteShader(fragment);
  };
}
