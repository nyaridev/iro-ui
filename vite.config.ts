// Library build: src/index.ts → dist/, React left to the app.

import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  build: {
    target: "es2022",
    lib: { entry: "src/index.ts", formats: ["es"], fileName: "index" },
    rollupOptions: { external: [/^react($|\/)/, /^react-dom($|\/)/] },
  },
  test: { include: ["src/**/*.test.{ts,tsx}", "tests/**/*.test.ts"] },
});
