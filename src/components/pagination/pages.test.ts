// Pagination's page list: all pages when few, otherwise seven slots with the current page and gaps.

import { expect, test } from "vitest";
import { pageList } from "./pages";

test("few pages are all shown", () => {
  expect(pageList(2, 3)).toEqual([1, 2, 3]);
  expect(pageList(1, 1)).toEqual([1]);
});

test("many pages keep seven slots wherever the current page is", () => {
  expect(pageList(1, 10)).toEqual([1, 2, 3, 4, 5, "gap", 10]);
  expect(pageList(5, 10)).toEqual([1, "gap", 4, 5, 6, "gap", 10]);
  expect(pageList(10, 10)).toEqual([1, "gap", 6, 7, 8, 9, 10]);
});
