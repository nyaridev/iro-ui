/** Hue 0–360, saturation and brightness 0–1. */
export interface Hsv {
    h: number;
    s: number;
    v: number;
}
/** "#abc", "ABCDEF" or " #aabbcc " as "#aabbcc", or null when it isn't a hex color. */
export declare function normalizeHex(text: string): string | null;
/** The hex color as HSV, or null when it isn't one. Grays get hue 0. */
export declare function hexToHsv(hex: string): Hsv | null;
/** The HSV color as "#rrggbb". */
export declare function hsvToHex({ h, s, v }: Hsv): string;
