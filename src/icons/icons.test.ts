// The icon set's rules (ADR-0009): both drawings, kebab-case names matching their exports, masks only where needed.

import { expect, test } from "vitest";
import { ID, icon, iconMarkup } from "./icon";
import * as entry from "./index";

const sets = Object.entries(entry).filter(([key]) => key.endsWith("Icon"));

test("every export is an icon named after it, with both drawings", () => {
  for (const [key, data] of sets) {
    const { name, line, solid } = data as { name: string; line: string; solid: string };
    expect(name).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
    expect(key).toBe(`${name.replace(/(^|-)(\w)/g, (_, __, letter: string) => letter.toUpperCase())}Icon`);
    expect(line.length, name).toBeGreaterThan(0);
    expect(solid.length, name).toBeGreaterThan(0);
  }
});

test("names are unique and allIcons holds every icon", () => {
  const names = sets.map(([, data]) => (data as { name: string }).name);
  expect(new Set(names).size).toBe(names.length);
  expect(entry.allIcons.map(({ name }) => name)).toEqual([...names].sort((a, b) => a.localeCompare(b)));
});

test("the solid drawing masks only what has holes or cuts", () => {
  expect(icon("plain", { body: "<rect/>" }).solid).not.toContain(ID);
  expect(icon("cut", { body: "<rect/>", cut: "<path/>" }).solid).toContain(`mask="url(#${ID})"`);
  expect(icon("lines", { bold: "<path/>" }).solid).toBe('<g stroke-width="2.5"><path/></g>');
});

test("a slash clears a gap around itself in both drawings, each with its own mask id", () => {
  const { line, solid } = icon("off", { body: "<rect/>", slash: "<path/>" });
  expect(line).toContain(`<mask id="${ID}-line"`);
  expect(line.endsWith("<path/>")).toBe(true);
  expect(solid).toContain(`<g mask="url(#${ID}-slash)">`);
  expect(solid).not.toContain(`id="${ID}"`);
  const { line: drawn } = iconMarkup({ name: "off", line, solid }, "x");
  expect(drawn).toContain('<mask id="x-line"');
});
