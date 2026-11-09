// Library build: src/index.ts → dist/index.js, src/effects/ → dist/effects.js (ADR-0008), src/icons/ →
// dist/icons.js (ADR-0009). Dependencies and peers stay imports, so apps install them once.

import { readFileSync } from "node:fs";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

const pkg = JSON.parse(readFileSync("package.json", "utf8"));
const packages = Object.keys({ ...pkg.dependencies, ...pkg.peerDependencies });

export default defineConfig({
  plugins: [react()],
  build: {
    target: "es2022",
    lib: {
      entry: { index: "src/index.ts", effects: "src/effects/index.ts", icons: "src/icons/index.ts" },
      formats: ["es"],
    },
    rollupOptions: {
      external: (id) => packages.some((name) => id === name || id.startsWith(`${name}/`)),
    },
  },
  test: { include: ["src/**/*.test.{ts,tsx}", "tests/**/*.test.ts"] },
});
