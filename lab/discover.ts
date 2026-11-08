// Lab discovery: finds every style with its themes and accents, and every component's lab page, so new ones show up
// without being registered.

// ── Dependencies ──────────────────────────
import type { ComponentType } from "react";

// ── Types ─────────────────────────────────
/** One style, with the theme and accent values its CSS defines (`default` is always first). */
export interface LabStyle {
  name: string;
  themes: string[];
  accents: string[];
}

/** One component's page: its `*.lab.tsx` file's default export. */
export interface LabPage {
  name: string;
  Page: ComponentType;
}

// ── State ─────────────────────────────────
// Every style's CSS loads at once; each is scoped by `data-iro-style`, so they don't clash.
const styleFiles = import.meta.glob("../src/styles/*/index.css", { eager: true });
const styleSources = import.meta.glob<string>("../src/styles/*/*.css", {
  query: "?raw",
  import: "default",
  eager: true,
});
const pageFiles = import.meta.glob<{ default: ComponentType }>("../src/components/**/*.lab.tsx", { eager: true });

// ── Private helpers ───────────────────────
/** The distinct values of `data-iro-<attribute>` in a style's CSS files, after `default`. */
function valuesOf(style: string, attribute: "theme" | "accent"): string[] {
  const pattern = new RegExp(`data-iro-${attribute}="([\\w-]+)"`, "g");
  const found = Object.entries(styleSources)
    .filter(([path]) => path.includes(`/styles/${style}/`))
    .flatMap(([, css]) => Array.from(css.matchAll(pattern), (match) => match[1]));
  return ["default", ...new Set(found)];
}

// ── Public API ────────────────────────────
/** Styles, named after their folders: `src/styles/sumi/` → `sumi`. */
export const styles: LabStyle[] = Object.keys(styleFiles).map((path) => {
  const name = path.split("/").at(-2) ?? path;
  return { name, themes: valuesOf(name, "theme"), accents: valuesOf(name, "accent") };
});

/** Component pages, named after their file: `Button.lab.tsx` → `Button`. */
export const pages: LabPage[] = Object.entries(pageFiles).map(([path, module]) => ({
  name: (path.split("/").at(-1) ?? path).replace(".lab.tsx", ""),
  Page: module.default,
}));
