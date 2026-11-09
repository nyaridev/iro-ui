// Layout checks: every Lab page and template in each style's default theme, overlays open in turn (ADR-0015).

import { test } from "@playwright/test";
import { centering, endGaps, nearAlign, overflow } from "./measure/layout";
import { runs, walk } from "./walk";

test.describe.configure({ mode: "parallel" });

for (const run of runs((style) => [style.base])) {
  test(`layout · ${run.title}`, async ({ page }, info) => {
    await walk(page, info, run, "layout", [
      (page) => page.evaluate(endGaps),
      (page) => page.evaluate(centering),
      (page) => page.evaluate(overflow),
      (page) => page.evaluate(nearAlign),
    ]);
  });
}
