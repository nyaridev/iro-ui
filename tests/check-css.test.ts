// The static CSS rules (ADR-0015): each rule on a line that breaks it and one that doesn't.

import { expect, test } from "vitest";
import { checkCss, declarations } from "../scripts/check-css";

const rules = (css: string, file = "src/components/x/x.css") => checkCss(file, css).map((finding) => finding.rule);

test("reads declarations with their line, context and comments", () => {
  const [first] = declarations("/* fixed timing */\n.a {\n  color: red;\n}");
  expect(first).toMatchObject({ property: "color", value: "red", line: 3, context: [".a"] });
  expect(first.comments).toEqual([" fixed timing "]);
});

test("spacing: tokens, hairlines and text-relative math pass; raw px and rem don't", () => {
  expect(rules(".a { padding: var(--iro-space-2) 2px; margin-top: calc((1lh - 16px) / 2); gap: 0.5em; }")).toEqual([]);
  expect(rules(".a { padding: 0 4px; }")).toEqual(["spacing"]);
  expect(rules(".a { margin: 1rem; }")).toEqual(["spacing"]);
  expect(rules(".a { padding: 6px var(--iro-space-2); }")).toEqual(["spacing"]);
  expect(rules(".a { padding: 12px; }", "src/styles/kami/tokens.css")).toEqual([]);
});

test("motion: token durations and easings pass; raw ones need a fixed-timing note", () => {
  expect(rules(".a { transition: opacity var(--iro-dur) var(--iro-ease); }")).toEqual([]);
  expect(rules(".a { transition: opacity 200ms ease-out; }")).toEqual(["motion", "motion"]);
  expect(rules("/* A spinner: fixed timing. */\n.a { animation: spin 1s linear infinite; }")).toEqual([]);
  expect(rules(".a { animation: iro-ease-in-pop var(--iro-dur) var(--iro-ease); }")).toEqual([]);
});

test("travel: movement in enter, exit and keyframes scales with --iro-travel or --iro-move, fixed timing or not", () => {
  expect(rules(".a[data-starting-style] { transform: translateY(calc(8px * var(--iro-travel))); }")).toEqual([]);
  expect(rules(".a[data-starting-style] { transform: translateY(8px); }")).toEqual(["travel"]);
  expect(rules("@keyframes x { to { transform: translate(-50%, -50%); } from { scale: 1; } }")).toEqual([]);
  expect(rules("/* fixed timing */\n@keyframes x { to { rotate: calc(1turn * var(--iro-move)); } }")).toEqual([]);
  expect(rules("/* fixed timing */\n@keyframes x { to { rotate: 1turn; } }")).toEqual(["travel"]);
});

test("layout transitions stop under reduced motion: their duration is scaled by --iro-move", () => {
  expect(rules(".a { transition: width var(--iro-dur) var(--iro-ease); }")).toEqual(["layout-transition"]);
  expect(rules(".a { transition: height calc(var(--iro-dur) * var(--iro-move)) var(--iro-ease); }")).toEqual([]);
});

test("container: components follow their container at 30rem and 48rem, not the window", () => {
  expect(rules("@media (max-width: 600px) { .a { gap: var(--iro-space-1); } }")).toEqual(["container"]);
  expect(rules("@container (width < 30rem) { .a { gap: var(--iro-space-1); } }")).toEqual([]);
  expect(rules("@container (width > 40rem) { .a { gap: var(--iro-space-1); } }")).toEqual(["container"]);
  expect(rules("@media (pointer: coarse) { .a { opacity: 1; } }")).toEqual([]);
});

test("baseline: newer features need @supports; harmless ones and widely available ones pass", () => {
  expect(rules(".a { field-sizing: content; }")).toContain("baseline");
  expect(rules("@supports (field-sizing: content) { .a { field-sizing: content; } }")).toEqual([]);
  expect(rules(".a { cursor: pointer; display: grid; }")).toEqual([]);
});
