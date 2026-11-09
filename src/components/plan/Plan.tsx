// Plan: the steps the assistant means to take, ticked off as it goes: waiting, working (a spinner), done (a check) or
// failed. A count and a thin bar show how far along it is.

// ── Dependencies ──────────────────────────
import type { ReactNode } from "react";
import { ProgressBar } from "../progress-bar/ProgressBar";
import { cx } from "../shared/cx";
import { CheckGlyph, DangerGlyph } from "../shared/glyphs";
import { Spinner } from "../spinner/Spinner";

// ── Types ─────────────────────────────────
export interface PlanStep {
  id: string;
  label: ReactNode;
  status: "waiting" | "running" | "done" | "error";
  /** A line under the label: what came of it. */
  detail?: ReactNode;
}

export interface PlanProps {
  steps: PlanStep[];
  /** The heading (default "Plan"). */
  title?: ReactNode;
  /** The count's words (default "2 of 5 done"). */
  progressLabel?: (done: number, total: number) => string;
  className?: string;
}

// ── Private helpers ───────────────────────
function Mark({ status }: { status: PlanStep["status"] }) {
  if (status === "running") return <Spinner label="Working" />;
  if (status === "done") return <CheckGlyph />;
  if (status === "error") return <DangerGlyph />;
  return null;
}

// ── Public API ────────────────────────────
/** A checklist of the assistant's steps. */
export function Plan({
  steps,
  title = "Plan",
  progressLabel = (done, total) => `${done} of ${total} done`,
  className,
}: PlanProps) {
  const done = steps.filter((step) => step.status === "done").length;
  return (
    <section className={cx("iro-plan", className)}>
      <header className="iro-plan-head">
        <span className="iro-plan-title">{title}</span>
        <span className="iro-plan-count">{progressLabel(done, steps.length)}</span>
      </header>
      <ProgressBar size="sm" value={steps.length ? done / steps.length : 0} label={progressLabel(done, steps.length)} />
      <ol className="iro-plan-steps">
        {steps.map((step) => (
          <li key={step.id} data-status={step.status}>
            <span className="iro-plan-mark">
              <Mark status={step.status} />
            </span>
            <span className="iro-plan-text">
              <span className="iro-plan-label">{step.label}</span>
              {step.detail ? <span className="iro-plan-detail">{step.detail}</span> : null}
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}
