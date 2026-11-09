// Questionnaire: the assistant asks the reader a few questions before it goes on, each with choices (one or several)
// and, where it helps, an "Other" with a field for their own answer. Send waits until each question is answered.

// ── Dependencies ──────────────────────────
import { type FormEvent, type ReactNode, useState } from "react";
import { Button } from "../button/Button";
import { Checkbox } from "../checkbox/Checkbox";
import { RadioGroup } from "../radio-group/RadioGroup";
import { cx } from "../shared/cx";
import { TextField } from "../text-field/TextField";
import { collectAnswers, isComplete, OTHER } from "./answers";

// ── Types ─────────────────────────────────
export interface QuestionOption {
  value: string;
  label: string;
  description?: ReactNode;
}

export interface Question {
  id: string;
  question: ReactNode;
  options: QuestionOption[];
  /** Lets the reader pick several. */
  multiple?: boolean;
  /** Adds an "Other" choice with a field. */
  other?: boolean;
}

export interface QuestionnaireProps {
  questions: Question[];
  /** Each question's picks by id; "Other" arrives as the typed text. */
  onSubmit: (answers: Record<string, string[]>) => void;
  /** Adds a Skip button that calls this. */
  onSkip?: () => void;
  submitLabel?: string;
  skipLabel?: string;
  otherLabel?: string;
  className?: string;
}

// ── Public API ────────────────────────────
/** A short form of questions with choices. */
export function Questionnaire({
  questions,
  onSubmit,
  onSkip,
  submitLabel = "Send answers",
  skipLabel = "Skip",
  otherLabel = "Other",
  className,
}: QuestionnaireProps) {
  const [picked, setPicked] = useState<Record<string, string[]>>({});
  const [others, setOthers] = useState<Record<string, string>>({});
  const ready = isComplete(
    questions.map(({ id }) => id),
    picked,
    others,
  );

  const pick = (id: string, values: string[]) => setPicked({ ...picked, [id]: values });
  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (ready) onSubmit(collectAnswers(picked, others));
  };

  return (
    <form className={cx("iro-questionnaire", className)} onSubmit={submit}>
      {questions.map((question) => {
        const options = question.other ? [...question.options, { value: OTHER, label: otherLabel }] : question.options;
        const values = picked[question.id] ?? [];
        return (
          <fieldset key={question.id} className="iro-questionnaire-question">
            <legend className="iro-questionnaire-legend">{question.question}</legend>
            {question.multiple ? (
              <div className="iro-questionnaire-choices">
                {options.map((option) => (
                  <Checkbox
                    key={option.value}
                    label={option.label}
                    description={"description" in option ? option.description : undefined}
                    checked={values.includes(option.value)}
                    onCheckedChange={(on) =>
                      pick(
                        question.id,
                        on ? [...values, option.value] : values.filter((value) => value !== option.value),
                      )
                    }
                  />
                ))}
              </div>
            ) : (
              <RadioGroup
                value={values[0] ?? ""}
                onValueChange={(value) => pick(question.id, [value])}
                options={options}
              />
            )}
            {values.includes(OTHER) ? (
              <TextField
                size="sm"
                aria-label={otherLabel}
                placeholder="Your answer"
                value={others[question.id] ?? ""}
                onChange={(event) => setOthers({ ...others, [question.id]: event.currentTarget.value })}
                className="iro-questionnaire-other"
              />
            ) : null}
          </fieldset>
        );
      })}
      <div className="iro-questionnaire-actions">
        {onSkip ? (
          <Button size="sm" variant="ghost" onClick={onSkip}>
            {skipLabel}
          </Button>
        ) : null}
        <Button size="sm" type="submit" variant="primary" disabled={!ready}>
          {submitLabel}
        </Button>
      </div>
    </form>
  );
}
