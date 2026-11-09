// DataTable's row logic: sorting that keeps ties in order and reads numbers in text, the header's sort cycle, and
// nested rows shown only under open rows.

import { expect, test } from "vitest";
import { nextSort, shownRows, sortRows } from "./rows";

interface Run {
  name: string;
  spend: number;
  steps?: Run[];
}

const runs: Run[] = [
  {
    name: "Run 10",
    spend: 4,
    steps: [
      { name: "Step 2", spend: 1 },
      { name: "Step 1", spend: 3 },
    ],
  },
  { name: "Run 9", spend: 4 },
  { name: "run 2", spend: 7 },
];

test("sorts by value, numbers inside text as numbers, ties kept in order", () => {
  expect(sortRows(runs, (run) => run.name, "asc").map((run) => run.name)).toEqual(["run 2", "Run 9", "Run 10"]);
  expect(sortRows(runs, (run) => run.spend, "desc").map((run) => run.name)).toEqual(["run 2", "Run 10", "Run 9"]);
});

test("a header click sorts ascending, then descending, then not at all", () => {
  const first = nextSort(null, "spend");
  expect(first).toEqual({ column: "spend", direction: "asc" });
  const second = nextSort(first, "spend");
  expect(second).toEqual({ column: "spend", direction: "desc" });
  expect(nextSort(second, "spend")).toBeNull();
  expect(nextSort(second, "name")).toEqual({ column: "name", direction: "asc" });
});

test("nested rows show only under open rows, sorted at their own level", () => {
  const order = (list: Run[]) => sortRows(list, (run) => run.name, "asc");
  const closed = shownRows(
    runs,
    (run) => run.name,
    new Set(),
    (run) => run.steps,
    order,
  );
  expect(closed.map((row) => row.key)).toEqual(["run 2", "Run 9", "Run 10"]);
  expect(closed[2]).toMatchObject({ hasChildren: true, open: false });
  const open = shownRows(
    runs,
    (run) => run.name,
    new Set(["Run 10"]),
    (run) => run.steps,
    order,
  );
  expect(open.map((row) => `${row.depth}:${row.key}`)).toEqual([
    "0:run 2",
    "0:Run 9",
    "0:Run 10",
    "1:Step 1",
    "1:Step 2",
  ]);
});
