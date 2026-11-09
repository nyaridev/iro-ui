// The chart helpers: clean tick ranges, compact tick labels, series colors, smooth lines that don't overshoot, gaps.

import { describe, expect, test } from "vitest";
import { barPath, linePath, runs } from "./paths";
import { niceScale, percent, seriesColor, tickFormat } from "./scale";

describe("niceScale", () => {
  test("rounds out to clean steps", () => {
    expect(niceScale(0, 87)).toEqual({ min: 0, max: 100, ticks: [0, 25, 50, 75, 100] });
    expect(niceScale(0, 0.3)).toEqual({ min: 0, max: 0.3, ticks: [0, 0.1, 0.2, 0.3] });
    expect(niceScale(-12, 40).ticks).toEqual([-20, 0, 20, 40]);
  });

  test("an empty or flat range still has ticks", () => {
    expect(niceScale(0, 0).ticks.length).toBeGreaterThan(1);
  });
});

test("ticks turn compact once the axis reaches 10,000", () => {
  expect(tickFormat(niceScale(0, 900))(500)).toBe("500");
  expect(tickFormat(niceScale(0, 18_240))(15_000)).toBe("15K");
});

test("series take the chart tokens in order, then grey; their own color wins", () => {
  expect(seriesColor(0)).toBe("var(--iro-chart-1)");
  expect(seriesColor(8)).toBe("var(--iro-fg-4)");
  expect(seriesColor(2, "red")).toBe("red");
});

test("a smooth line stays inside its points' range", () => {
  const path = linePath(
    [
      [0, 10],
      [10, 0],
      [20, 0],
      [30, 10],
    ],
    true,
  );
  const ys = [...path.matchAll(/-?[\d.]+,(-?[\d.]+)/g)].map((match) => Number(match[1]));
  expect(Math.min(...ys)).toBeGreaterThanOrEqual(0);
  expect(Math.max(...ys)).toBeLessThanOrEqual(10);
});

test("a null value breaks a line into runs", () => {
  expect(runs([[0, 1], null, [2, 3], [3, 4]])).toEqual([
    [[0, 1]],
    [
      [2, 3],
      [3, 4],
    ],
  ]);
});

test("a bar's rounding never exceeds half its size", () => {
  expect(barPath(0, 0, 4, 100, 4, "top")).toContain("A2,2");
});

test("a sliver's share reads <1%, not 0%", () => {
  expect(percent(3 / 928)).toBe("<1%");
  expect(percent(0)).toBe("0%");
  expect(percent(0.234)).toBe("23%");
});
