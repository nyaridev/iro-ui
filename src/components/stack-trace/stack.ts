// Reads a JavaScript stack trace into frames: the V8 form ("    at fn (file:line:col)", Chromium and Node) and the
// SpiderMonkey and JavaScriptCore form ("fn@file:line:col", Firefox and Safari). Frames from dependencies and the
// runtime are marked internal, so the reader's own code stands out.

// ── Types ─────────────────────────────────
export interface StackFrame {
  /** The function, when the trace names one. */
  fn?: string;
  file: string;
  line?: number;
  column?: number;
  /** From a dependency or the runtime, not the app's own code. */
  internal?: boolean;
}

// ── Constants ─────────────────────────────
const V8 = /^\s*at (?:(.+?) \()?(.+?)(?::(\d+))?(?::(\d+))?\)?$/;
const GECKO = /^(.*?)@(.+?)(?::(\d+))?(?::(\d+))?$/;
const INTERNAL = /node_modules|^node:|^internal\/|^<anonymous>$|^native$/;

// ── Public API ────────────────────────────
/** The error's first line and its frames; lines that aren't frames are skipped. */
export function parseStack(stack: string): { message: string; frames: StackFrame[] } {
  const lines = stack.split(/\r?\n/);
  const frames: StackFrame[] = [];
  const message: string[] = [];
  for (const line of lines) {
    const match = line.match(V8) ?? (line.includes("@") ? line.match(GECKO) : null);
    if (!match) {
      if (frames.length === 0 && line.trim()) message.push(line.trim());
      continue;
    }
    const [, fn, file, row, column] = match;
    frames.push({
      fn: fn?.trim() || undefined,
      file,
      line: row ? Number(row) : undefined,
      column: column ? Number(column) : undefined,
      internal: INTERNAL.test(file),
    });
  }
  return { message: message.join(" "), frames };
}
