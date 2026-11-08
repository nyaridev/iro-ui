// Design Lab dev server: `pnpm lab`, http://localhost:4400.

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  root: import.meta.dirname,
  plugins: [react()],
  server: { port: 4400, strictPort: true },
});
