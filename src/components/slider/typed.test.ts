import { expect, test } from "vitest";
import { parseTyped } from "./typed";

const CFG = { min: 1, max: 30, step: 0.5 };

test("parseTyped: snaps to the step, clamps, accepts a decimal comma", () => {
  expect(parseTyped("7.3", CFG)).toBe(7.5);
  expect(parseTyped("7,2", CFG)).toBe(7);
  expect(parseTyped(" 99 ", CFG)).toBe(30);
  expect(parseTyped("-4", CFG)).toBe(1);
  expect(parseTyped("0.3", { min: 0, max: 1, step: 0.1 })).toBe(0.3);
});

test("parseTyped: null for text that isn't a number", () => {
  expect(parseTyped("", CFG)).toBeNull();
  expect(parseTyped("abc", CFG)).toBeNull();
});
