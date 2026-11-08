// Screenshot tests: every Lab page in each style's default and light themes, and the Tokens page in every other theme
// (themes only change colors, which the Tokens page shows). A change that isn't meant shows up as a diff.
// After a change that is meant: `pnpm test:visual --update-snapshots`, then look at the new images before committing.

import { expect, test } from "@playwright/test";
import { openLab, pickerOptions } from "./lab";

const EVERY_PAGE = new Set(["default", "light"]);

test("every page in every style", async ({ page }) => {
  test.setTimeout(240_000);
  await openLab(page, {});
  for (const style of await pickerOptions(page, 0)) {
    await openLab(page, { style });
    for (const theme of await pickerOptions(page, 1)) {
      await openLab(page, { style, theme });
      const names = await page.locator(".lab-page > h2").allTextContents();
      for (const [index, name] of names.entries()) {
        if (!EVERY_PAGE.has(theme) && name !== "Tokens") continue;
        await expect.soft(page.locator(".lab-page").nth(index)).toHaveScreenshot(`${style}-${theme}-${name}.png`);
      }
    }
  }
});
