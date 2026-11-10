// Deploys template data: recent deployments, the build's steps and log, test runs and the environment.

// ── Dependencies ──────────────────────────
import type { CommitFile, EnvVariable, TerminalLine, TestSuite } from "../../../src";

// ── Constants ─────────────────────────────
// Steps and log.
export const STEPS = [
  { title: "Install", description: "pnpm install --frozen-lockfile", time: "14 s" },
  { title: "Build", description: "pnpm build", time: "38 s" },
  { title: "Test", description: "pnpm test", time: "21 s" },
  { title: "Deploy", description: "Upload to 3 regions", time: "9 s" },
];

/** The build's log, line by line; `step` is the step a line belongs to. */
export const SCRIPT: { step: number; line: TerminalLine }[] = [
  { step: 0, line: { text: "pnpm install --frozen-lockfile", kind: "command" } },
  { step: 0, line: "Lockfile is up to date, resolution step is skipped" },
  { step: 0, line: "Packages: +612" },
  { step: 0, line: { text: "Done in 13.8s", kind: "muted" } },
  { step: 1, line: { text: "pnpm build", kind: "command" } },
  { step: 1, line: "vite v8.3.6 building for production..." },
  { step: 1, line: "✓ 1,284 modules transformed." },
  { step: 1, line: "dist/index.html          0.62 kB" },
  { step: 1, line: "dist/assets/index.js   214.40 kB │ gzip: 68.12 kB" },
  { step: 1, line: { text: "✓ built in 37.9s", kind: "success" } },
  { step: 2, line: { text: "pnpm test", kind: "command" } },
  { step: 2, line: " ✓ src/export.test.ts (12 tests)" },
  { step: 2, line: " ✓ src/import.test.ts (9 tests)" },
  { step: 2, line: " ✓ src/billing.test.ts (7 tests)" },
  { step: 2, line: { text: "Tests  28 passed (28)", kind: "success" } },
  { step: 3, line: { text: "Uploading build output", kind: "command" } },
  { step: 3, line: "fra1 ✓  iad1 ✓  sin1 ✓" },
  { step: 3, line: { text: "Ready at https://harbor-web.example.com", kind: "success" } },
];

const fullLog = SCRIPT.map(({ line }) => line);

const failedLog: TerminalLine[] = [
  ...SCRIPT.filter(({ step }) => step < 2).map(({ line }) => line),
  { text: "pnpm test", kind: "command" },
  " ✓ src/import.test.ts (9 tests)",
  " ✓ src/billing.test.ts (7 tests)",
  { text: " ✗ src/export.test.ts (1 failed, 11 passed)", kind: "error" },
  { text: "AssertionError: expected 3 rows, got 4", kind: "error" },
  { text: "Tests  1 failed | 27 passed (28)", kind: "error" },
  { text: "Error: Command failed with exit code 1", kind: "error" },
];

// Deployments.
const FILES: CommitFile[] = [
  { path: "src/export.ts", additions: 14, deletions: 3, status: "modified" },
  { path: "src/export.test.ts", additions: 32, deletions: 0, status: "modified" },
];

export const DEPLOYMENTS: Deployment[] = [
  {
    id: "418",
    branch: "main",
    env: "Production",
    status: "ready",
    done: 4,
    log: fullLog,
    time: "4 min ago",
    duration: "1m 22s",
    commit: {
      hash: "4f2a91c8e1d07b3a",
      message:
        "Skip empty rows in CSV export\n\nRows with no values are no longer written, and a test covers blank lines.",
      author: "Maya Chen",
      date: "6 min ago",
      files: FILES,
    },
  },
  {
    id: "417",
    branch: "fix/export-rows",
    env: "Preview",
    status: "failed",
    done: 2,
    log: failedLog,
    time: "32 min ago",
    duration: "1m 04s",
    commit: {
      hash: "b81c03fa92e4d615",
      message: "Drop blank rows before writing",
      author: "Maya Chen",
      date: "35 min ago",
      files: FILES.slice(0, 1),
    },
  },
  {
    id: "416",
    branch: "main",
    env: "Production",
    status: "ready",
    done: 4,
    log: fullLog,
    time: "Yesterday",
    duration: "1m 19s",
    commit: {
      hash: "9d7e1b2c55a0f843",
      message: "Add billing page",
      author: "Leo Park",
      date: "Yesterday",
      files: [{ path: "src/billing.tsx", additions: 186, deletions: 0, status: "added" }],
    },
  },
  {
    id: "415",
    branch: "feat/dark-mode",
    env: "Preview",
    status: "canceled",
    done: 1,
    log: [...fullLog.slice(0, 6), { text: "Canceled by Sara Novak", kind: "muted" }],
    time: "Mon",
    commit: {
      hash: "e3f40a6b7c1d92e0",
      message: "Try a darker sidebar",
      author: "Sara Novak",
      date: "Mon",
      files: [{ path: "src/theme.css", additions: 12, deletions: 9, status: "modified" }],
    },
  },
];

// Tests.
const TRACE = `AssertionError: expected 3 rows, got 4
    at Object.<anonymous> (src/export.test.ts:48:23)
    at writeRows (src/export.ts:42:10)
    at runTest (node_modules/vitest/dist/runner.js:812:15)
    at processTicksAndRejections (node:internal/process/task_queues:95:5)`;

const passing = (name: string, names: string[]): TestSuite => ({
  name,
  tests: names.map((test, index) => ({ name: test, status: "passed", duration: 4 + index * 7 })),
});

export const PASSED_SUITES: TestSuite[] = [
  passing("src/export.test.ts", ["writes a header row", "quotes fields with commas", "skips rows with no values"]),
  passing("src/import.test.ts", ["reads UTF-8 with a BOM", "keeps leading zeros"]),
  passing("src/billing.test.ts", ["rounds to cents", "adds tax by region"]),
];

export const FAILED_SUITES: TestSuite[] = [
  {
    name: "src/export.test.ts",
    tests: [
      { name: "writes a header row", status: "passed", duration: 4 },
      { name: "quotes fields with commas", status: "passed", duration: 6 },
      { name: "skips rows with no values", status: "failed", duration: 12, error: TRACE },
    ],
  },
  ...PASSED_SUITES.slice(1),
];

// Environment.
export const VARIABLES: EnvVariable[] = [
  { name: "NODE_ENV", value: "production" },
  { name: "API_URL", value: "https://api.example.com" },
  { name: "DATABASE_URL", value: "postgres://harbor:example@db.example.com:5432/harbor", secret: true },
  { name: "STRIPE_KEY", value: "sk_test_example_000000", secret: true },
];

// ── Types ─────────────────────────────────
export type DeployStatus = "ready" | "failed" | "building" | "canceled";

export interface Deployment {
  id: string;
  branch: string;
  env: "Production" | "Preview";
  status: DeployStatus;
  /** How many of STEPS have finished. */
  done: number;
  log: TerminalLine[];
  time: string;
  duration?: string;
  commit: { hash: string; message: string; author: string; date: string; files: CommitFile[] };
}
