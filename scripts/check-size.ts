// Size check: fails on source files over 1200 lines and warns over 1000 (.claude/rules/architecture/code-organization.md).

// ── Dependencies ──────────────────────────
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

// ── Constants ─────────────────────────────
const ROOTS = ["src", "lab", "scripts", "tests"];
const SOURCE = /\.(ts|tsx|css)$/;
const WARN_OVER = 1000;
const FAIL_OVER = 1200;

// ── Public API ────────────────────────────
/** What the size rule says about a file with this many lines. */
export function verdict(lines: number): "ok" | "warn" | "fail" {
  if (lines > FAIL_OVER) return "fail";
  return lines > WARN_OVER ? "warn" : "ok";
}

// ── Entry point ───────────────────────────
if (import.meta.main) {
  for (const root of ROOTS) {
    for (const file of readdirSync(root, { recursive: true, encoding: "utf8" })) {
      if (!SOURCE.test(file)) continue;
      const path = join(root, file);
      const lines = readFileSync(path, "utf8").split("\n").length;
      const result = verdict(lines);
      if (result === "ok") continue;
      console.log(`${result}  ${path} (${lines} lines)`);
      if (result === "fail") process.exitCode = 1;
    }
  }
}
