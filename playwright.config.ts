// Playwright opens the Design Lab in each style and theme. Two kinds of runs share it: `visual` (screenshots and token
// contrast, `pnpm test:visual`) and `ui` (the UI checks, ADR-0015: `pnpm check:ui`, and in Firefox and WebKit
// `pnpm check:ui:browsers`).

import { defineConfig, devices } from "@playwright/test";

const PORT = 4410;
const VIEWPORT = { width: 1200, height: 900 };

export default defineConfig({
  snapshotPathTemplate: "tests/visual/screenshots/{arg}{ext}",
  reporter: [["list"], ["html", { open: "never" }]],
  use: { baseURL: `http://localhost:${PORT}`, viewport: VIEWPORT },
  expect: { toHaveScreenshot: { animations: "disabled", caret: "hide", maxDiffPixels: 20 } },
  projects: [
    { name: "visual", testDir: "tests/visual" },
    { name: "ui", testDir: "tests/ui" },
    { name: "ui-firefox", testDir: "tests/ui", use: { ...devices["Desktop Firefox"], viewport: VIEWPORT } },
    { name: "ui-webkit", testDir: "tests/ui", use: { ...devices["Desktop Safari"], viewport: VIEWPORT } },
  ],
  // Vite started directly (not through pnpm), so stopping the tests stops the server with it.
  webServer: {
    command: `node node_modules/vite/bin/vite.js --config lab/vite.config.ts --port ${PORT}`,
    url: `http://localhost:${PORT}`,
    reuseExistingServer: false,
  },
});
