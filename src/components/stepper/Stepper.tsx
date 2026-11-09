// Stepper: the steps of a longer task (set up, sign up, check out), with the ones done ticked, the current one in the
// accent and the rest waiting. Across for a few short steps, down for steps with more to say.

// ── Dependencies ──────────────────────────
import type { ComponentProps, ReactNode } from "react";
import { cx } from "../shared/cx";
import { CheckGlyph } from "../shared/glyphs";

// ── Types ─────────────────────────────────
export interface StepperStep {
  /** The step's name; unique within the stepper. */
  label: string;
  /** A line under the label. */
  description?: ReactNode;
}

export interface StepperProps extends Omit<ComponentProps<"ol">, "children"> {
  steps: StepperStep[];
  /** The step in progress, from 0; the ones before it are done, and `steps.length` means all are. */
  current: number;
  /** `horizontal` (default) or `vertical`. */
  orientation?: "horizontal" | "vertical";
  /** Makes the finished steps buttons, to go back to one. */
  onStepClick?: (index: number) => void;
}

// ── Public API ────────────────────────────
/** Numbered steps, marked done, current or waiting. */
export function Stepper({ steps, current, orientation = "horizontal", onStepClick, className, ...rest }: StepperProps) {
  return (
    <ol data-orientation={orientation} className={cx("iro-stepper", className)} {...rest}>
      {steps.map(({ label, description }, index) => {
        const state = index < current ? "done" : index === current ? "current" : "waiting";
        const head = (
          <>
            <span className="iro-stepper-marker" aria-hidden="true">
              {state === "done" ? <CheckGlyph /> : index + 1}
            </span>
            <span className="iro-stepper-text">
              <span className="iro-stepper-label">{label}</span>
              {description ? <span className="iro-stepper-description">{description}</span> : null}
            </span>
          </>
        );
        return (
          <li key={label} data-state={state} aria-current={state === "current" ? "step" : undefined}>
            {state === "done" && onStepClick ? (
              <button type="button" className="iro-stepper-step" onClick={() => onStepClick(index)}>
                {head}
              </button>
            ) : (
              <span className="iro-stepper-step">{head}</span>
            )}
          </li>
        );
      })}
    </ol>
  );
}
