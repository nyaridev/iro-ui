// EnvironmentVariables: a project's settings as NAME = value rows. Secret values show as dots until revealed, one row
// at a time or all at once, and every value can be copied. With `onChange` it's also the editor: values become
// fields, rows can be removed, and a row at the end adds a variable once its name checks out.

// ── Dependencies ──────────────────────────
import { type KeyboardEvent, type ReactNode, useState } from "react";
import { Button } from "../button/Button";
import { Checkbox } from "../checkbox/Checkbox";
import { CopyButton } from "../copy-button/CopyButton";
import { IconButton } from "../icon-button/IconButton";
import { cx } from "../shared/cx";
import { EyeGlyph, EyeOffGlyph, TrashGlyph } from "../shared/glyphs";
import { Switch } from "../switch/Switch";
import { TextField } from "../text-field/TextField";
import { nameProblem } from "./names";

// ── Constants ─────────────────────────────
/** Masks are a fixed length, so they don't give away a secret's length. */
const MASK = "•".repeat(12);

// ── Types ─────────────────────────────────
export interface EnvVariable {
  /** Unique within the list. */
  name: string;
  value: string;
  /** Hidden until revealed. */
  secret?: boolean;
}

export interface EnvironmentVariablesProps {
  variables: EnvVariable[];
  /** Makes it an editor: called with the whole list after each change. */
  onChange?: (variables: EnvVariable[]) => void;
  /** Over the rows: "Production", a file name. */
  title?: ReactNode;
  /** The reveal-all switch's label (default "Show values"). */
  revealLabel?: string;
  className?: string;
}

// ── Private helpers ───────────────────────
/** The row that adds a variable: name, value, secret, Add. Not a form, so it can sit inside the app's own. */
function AddRow({ taken, onAdd }: { taken: string[]; onAdd: (variable: EnvVariable) => void }) {
  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const [secret, setSecret] = useState(false);
  const [problem, setProblem] = useState<string | null>(null);
  const add = () => {
    const found = nameProblem(name.trim(), taken);
    setProblem(found);
    if (found) return;
    onAdd({ name: name.trim(), value, secret });
    setName("");
    setValue("");
    setSecret(false);
  };
  const onEnter = (event: KeyboardEvent) => {
    if (event.key === "Enter") add();
  };

  return (
    <div className="iro-env-vars-add">
      <TextField
        size="sm"
        aria-label="New variable name"
        placeholder="NAME"
        value={name}
        invalid={Boolean(problem)}
        spellCheck={false}
        onChange={(event) => setName(event.currentTarget.value)}
        onKeyDown={onEnter}
      />
      <TextField
        size="sm"
        aria-label="New variable value"
        placeholder="value"
        type={secret ? "password" : "text"}
        autoComplete="off"
        value={value}
        onChange={(event) => setValue(event.currentTarget.value)}
        onKeyDown={onEnter}
      />
      <Checkbox label="Secret" checked={secret} onCheckedChange={setSecret} />
      <Button size="sm" onClick={add}>
        Add
      </Button>
      {problem ? (
        <p className="iro-env-vars-problem" role="alert">
          {problem}
        </p>
      ) : null}
    </div>
  );
}

// ── Public API ────────────────────────────
/** Name and value rows with masked secrets; an editor with `onChange`. */
export function EnvironmentVariables({
  variables,
  onChange,
  title,
  revealLabel = "Show values",
  className,
}: EnvironmentVariablesProps) {
  const [all, setAll] = useState(false);
  const [shown, setShown] = useState<string[]>([]);
  const secrets = variables.some((variable) => variable.secret);
  const setValue = (name: string, value: string) =>
    onChange?.(variables.map((variable) => (variable.name === name ? { ...variable, value } : variable)));

  return (
    <section data-editable={onChange ? true : undefined} className={cx("iro-env-vars", className)}>
      {title || secrets ? (
        <header className="iro-env-vars-head">
          {title ? <span className="iro-env-vars-title">{title}</span> : null}
          {secrets ? <Switch size="sm" label={revealLabel} checked={all} onCheckedChange={setAll} /> : null}
        </header>
      ) : null}
      <dl className="iro-env-vars-list">
        {variables.map(({ name, value, secret }) => {
          const hidden = secret && !all && !shown.includes(name);
          const reveal =
            secret && !all ? (
              <IconButton
                size="sm"
                icon={hidden ? <EyeGlyph /> : <EyeOffGlyph />}
                label={`${hidden ? "Show" : "Hide"} ${name}`}
                onClick={() => setShown(hidden ? [...shown, name] : shown.filter((item) => item !== name))}
              />
            ) : null;
          return (
            <div key={name} className="iro-env-var">
              <dt className="iro-env-var-name">{name}</dt>
              <dd className="iro-env-var-value" data-hidden={hidden || undefined}>
                {onChange ? (
                  <TextField
                    size="sm"
                    aria-label={`Value of ${name}`}
                    type={hidden ? "password" : "text"}
                    autoComplete="off"
                    spellCheck={false}
                    value={value}
                    end={reveal}
                    onChange={(event) => setValue(name, event.currentTarget.value)}
                  />
                ) : (
                  <>
                    <span>{hidden ? MASK : value}</span>
                    {reveal}
                  </>
                )}
                <CopyButton text={value} label={`Copy ${name}`} />
                {onChange ? (
                  <IconButton
                    size="sm"
                    icon={<TrashGlyph />}
                    label={`Remove ${name}`}
                    onClick={() => onChange(variables.filter((variable) => variable.name !== name))}
                  />
                ) : null}
              </dd>
            </div>
          );
        })}
      </dl>
      {onChange ? (
        <AddRow
          taken={variables.map((variable) => variable.name)}
          onAdd={(variable) => onChange([...variables, variable])}
        />
      ) : null}
    </section>
  );
}
