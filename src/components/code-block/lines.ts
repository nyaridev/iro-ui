// Splits code into the lines CodeBlock draws, whatever the line endings.

// ── Public API ────────────────────────────
/** The code's lines, without the empty one a final newline would leave. */
export function linesOf(code: string): string[] {
  const lines = code.replace(/\r\n?/g, "\n").split("\n");
  if (lines.length > 1 && lines.at(-1) === "") lines.pop();
  return lines;
}
