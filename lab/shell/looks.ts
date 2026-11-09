// The Lab's URL and columns: the view, the look each column shows (style, theme, accent, motion), read from and
// written to the URL, and the look a new column starts in.

// ── Dependencies ──────────────────────────
import { styles } from "./discover";

// ── Constants ─────────────────────────────
/** The style pages open in, and the one the Lab itself is drawn in. */
export const DEFAULT_STYLE = "kami";
export const MAX_COLUMNS = 4;
/** `system` leaves the root's motion out, so it follows the OS setting. */
export const MOTIONS = ["system", "full", "smooth", "reduced", "off"];
/** The Style picker's list: the default style first, then the rest as found. */
export const STYLE_NAMES = styles
  .map(({ name }) => name)
  .sort((a, b) => Number(b === DEFAULT_STYLE) - Number(a === DEFAULT_STYLE));
const KEYS = ["style", "theme", "accent", "motion"] as const;

// ── Types ─────────────────────────────────
/** What the Lab lists: component pages (and its own), or example screens. */
export type View = "components" | "templates";

/** One column's look; `id` keeps a column's page state when a column before it is removed. */
export interface Look {
  id: number;
  style: string;
  theme: string;
  accent: string;
  motion: string;
}

// ── State ─────────────────────────────────
let nextId = 0;

// ── Private helpers ───────────────────────
/** A look with every value checked against what the style offers; anything else gets the style's default. */
function look(style: string, theme = "", accent = "", motion = "system"): Look {
  const { themes = [], accents = [] } = styles.find(({ name }) => name === style) ?? {};
  return {
    id: nextId++,
    style,
    theme: themes.includes(theme) ? theme : (themes[0] ?? ""),
    accent: accents.includes(accent) ? accent : (accents[0] ?? ""),
    motion: MOTIONS.includes(motion) ? motion : "system",
  };
}

// ── Public API ────────────────────────────
/** The columns a URL names, one per comma-separated value: `?style=kami,sumi&theme=light,light`. */
export function looksFrom(params: URLSearchParams): Look[] {
  const [names, themes, accents, motions] = KEYS.map((key) => params.get(key)?.split(",") ?? []);
  const shown = names.filter((name) => STYLE_NAMES.includes(name)).slice(0, MAX_COLUMNS);
  if (shown.length === 0) return [look(DEFAULT_STYLE, themes[0], accents[0], motions[0])];
  return shown.map((name, index) => look(name, themes[index], accents[index], motions[index]));
}

/** The view a URL names; Components unless it says `view=templates`. */
export const viewFrom = (params: URLSearchParams): View =>
  params.get("view") === "templates" ? "templates" : "components";

/** The URL query for the columns, the view and its page, commas left readable. */
export function queryOf(looks: Look[], view: View, page: string): string {
  const pairs = KEYS.map((key) => `${key}=${looks.map((each) => encodeURIComponent(each[key])).join(",")}`);
  return `?${pairs.join("&")}&view=${view}&page=${encodeURIComponent(page)}`;
}

/** A new column: the first style no column shows yet, or the last column's style once every style is shown. */
export function nextLook(looks: Look[]): Look {
  const unused = STYLE_NAMES.find((name) => !looks.some((each) => each.style === name));
  return look(unused ?? looks.at(-1)?.style ?? DEFAULT_STYLE);
}
