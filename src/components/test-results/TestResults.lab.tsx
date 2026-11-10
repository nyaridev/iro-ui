// Lab page: TestResults with a failing suite open, and a run where everything passed.

import { TestResults, type TestSuite } from "./TestResults";

const RUN: TestSuite[] = [
  {
    name: "src/cart.test.ts",
    tests: [
      { name: "adds an item", status: "passed", duration: 4 },
      { name: "merges the same item", status: "passed", duration: 3 },
      { name: "applies a discount code", status: "passed", duration: 6 },
    ],
  },
  {
    name: "src/export.test.ts",
    tests: [
      {
        name: "writes a CSV header",
        status: "failed",
        duration: 12,
        error: 'Expected: "name,price"\nReceived: "name"',
      },
      { name: "quotes commas", status: "passed", duration: 2 },
      { name: "exports to PDF", status: "skipped" },
    ],
  },
  {
    name: "src/search.test.ts",
    tests: [
      { name: "matches words in any order", status: "passed", duration: 31 },
      { name: "ranks titles first", status: "running" },
    ],
  },
];

const GREEN: TestSuite[] = [
  {
    name: "src/price.test.ts",
    tests: [
      { name: "rounds half up", status: "passed", duration: 1 },
      { name: "formats currency", status: "passed", duration: 2 },
    ],
  },
];

export default function TestResultsLab() {
  return (
    <div className="lab-stack" style={{ maxWidth: 560 }}>
      <h3>With a failure</h3>
      <TestResults title="Unit tests" suites={RUN} className="lab-fill" />
      <h3>All passed</h3>
      <TestResults suites={GREEN} className="lab-fill" />
    </div>
  );
}
