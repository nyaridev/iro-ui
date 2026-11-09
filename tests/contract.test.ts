// The token contract holds: every style defines every token, its default theme has a name, and no CSS uses a token
// the contract lacks (ADR-0002).

import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, test } from "vitest";
import { HOOK_NAMES, TOKEN_NAMES } from "../src/styles/contract";

const styles = readdirSync("src/styles", { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name);

const cssFiles = readdirSync("src", { recursive: true, encoding: "utf8" })
  .filter((file) => file.endsWith(".css"))
  .map((file) => join("src", file));

describe.each(styles)("style %s", (style) => {
  test("tokens.css defines every token", () => {
    const css = readFileSync(join("src/styles", style, "tokens.css"), "utf8");
    const defined = new Set(css.match(/--iro-[\w-]+(?=\s*:)/g));
    expect(TOKEN_NAMES.filter((name) => !defined.has(name))).toEqual([]);
  });

  test("the default theme is named by its color-scheme, and no theme takes that name", () => {
    const tokens = readFileSync(join("src/styles", style, "tokens.css"), "utf8");
    const scheme = tokens.match(/color-scheme:\s*(light|dark)/)?.[1];
    expect(scheme).toBeDefined();
    expect(readFileSync(join("src/styles", style, "themes.css"), "utf8")).not.toContain(`data-iro-theme="${scheme}"`);
  });
});

test("CSS uses only tokens and hooks from the contract", () => {
  const known = new Set([...TOKEN_NAMES, ...HOOK_NAMES]);
  const unknown = cssFiles.flatMap((file) =>
    (readFileSync(file, "utf8").match(/--iro-[\w-]+/g) ?? [])
      .filter((name) => !known.has(name))
      .map((name) => `${file}: ${name}`),
  );
  expect(unknown).toEqual([]);
});

test("component CSS has no raw colors (they belong in the styles)", () => {
  const raw = cssFiles
    .filter((file) => !file.includes("styles"))
    .flatMap((file) =>
      (readFileSync(file, "utf8").match(/#[0-9a-fA-F]{3,8}\b|\brgba?\(/g) ?? []).map((color) => `${file}: ${color}`),
    );
  expect(raw).toEqual([]);
});
