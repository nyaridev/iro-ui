// ColorPicker's color math: hex text is cleaned up, and HSV round-trips to the same hex.

import { expect, test } from "vitest";
import { hexToHsv, hsvToHex, normalizeHex } from "./color";

test("cleans up hex text and rejects what isn't hex", () => {
  expect(normalizeHex(" #ABC ")).toBe("#aabbcc");
  expect(normalizeHex("2a78d6")).toBe("#2a78d6");
  expect(normalizeHex("#12345")).toBeNull();
  expect(normalizeHex("blue")).toBeNull();
});

test("converts to HSV and back without drift", () => {
  expect(hexToHsv("#ff0000")).toEqual({ h: 0, s: 1, v: 1 });
  expect(hexToHsv("#808080")?.s).toBe(0);
  for (const hex of ["#2a78d6", "#eb6834", "#1baf7a", "#000000", "#ffffff"]) {
    const hsv = hexToHsv(hex);
    expect(hsv && hsvToHex(hsv)).toBe(hex);
  }
});
