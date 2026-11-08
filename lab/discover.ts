// Lab discovery: finds every style and every component's lab page, so new ones show up without being registered.

// ── Dependencies ──────────────────────────
import type { ComponentType } from "react";

// ── Types ─────────────────────────────────
/** One component's page: its `*.lab.tsx` file's default export. */
export interface LabPage {
  name: string;
  Page: ComponentType;
}

// ── Public API ────────────────────────────
// Every style's CSS loads at once; each is scoped by `data-iro-style`, so they don't clash.
const styleFiles = import.meta.glob("../src/styles/*/index.css", { eager: true });
const pageFiles = import.meta.glob<{ default: ComponentType }>("../src/components/**/*.lab.tsx", { eager: true });

/** Style names, from their folders: `src/styles/forge/` → `forge`. */
export const styles: string[] = Object.keys(styleFiles).map((path) => path.split("/").at(-2) ?? path);

/** Component pages, named after their file: `Button.lab.tsx` → `Button`. */
export const pages: LabPage[] = Object.entries(pageFiles).map(([path, module]) => ({
  name: (path.split("/").at(-1) ?? path).replace(".lab.tsx", ""),
  Page: module.default,
}));
