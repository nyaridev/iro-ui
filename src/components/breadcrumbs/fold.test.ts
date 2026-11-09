// Breadcrumbs' folding: short paths show whole; long ones keep the first step and the last ones.

import { expect, test } from "vitest";
import { foldItems } from "./fold";

test("a path that fits shows whole", () => {
  expect(foldItems([1, 2, 3, 4], 4)).toEqual({ start: [1, 2, 3, 4], folded: [], end: [] });
});

test("a long path keeps the first and the last steps", () => {
  expect(foldItems([1, 2, 3, 4, 5, 6], 4)).toEqual({ start: [1], folded: [2, 3], end: [4, 5, 6] });
  expect(foldItems([1, 2, 3, 4, 5], 1)).toEqual({ start: [1], folded: [2, 3, 4], end: [5] });
});
