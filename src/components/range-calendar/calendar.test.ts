import { expect, test } from "vitest";
import { addDays, daysBetween, monthGrid, pickDay, shiftDay } from "./calendar";

test("day math crosses months and years", () => {
  expect(addDays("2026-12-30", 3)).toBe("2027-01-02");
  expect(daysBetween("2026-11-08", "2026-11-01")).toBe(-7);
});

test("monthGrid: six Monday-first weeks around the month", () => {
  const grid = monthGrid({ year: 2026, month: 10 });
  expect(grid).toHaveLength(42);
  // 1 November 2026 is a Sunday, so the grid starts on Monday 26 October.
  expect(grid[0]).toBe("2026-10-26");
  expect(grid[6]).toBe("2026-11-01");
});

test("shiftDay keeps the day, or the month's last day", () => {
  expect(shiftDay("2026-01-31", 1)).toBe("2026-02-28");
  expect(shiftDay("2026-03-15", -1)).toBe("2026-02-15");
});

test("pickDay: start, end in either order, then start again", () => {
  const started = pickDay({ from: "", to: "" }, "2026-11-10");
  expect(started).toEqual({ from: "2026-11-10", to: "" });
  expect(pickDay(started, "2026-11-03")).toEqual({ from: "2026-11-03", to: "2026-11-10" });
  expect(pickDay({ from: "2026-11-03", to: "2026-11-10" }, "2026-11-20")).toEqual({ from: "2026-11-20", to: "" });
});
