// TagInput's adding rule: commas split, blanks and repeats are skipped, the limit holds.

import { expect, test } from "vitest";
import { addTags } from "./tags";

test("splits on commas and trims, skipping blanks and tags already there in any case", () => {
  expect(addTags(["design"], " Code, , DESIGN ,docs")).toEqual(["design", "Code", "docs"]);
});

test("stops at the limit", () => {
  expect(addTags(["a"], "b, c, d", 3)).toEqual(["a", "b", "c"]);
});
