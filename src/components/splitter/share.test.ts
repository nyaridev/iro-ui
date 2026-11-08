import { expect, test } from "vitest";
import { clampShare } from "./share";

const LIMITS = { min: 0.2, max: 0.8, minStart: 300, minEnd: 200 };

test("clampShare: share limits on a wide row", () => {
  expect(clampShare(0.5, 2000, LIMITS)).toBe(0.5);
  expect(clampShare(0.05, 2000, LIMITS)).toBe(0.2);
  expect(clampShare(0.95, 2000, LIMITS)).toBe(0.8);
});

test("clampShare: pixel limits win on a narrow row", () => {
  expect(clampShare(0.2, 1000, LIMITS)).toBe(0.3);
  expect(clampShare(0.9, 1000, LIMITS)).toBe(0.8);
  expect(clampShare(0.9, 800, LIMITS)).toBe(0.75);
});

test("clampShare: too narrow for both panes keeps the start pane's minimum", () => {
  expect(clampShare(0.5, 400, LIMITS)).toBe(0.75);
});

test("clampShare: an unmeasured row uses the share limits only", () => {
  expect(clampShare(0.9, 0, LIMITS)).toBe(0.8);
});
