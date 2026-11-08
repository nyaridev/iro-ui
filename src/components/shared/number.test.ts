import { expect, test } from "vitest";
import { parseTyped, snapToStep } from "./number";

const RANGE = { min: 1, max: 30, step: 0.5 };

test("parseTyped: snaps to the step, clamps, accepts a decimal comma", () => {
  expect(parseTyped("7.3", RANGE)).toBe(7.5);
  expect(parseTyped("7,2", RANGE)).toBe(7);
  expect(parseTyped(" 99 ", RANGE)).toBe(30);
  expect(parseTyped("-4", RANGE)).toBe(1);
  expect(parseTyped("0.3", { min: 0, max: 1, step: 0.1 })).toBe(0.3);
});

test("parseTyped: null for text that isn't a number", () => {
  expect(parseTyped("", RANGE)).toBeNull();
  expect(parseTyped("abc", RANGE)).toBeNull();
});

test("snapToStep: snaps from min, clamps, keeps the step's decimals", () => {
  expect(snapToStep(7.74, RANGE)).toBe(7.5);
  expect(snapToStep(0.1 + 0.2, { min: 0, max: 1, step: 0.1 })).toBe(0.3);
  expect(snapToStep(-3, { min: -2, max: 2, step: 1 })).toBe(-2);
});
