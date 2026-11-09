// Questionnaire's answers: "Other" counts only with text, and becomes that text when sent.

import { expect, test } from "vitest";
import { collectAnswers, isComplete, OTHER } from "./answers";

test("a question is answered once something is picked, and Other only with text", () => {
  expect(isComplete(["a", "b"], { a: ["x"] }, {})).toBe(false);
  expect(isComplete(["a"], { a: [OTHER] }, { a: "  " })).toBe(false);
  expect(isComplete(["a"], { a: [OTHER] }, { a: "mine" })).toBe(true);
});

test("Other is sent as its text", () => {
  expect(collectAnswers({ a: ["x", OTHER], b: ["y"] }, { a: " mine " })).toEqual({ a: ["x", "mine"], b: ["y"] });
});
