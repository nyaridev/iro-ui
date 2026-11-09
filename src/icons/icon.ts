// The icon builder (ADR-0009): one geometry on a 24 px grid, split into parts by role, becomes two drawings. `line`
// strokes every part (kon); `solid` fills the body, knocks the holes and cuts out of it and strokes bold parts heavier
// (sumi). Plain strings, no React, so any app can use them.

// ── Constants ─────────────────────────────
/** Stroke of the solid drawing's bold lines, and of the cuts knocked out of its body. */
const BOLD = 2.5;
const CUT = 1.75;
/** The body's own stroke in the solid drawing: it rounds the corners and matches the line drawing's outline. */
const BODY = 1.75;
/** Width cleared along a slash: its own line plus a gap on each side, in the line and the solid drawing. */
const SLASH_LINE = 4.75;
const SLASH_SOLID = 5.5;
/** Stands for an id unique on the page; `Icon` (or the app) replaces it, since every mask needs its own. */
export const ID = "__ID__";

// ── Types ─────────────────────────────────
/** An icon's geometry, as SVG markup per role. */
export interface IconParts {
  /** Closed outlines: stroked in the line drawing, filled in the solid one. */
  body?: string;
  /** Openings in the body (a gear's center): outlined in line, cut through in solid. */
  hole?: string;
  /** Detail lines on the body (a document's text): stroked in line, knocked out of the solid body. */
  cut?: string;
  /** Lines that stand alone (an arrow, a handle): stroked in line, stroked heavier in solid. */
  bold?: string;
  /** A strike across everything (eye-off, a divider): a line in line, bold in solid, with a gap cleared around it. */
  slash?: string;
}

/** One icon: its name and both drawings, as the inside of a `viewBox="0 0 24 24"` svg. */
export interface IconData {
  name: string;
  line: string;
  solid: string;
}

// ── Private helpers ───────────────────────
/** A mask that shows everything except what `inner` draws in black. */
const cover = (id: string, inner: string) =>
  `<mask id="${id}" maskUnits="userSpaceOnUse" x="-4" y="-4" width="32" height="32">` +
  `<rect x="-4" y="-4" width="32" height="32" fill="white"/>${inner}</mask>`;

// ── Public API ────────────────────────────
/** Builds an icon's two drawings from its parts. */
export function icon(name: string, { body = "", hole = "", cut = "", bold = "", slash = "" }: IconParts): IconData {
  const knocked = hole || cut;
  const mask = knocked
    ? cover(
        ID,
        (cut ? `<g color="black" stroke="black" stroke-width="${CUT}">${cut}</g>` : "") +
          (hole ? `<g fill="black" stroke="none">${hole}</g>` : ""),
      )
    : "";
  const filled = body
    ? `<g fill="currentColor" stroke-width="${BODY}"${knocked ? ` mask="url(#${ID})"` : ""}>${body}</g>`
    : "";
  const stroked = bold ? `<g stroke-width="${BOLD}">${bold}</g>` : "";
  if (!slash) return { name, line: `${body}${hole}${cut}${bold}`, solid: `${mask}${filled}${stroked}` };
  const clear = (id: string, width: number) => cover(id, `<g stroke="black" stroke-width="${width}">${slash}</g>`);
  return {
    name,
    line: `${clear(`${ID}-line`, SLASH_LINE)}<g mask="url(#${ID}-line)">${body}${hole}${cut}${bold}</g>${slash}`,
    solid:
      `${mask}${clear(`${ID}-slash`, SLASH_SOLID)}<g mask="url(#${ID}-slash)">${filled}${stroked}</g>` +
      `<g stroke-width="${BOLD}">${slash}</g>`,
  };
}

/** The drawings with `__ID__` replaced by `id`, for apps that build the svg themselves. */
export function iconMarkup({ line, solid }: IconData, id: string): { line: string; solid: string } {
  return { line: line.replaceAll(ID, id), solid: solid.replaceAll(ID, id) };
}

// ── Markup helpers ────────────────────────
// Short builders the set files use, so each icon reads as its shapes.

/** A path. */
export const p = (d: string) => `<path d="${d}"/>`;
/** A circle. */
export const c = (cx: number, cy: number, r: number) => `<circle cx="${cx}" cy="${cy}" r="${r}"/>`;
/** A rounded rectangle. */
export const r = (x: number, y: number, w: number, h: number, rx = 0) =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}"/>`;
/** An ellipse. */
export const e = (cx: number, cy: number, rx: number, ry: number) =>
  `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}"/>`;
/** A filled dot: solid in every drawing (cut out when it's a cut). */
export const dot = (cx: number, cy: number, rad = 1.1) =>
  `<circle cx="${cx}" cy="${cy}" r="${rad}" fill="currentColor" stroke="none"/>`;
