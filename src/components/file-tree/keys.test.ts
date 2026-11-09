// The tree's keys (ADR-0013): moving, opening and closing, the parent, and typing a letter.

import { expect, test } from "vitest";
import { type TreeKeyRow, treeKey } from "./keys";

// src (open) > App.tsx, main.tsx; styles (closed); README.md
const ROWS: TreeKeyRow[] = [
  { depth: 0, open: true, label: "src" },
  { depth: 1, label: "App.tsx" },
  { depth: 1, label: "main.tsx" },
  { depth: 0, open: false, label: "styles" },
  { depth: 0, label: "README.md" },
];

test("moves up and down, and to the ends, without leaving the tree", () => {
  expect(treeKey(ROWS, 1, "ArrowDown")).toEqual({ type: "focus", index: 2 });
  expect(treeKey(ROWS, 4, "ArrowDown")).toEqual({ type: "focus", index: 4 });
  expect(treeKey(ROWS, 0, "ArrowUp")).toEqual({ type: "focus", index: 0 });
  expect(treeKey(ROWS, 2, "Home")).toEqual({ type: "focus", index: 0 });
  expect(treeKey(ROWS, 2, "End")).toEqual({ type: "focus", index: 4 });
});

test("Right opens a closed folder, then moves into it", () => {
  expect(treeKey(ROWS, 3, "ArrowRight")).toEqual({ type: "open", index: 3 });
  expect(treeKey(ROWS, 0, "ArrowRight")).toEqual({ type: "focus", index: 1 });
  expect(treeKey(ROWS, 4, "ArrowRight")).toBeNull();
});

test("Left closes an open folder, or goes to the parent", () => {
  expect(treeKey(ROWS, 0, "ArrowLeft")).toEqual({ type: "close", index: 0 });
  expect(treeKey(ROWS, 2, "ArrowLeft")).toEqual({ type: "focus", index: 0 });
  expect(treeKey(ROWS, 4, "ArrowLeft")).toBeNull();
});

test("a letter moves to the next row starting with it, wrapping", () => {
  expect(treeKey(ROWS, 0, "m")).toEqual({ type: "focus", index: 2 });
  expect(treeKey(ROWS, 3, "S")).toEqual({ type: "focus", index: 0 });
  expect(treeKey(ROWS, 0, "x")).toBeNull();
  expect(treeKey(ROWS, 0, " ")).toBeNull();
  expect(treeKey(ROWS, 0, "Enter")).toBeNull();
});
