// Shared steps for the visual tests: open a Lab view and read which styles, themes and accents exist.

import type { Page } from "@playwright/test";

/** Opens the Lab in this look and view and waits for its first column and fonts, so text is measured and drawn in the
 *  final font. */
export async function openLab(
  page: Page,
  look: { style?: string; theme?: string; accent?: string; motion?: string; view?: "components" | "templates" },
) {
  const query = new URLSearchParams(Object.entries(look).filter(([, value]) => value) as [string, string][]);
  await page.goto(`/?${query}`);
  await page.locator(".lab-column").first().waitFor();
  await page.evaluate(() => document.fonts.ready.then(() => undefined));
}

/** The options of the first column's picker (0 style, 1 theme, 2 accent), read from its open list. */
export async function pickerOptions(page: Page, index: 0 | 1 | 2): Promise<string[]> {
  await page.locator(".lab-picker").nth(index).locator(".iro-select-icon").click();
  const options = page.locator(".iro-popup .iro-option-label");
  await options.first().waitFor();
  const values = await options.allTextContents();
  await page.keyboard.press("Escape");
  await page.locator(".iro-popup").waitFor({ state: "detached" });
  return values;
}

/** Shows one page of the current view (`Tokens`, `Button`, `Sign in`…) through its sidebar button, which works while the sidebar is hidden. */
export async function showPage(page: Page, name: string) {
  await page.locator(".lab-nav").getByRole("button", { name, exact: true, includeHidden: true }).dispatchEvent("click");
}

/** The names of the current view's pages, in sidebar order. */
export async function pageNames(page: Page): Promise<string[]> {
  return page.locator(".lab-nav-item").allTextContents();
}
