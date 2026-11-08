// Screenshot and contrast tests (`pnpm test:visual`): Playwright opens the Design Lab in each style and theme.

import { defineConfig } from "@playwright/test";

const PORT = 4410;

export default defineConfig({
  testDir: "tests/visual",
  snapshotPathTemplate: "tests/visual/screenshots/{arg}{ext}",
  reporter: "list",
  use: { baseURL: `http://localhost:${PORT}`, viewport: { width: 1200, height: 900 } },
  expect: { toHaveScreenshot: { animations: "disabled", caret: "hide", maxDiffPixelRatio: 0.002 } },
  // Vite started directly (not through pnpm), so stopping the tests stops the server with it.
  webServer: {
    command: `node node_modules/vite/bin/vite.js --config lab/vite.config.ts --port ${PORT}`,
    url: `http://localhost:${PORT}`,
    reuseExistingServer: false,
  },
});
