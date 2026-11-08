// Shared steps for the visual tests: open a Lab view and read which styles, themes and accents exist.

import type { Page } from "@playwright/test";

/** Opens the Lab in this look and waits for its fonts, so text is measured and drawn in the final font. */
export async function openLab(page: Page, look: { style?: string; theme?: string; accent?: string }) {
  const query = new URLSearchParams(Object.entries(look).filter(([, value]) => value) as [string, string][]);
  await page.goto(`/?${query}`);
  await page.evaluate(() => document.fonts.ready.then(() => undefined));
}

/** The options of the Lab bar's picker: 0 style, 1 theme, 2 accent. */
export async function pickerOptions(page: Page, index: 0 | 1 | 2): Promise<string[]> {
  return page.locator(".lab-bar select").nth(index).locator("option").allTextContents();
}
