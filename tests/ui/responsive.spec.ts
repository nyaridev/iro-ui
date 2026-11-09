// Phone and tablet checks: every Lab page and template in each style's default theme at 320 and 768 px on a touch
// screen, overlays open in turn (ADR-0015).

import { test } from "@playwright/test";
import { hoverOnly, sideways } from "./measure/responsive";
import { runs, walk } from "./walk";

test.describe.configure({ mode: "parallel" });
test.use({ hasTouch: true });

for (const run of runs((style) => [style.base], { widths: [320, 768] })) {
  test(`responsive · ${run.title}`, async ({ page }, info) => {
    await walk(page, info, run, "responsive", [(page) => page.evaluate(sideways), (page) => page.evaluate(hoverOnly)]);
  });
}
