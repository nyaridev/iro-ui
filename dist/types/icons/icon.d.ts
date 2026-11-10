/** Stands for an id unique on the page; `Icon` (or the app) replaces it, since every mask needs its own. */
export declare const ID = "__ID__";
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
/** Builds an icon's two drawings from its parts. */
export declare function icon(name: string, { body, hole, cut, bold, slash }: IconParts): IconData;
/** The drawings with `__ID__` replaced by `id`, for apps that build the svg themselves. */
export declare function iconMarkup({ line, solid }: IconData, id: string): {
    line: string;
    solid: string;
};
/** A path. */
export declare const p: (d: string) => string;
/** A circle. */
export declare const c: (cx: number, cy: number, r: number) => string;
/** A rounded rectangle. */
export declare const r: (x: number, y: number, w: number, h: number, rx?: number) => string;
/** An ellipse. */
export declare const e: (cx: number, cy: number, rx: number, ry: number) => string;
/** A filled dot: solid in every drawing (cut out when it's a cut). */
export declare const dot: (cx: number, cy: number, rad?: number) => string;
