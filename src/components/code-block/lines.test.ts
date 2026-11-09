// CodeBlock's lines: any line ending splits, and a final newline adds no empty line.

import { expect, test } from "vitest";
import { linesOf } from "./lines";

test("splits on every kind of line ending, dropping the final empty line", () => {
  expect(linesOf("a\r\nb\rc\n")).toEqual(["a", "b", "c"]);
  expect(linesOf("a\n\nb")).toEqual(["a", "", "b"]);
  expect(linesOf("")).toEqual([""]);
});
