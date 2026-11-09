// New variable names: empty, malformed and taken ones are refused.

import { expect, test } from "vitest";
import { nameProblem } from "./names";

test("takes letters, digits and underscores", () => {
  expect(nameProblem("API_URL", ["PORT"])).toBeNull();
  expect(nameProblem("_private2", [])).toBeNull();
});

test("refuses empty, malformed and taken names", () => {
  expect(nameProblem("", [])).toBe("Enter a name.");
  expect(nameProblem("2FA_KEY", [])).toMatch(/not starting with a digit/);
  expect(nameProblem("API-URL", [])).toMatch(/letters, digits and _/);
  expect(nameProblem("MY VAR", [])).toMatch(/letters, digits and _/);
  expect(nameProblem("PORT", ["PORT"])).toBe("PORT is already set.");
});
