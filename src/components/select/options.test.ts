import { expect, test } from "vitest";
import { groupOptions, matchesAllWords } from "./options";

test("matchesAllWords: every word, any order and case", () => {
  expect(matchesAllWords("Wan Video 2.2 T2V-A14B", "wan 2.2")).toBe(true);
  expect(matchesAllWords("Wan Video 2.2 T2V-A14B", "2.2   WAN")).toBe(true);
  expect(matchesAllWords("Wan Video 2.2 T2V-A14B", "wan 2.1")).toBe(false);
  expect(matchesAllWords("Anything", "")).toBe(true);
});

test("groupOptions: null without groups, else grouped in order of first appearance", () => {
  expect(groupOptions([{ value: "a", label: "A" }])).toBeNull();
  const groups = groupOptions([
    { value: "sdxl", label: "SDXL", group: "Image" },
    { value: "wan", label: "Wan", group: "Video" },
    { value: "flux", label: "Flux", group: "Image" },
  ]);
  expect(groups?.map((group) => [group.value, group.items.map((item) => item.value)])).toEqual([
    ["Image", ["sdxl", "flux"]],
    ["Video", ["wan"]],
  ]);
});
