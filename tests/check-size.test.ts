import { expect, test } from "vitest";
import { verdict } from "../scripts/check-size";

test("size limits: ok up to 1000, warn to 1200, fail past it", () => {
  expect([1000, 1001, 1200, 1201].map(verdict)).toEqual(["ok", "warn", "warn", "fail"]);
});
