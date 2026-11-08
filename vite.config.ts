// Library build: src/index.ts → dist/. Dependencies and peers stay imports, so apps install them once.

import { readFileSync } from "node:fs";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

const pkg = JSON.parse(readFileSync("package.json", "utf8"));
const packages = Object.keys({ ...pkg.dependencies, ...pkg.peerDependencies });

export default defineConfig({
  plugins: [react()],
  build: {
    target: "es2022",
    lib: { entry: "src/index.ts", formats: ["es"], fileName: "index" },
    rollupOptions: {
      external: (id) => packages.some((name) => id === name || id.startsWith(`${name}/`)),
    },
  },
  test: { include: ["src/**/*.test.{ts,tsx}", "tests/**/*.test.ts"] },
});
