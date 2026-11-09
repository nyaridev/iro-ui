// Lab discovery: finds every style with its themes and accents, every component's lab page and every template, so new
// ones show up without being registered.

// ── Dependencies ──────────────────────────
import type { ComponentType } from "react";

// ── Types ─────────────────────────────────
/** One style, with the theme and accent names its CSS defines, the style's default first in each. */
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

/** One example screen: its `*.template.tsx` file's default export (ADR-0010). */
export interface LabTemplate {
  /** The folder's name, which goes in the URL: `sign-in`. */
  id: string;
  /** What the sidebar says: `Sign in`. */
  title: string;
  Page: ComponentType;
}

// ── State ─────────────────────────────────
// Every style's CSS loads at once; each is scoped by `data-iro-style`, so they don't clash.
const styleFiles = import.meta.glob("../../src/styles/*/index.css", { eager: true });
const styleSources = import.meta.glob<string>("../../src/styles/*/*.css", {
  query: "?raw",
  import: "default",
  eager: true,
});
const pageFiles = import.meta.glob<{ default: ComponentType }>("../../src/components/**/*.lab.tsx", { eager: true });
const templateFiles = import.meta.glob<{ default: ComponentType }>("../templates/*/*.template.tsx", { eager: true });

// ── Private helpers ───────────────────────
/** A style's CSS files' text, in file order. */
const sourcesOf = (style: string) =>
  Object.entries(styleSources).filter(([path]) => path.includes(`/styles/${style}/`));

/** The distinct values of `data-iro-<attribute>` in a style's CSS, in the order they appear. */
function valuesOf(style: string, attribute: "theme" | "accent"): string[] {
  const pattern = new RegExp(`data-iro-${attribute}="([\\w-]+)"`, "g");
  return [...new Set(sourcesOf(style).flatMap(([, css]) => Array.from(css.matchAll(pattern), (match) => match[1])))];
}

/** The default theme's name: its `color-scheme` in tokens.css, `light` or `dark` (styles.md). */
function defaultTheme(style: string): string {
  const tokens = sourcesOf(style).find(([path]) => path.endsWith("/tokens.css"))?.[1] ?? "";
  return tokens.match(/color-scheme:\s*(light|dark)/)?.[1] ?? "default";
}

// ── Public API ────────────────────────────
/** Styles, named after their folders: `src/styles/sumi/` → `sumi`. */
export const styles: LabStyle[] = Object.keys(styleFiles).map((path) => {
  const name = path.split("/").at(-2) ?? path;
  // accents.css lists the default accent first, so it needs no name of its own.
  return {
    name,
    themes: [...new Set([defaultTheme(name), ...valuesOf(name, "theme")])],
    accents: valuesOf(name, "accent"),
  };
});

/** Component pages, named after their file: `Button.lab.tsx` → `Button`. */
export const pages: LabPage[] = Object.entries(pageFiles).map(([path, module]) => ({
  name: (path.split("/").at(-1) ?? path).replace(".lab.tsx", ""),
  Page: module.default,
}));

/** Templates, named after their folders: `templates/sign-in/` → `sign-in`, shown as "Sign in". */
export const templates: LabTemplate[] = Object.entries(templateFiles).map(([path, module]) => {
  const id = path.split("/").at(-2) ?? path;
  return { id, title: `${id[0].toUpperCase()}${id.slice(1).replaceAll("-", " ")}`, Page: module.default };
});
