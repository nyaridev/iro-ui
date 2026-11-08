// Snapshot of the public surface (ADR-0004). When one of these changes, decide the version and add a changelog line.

import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { expect, test } from "vitest";
import * as effects from "../src/effects/index";
import * as api from "../src/index";
import { HOOK_NAMES, TOKEN_NAMES } from "../src/styles/contract";

/** The distinct values of `data-iro-<attribute>` in a style's CSS. */
function attributeValues(style: string, attribute: "theme" | "accent"): string[] {
  const css = readdirSync(join("src/styles", style))
    .map((file) => readFileSync(join("src/styles", style, file), "utf8"))
    .join("\n");
  const pattern = new RegExp(`data-iro-${attribute}="([\\w-]+)"`, "g");
  return [...new Set(Array.from(css.matchAll(pattern), (match) => match[1]))].sort();
}

test("exports", () => {
  expect(Object.keys(api).sort()).toMatchSnapshot();
  expect(Object.keys(effects).sort()).toMatchSnapshot();
});

test("token names", () => {
  expect(TOKEN_NAMES).toMatchSnapshot();
  expect(HOOK_NAMES).toMatchSnapshot();
});

test("styles, themes and accents", () => {
  const styles = readdirSync("src/styles", { withFileTypes: true }).filter((entry) => entry.isDirectory());
  const surface = styles.map(({ name }) => ({
    style: name,
    themes: attributeValues(name, "theme"),
    accents: attributeValues(name, "accent"),
  }));
  expect(surface).toMatchSnapshot();
});
