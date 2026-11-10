// The UI checks' walker (ADR-0015): splits the Lab's pages and templates into runs per look, shows each page, opens
// each overlay the page marks with `data-lab-state`, and hands every state to the measures.

// ── Dependencies ──────────────────────────
import { readdirSync, readFileSync } from "node:fs";
import type { Page, TestInfo } from "@playwright/test";
import { openLab, showPage } from "../visual/lab";
import { install, type RawFinding } from "./measure/page";
import { Report } from "./report";

// ── Constants ─────────────────────────────
const SRC = new URL("../../src/", import.meta.url);
const LAB = new URL("../../lab/", import.meta.url);
/** Pages per test, so a full run spreads over the workers. */
const CHUNK = 30;
/** What the walker may press to open an overlay, when the marked element is a wrapper. */
const CONTROL = "button, a[href], input, textarea, [role='combobox'], [tabindex]:not([tabindex='-1'])";

// ── Types ─────────────────────────────────
/** How the Lab is opened for a run. */
export interface Look {
  style: string;
  theme: string;
  /** The Lab's motion mode; `off` unless the run is about motion. */
  motion: string;
}

/** One Lab page: what the sidebar calls it, and its view. */
export interface Stop {
  name: string;
  view: "components" | "templates";
}

/** One test's share: a look, a window width and the pages it walks. */
export interface Run {
  title: string;
  look: Look;
  /** The window's width in px; 1200 unless the run is about narrow screens. */
  width: number;
  stops: Stop[];
}

/** A measure: everything it finds in the page as it stands. */
export type Measure = (page: Page) => Promise<RawFinding[]>;

// ── Private helpers ───────────────────────
/** `UI_PAGE=TreeRow,Chip` and `UI_STYLE=kon`, lowercased; empty when unset. */
const filter = (name: string) =>
  (process.env[name] ?? "")
    .split(",")
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean);

/** Every Lab page in sidebar terms, read from the files the Lab discovers them from (`lab/shell/discover.ts`). */
function stops(): Stop[] {
  const own = readdirSync(new URL("pages/", LAB))
    .filter((file) => file.endsWith("Page.tsx"))
    .map((file) => file.replace("Page.tsx", ""));
  const components = readdirSync(new URL("components/", SRC), { recursive: true, encoding: "utf8" })
    .filter((file) => file.endsWith(".lab.tsx"))
    .map((file) => (file.split(/[\\/]/).at(-1) ?? file).replace(".lab.tsx", ""))
    .sort();
  const templates = readdirSync(new URL("templates/", LAB)).map(
    (id) => `${id[0].toUpperCase()}${id.slice(1).replaceAll("-", " ")}`,
  );
  const only = filter("UI_PAGE");
  return [
    ...[...own, ...components].map((name): Stop => ({ name, view: "components" })),
    ...templates.map((name): Stop => ({ name, view: "templates" })),
  ].filter((stop) => only.length === 0 || only.includes(stop.name.toLowerCase()));
}

/** Each style with its default theme (its tokens' `color-scheme`) and every theme its CSS defines. */
function styles(): { name: string; base: string; themes: string[] }[] {
  const only = filter("UI_STYLE");
  return readdirSync(new URL("styles/", SRC), { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && (only.length === 0 || only.includes(entry.name)))
    .map(({ name }) => {
      const read = (file: string) => readFileSync(new URL(`styles/${name}/${file}`, SRC), "utf8");
      const base = read("tokens.css").match(/color-scheme:\s*(light|dark)/)?.[1] ?? "light";
      const named = Array.from(read("themes.css").matchAll(/data-iro-theme="([\w-]+)"/g), (match) => match[1]);
      return { name, base, themes: [...new Set([base, ...named])] };
    });
}

/** Waits until the page has drawn: fonts loaded and two frames past the last change. */
async function settle(page: Page) {
  await page.evaluate(
    () =>
      new Promise<void>((done) => {
        document.fonts.ready.then(() => requestAnimationFrame(() => requestAnimationFrame(() => done())));
      }),
  );
}

/** The `data-lab-state` elements shown at this width; a phone-only menu button is opened by the narrow runs. */
const shownMarkers = (page: Page) => page.locator(".lab-column [data-lab-state]").filter({ visible: true });

/** Opens the overlay behind one `data-lab-state` element; returns what to call that state, or null if it didn't open. */
async function open(page: Page, index: number): Promise<string | null> {
  const marked = shownMarkers(page).nth(index);
  const state = (await marked.getAttribute("data-lab-state")) || "click";
  const isControl = await marked.evaluate((node, control) => node.matches(control), CONTROL);
  const target = isControl || state === "contextmenu" ? marked : marked.locator(CONTROL).first();
  const label = await target.evaluate(
    (node) =>
      (node.getAttribute("aria-label") || (node instanceof HTMLInputElement ? node.value : node.textContent) || "")
        .trim()
        .slice(0, 30) || node.tagName,
  );
  if (state === "hover") await target.hover();
  else if (state === "contextmenu") await target.click({ button: "right" });
  else if (await target.evaluate((node) => node.matches("input, textarea"))) {
    await target.focus();
    await page.keyboard.press("ArrowDown");
  } else await target.click();
  const opened = await page
    .waitForFunction(() => iroUi.overlay(), null, {
      timeout: 2000,
    })
    .then(() => true)
    .catch(() => false);
  await settle(page);
  return opened ? `${state}: ${label}` : null;
}

/** Closes whatever is open, the way a person would. */
async function close(page: Page) {
  await page.keyboard.press("Escape");
  await page.mouse.move(0, 0);
  await page
    .waitForFunction(() => !iroUi.overlay(), null, {
      timeout: 2000,
    })
    .catch(() => undefined);
}

// ── Public API ────────────────────────────
/** The runs for a check area: each look (`themes` picks a style's themes from its list) and width, times each chunk
 *  of pages. */
export function runs(
  themes: (style: { base: string; themes: string[] }) => string[],
  { motion = "off", widths = [1200] }: { motion?: string; widths?: number[] } = {},
): Run[] {
  const all = stops();
  const chunks = Array.from({ length: Math.ceil(all.length / CHUNK) }, (_, index) =>
    all.slice(index * CHUNK, (index + 1) * CHUNK),
  );
  return styles().flatMap((style) =>
    themes(style).flatMap((theme) =>
      widths.flatMap((width) =>
        chunks.map((chunk) => ({
          title: `${style.name} ${theme}${width === 1200 ? "" : ` at ${width} px`}: ${chunk[0].name} to ${chunk.at(-1)?.name}`,
          look: { style: style.name, theme, motion },
          width,
          stops: chunk,
        })),
      ),
    ),
  );
}

/** Walks a run: every page in it, then each of its overlays opened in turn, measured and reported; `closed` measures
 *  what each overlay leaves once closed. */
export async function walk(
  page: Page,
  info: TestInfo,
  run: Run,
  area: string,
  measures: Measure[],
  closed: Measure[] = [],
) {
  info.setTimeout(run.stops.length * 15_000);
  await page.setViewportSize({ width: run.width, height: 900 });
  await page.addInitScript(install);
  await page.addInitScript(() => {
    try {
      localStorage.setItem("iro-lab-nav", "closed");
    } catch {}
  });
  const report = new Report(page, info, run, area);
  let view: Stop["view"] | null = null;
  for (const stop of run.stops) {
    if (stop.view !== view) {
      await openLab(page, { ...run.look, view: stop.view });
      view = stop.view;
    }
    await showPage(page, stop.name);
    await settle(page);
    await report.add(stop, null, measures);
    const count = await shownMarkers(page).count();
    for (let index = 0; index < count; index++) {
      const overlay = await open(page, index);
      if (overlay) await report.add(stop, overlay, measures);
      else report.note(`${stop.name}: overlay ${index + 1} didn't open`);
      await close(page);
      if (overlay) await report.add(stop, overlay, closed);
    }
  }
  await report.finish();
}
