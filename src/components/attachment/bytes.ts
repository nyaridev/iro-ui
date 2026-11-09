// A file size as people read it: "820 B", "14 KB", "3.2 MB". Steps of 1000, the way file managers show sizes now.

// ── Constants ─────────────────────────────
const UNITS = ["B", "KB", "MB", "GB", "TB"];

// ── Public API ────────────────────────────
/** `bytes` in the largest unit that keeps it at 1 or more, with one decimal under 10. */
export function formatBytes(bytes: number): string {
  let value = Math.max(0, bytes);
  let unit = 0;
  while (value >= 1000 && unit < UNITS.length - 1) {
    value /= 1000;
    unit += 1;
  }
  const shown = unit === 0 || value >= 10 ? Math.round(value) : Math.round(value * 10) / 10;
  return `${shown} ${UNITS[unit]}`;
}
