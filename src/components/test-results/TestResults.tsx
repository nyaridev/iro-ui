// TestResults: a test run at a glance: counts of passed, failed and skipped tests over a bar split the same way, then
// each suite folded under its name, with failing suites open and each failure's error under its test.

// ── Dependencies ──────────────────────────
import { Collapsible as BaseCollapsible } from "@base-ui/react/collapsible";
import type { ReactNode } from "react";
import { cx } from "../shared/cx";
import { ChevronDownGlyph, DangerGlyph, MinusGlyph, SuccessGlyph } from "../shared/glyphs";
import { Spinner } from "../spinner/Spinner";

// ── Constants ─────────────────────────────
const STATUSES = {
  passed: { label: "Passed", icon: <SuccessGlyph /> },
  failed: { label: "Failed", icon: <DangerGlyph /> },
  skipped: { label: "Skipped", icon: <MinusGlyph /> },
  running: { label: "Running", icon: <Spinner /> },
};

const COUNTED = ["passed", "failed", "skipped"] as const;

// ── Types ─────────────────────────────────
export type TestStatus = keyof typeof STATUSES;

export interface TestCase {
  name: string;
  status: TestStatus;
  /** In milliseconds. */
  duration?: number;
  /** What went wrong: a message, a StackTrace, a diff. */
  error?: ReactNode;
}

export interface TestSuite {
  /** A file or a describe block; unique within the run. */
  name: string;
  tests: TestCase[];
}

export interface TestResultsProps {
  suites: TestSuite[];
  /** Over the counts: "Unit tests", a run's name. */
  title?: ReactNode;
  className?: string;
}

// ── Private helpers ───────────────────────
const durationText = (ms: number) => (ms < 1000 ? `${Math.round(ms)} ms` : `${(ms / 1000).toFixed(1)} s`);

// ── Public API ────────────────────────────
/** A test run's counts and its suites, failures open. */
export function TestResults({ suites, title, className }: TestResultsProps) {
  const tests = suites.flatMap((suite) => suite.tests);
  const counts = Object.fromEntries(
    COUNTED.map((status) => [status, tests.filter((test) => test.status === status).length]),
  ) as Record<(typeof COUNTED)[number], number>;
  const total = tests.reduce((sum, test) => sum + (test.duration ?? 0), 0);

  return (
    <section className={cx("iro-test-results", className)}>
      <header className="iro-test-results-head">
        {title ? <span className="iro-test-results-title">{title}</span> : null}
        <span className="iro-test-results-counts">
          {COUNTED.map((status) =>
            counts[status] > 0 ? (
              <span key={status} data-status={status} className="iro-test-results-count">
                {counts[status]} {status}
              </span>
            ) : null,
          )}
        </span>
        {total > 0 ? <span className="iro-test-results-time">{durationText(total)}</span> : null}
      </header>
      <div className="iro-test-results-bar" aria-hidden="true">
        {COUNTED.map((status) =>
          counts[status] > 0 ? <span key={status} data-status={status} style={{ flexGrow: counts[status] }} /> : null,
        )}
      </div>
      {suites.map((suite) => {
        const failing = suite.tests.some((test) => test.status === "failed");
        return (
          <BaseCollapsible.Root
            key={suite.name}
            defaultOpen={failing}
            data-failing={failing || undefined}
            className="iro-test-suite"
          >
            <BaseCollapsible.Trigger className="iro-test-suite-trigger">
              <ChevronDownGlyph />
              <span className="iro-test-suite-name">{suite.name}</span>
              <span className="iro-test-suite-tally">
                {suite.tests.filter((test) => test.status === "passed").length}/{suite.tests.length}
              </span>
            </BaseCollapsible.Trigger>
            <BaseCollapsible.Panel className="iro-test-suite-panel">
              <ul className="iro-test-suite-tests">
                {suite.tests.map((test) => (
                  <li key={test.name} data-status={test.status} className="iro-test-case">
                    <span className="iro-test-case-row">
                      <span className="iro-test-case-icon" role="img" aria-label={STATUSES[test.status].label}>
                        {STATUSES[test.status].icon}
                      </span>
                      <span className="iro-test-case-name">{test.name}</span>
                      {test.duration !== undefined ? (
                        <span className="iro-test-case-time">{durationText(test.duration)}</span>
                      ) : null}
                    </span>
                    {test.error ? <div className="iro-test-case-error">{test.error}</div> : null}
                  </li>
                ))}
              </ul>
            </BaseCollapsible.Panel>
          </BaseCollapsible.Root>
        );
      })}
    </section>
  );
}
