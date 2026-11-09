// Color math for ColorPicker: hex text to hue, saturation and brightness (HSV) and back. The picker works in HSV
// because its square is saturation across and brightness up.

// ── Types ─────────────────────────────────
/** Hue 0–360, saturation and brightness 0–1. */
export interface Hsv {
  h: number;
  s: number;
  v: number;
}

// ── Public API ────────────────────────────
/** "#abc", "ABCDEF" or " #aabbcc " as "#aabbcc", or null when it isn't a hex color. */
export function normalizeHex(text: string): string | null {
  const digits = text.trim().replace(/^#/, "").toLowerCase();
  if (/^[0-9a-f]{3}$/.test(digits)) return `#${[...digits].map((digit) => digit + digit).join("")}`;
  if (/^[0-9a-f]{6}$/.test(digits)) return `#${digits}`;
  return null;
}

/** The hex color as HSV, or null when it isn't one. Grays get hue 0. */
export function hexToHsv(hex: string): Hsv | null {
  const clean = normalizeHex(hex);
  if (!clean) return null;
  const [r, g, b] = [1, 3, 5].map((at) => Number.parseInt(clean.slice(at, at + 2), 16) / 255);
  const max = Math.max(r, g, b);
  const spread = max - Math.min(r, g, b);
  let h = 0;
  if (spread) {
    if (max === r) h = ((g - b) / spread + 6) % 6;
    else if (max === g) h = (b - r) / spread + 2;
    else h = (r - g) / spread + 4;
  }
  return { h: h * 60, s: max ? spread / max : 0, v: max };
}

/** The HSV color as "#rrggbb". */
export function hsvToHex({ h, s, v }: Hsv): string {
  const channel = (n: number) => {
    const k = (n + h / 60) % 6;
    const value = v - v * s * Math.max(0, Math.min(k, 4 - k, 1));
    return Math.round(value * 255)
      .toString(16)
      .padStart(2, "0");
  };
  return `#${channel(5)}${channel(3)}${channel(1)}`;
}
