// EnvironmentVariables: a project's settings as NAME = value rows. Secret values show as dots until revealed, one row
// at a time or all at once, and every value can be copied. It only shows them; editing stays the app's form.

// ── Dependencies ──────────────────────────
import { type ReactNode, useState } from "react";
import { CopyButton } from "../copy-button/CopyButton";
import { IconButton } from "../icon-button/IconButton";
import { cx } from "../shared/cx";
import { EyeGlyph, EyeOffGlyph } from "../shared/glyphs";
import { Switch } from "../switch/Switch";

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
  /** Over the rows: "Production", a file name. */
  title?: ReactNode;
  /** The reveal-all switch's label (default "Show values"). */
  revealLabel?: string;
  className?: string;
}

// ── Public API ────────────────────────────
/** Name and value rows with masked secrets. */
export function EnvironmentVariables({
  variables,
  title,
  revealLabel = "Show values",
  className,
}: EnvironmentVariablesProps) {
  const [all, setAll] = useState(false);
  const [shown, setShown] = useState<string[]>([]);
  const secrets = variables.some((variable) => variable.secret);

  return (
    <section className={cx("iro-env-vars", className)}>
      {title || secrets ? (
        <header className="iro-env-vars-head">
          {title ? <span className="iro-env-vars-title">{title}</span> : null}
          {secrets ? <Switch size="sm" label={revealLabel} checked={all} onCheckedChange={setAll} /> : null}
        </header>
      ) : null}
      <dl className="iro-env-vars-list">
        {variables.map(({ name, value, secret }) => {
          const hidden = secret && !all && !shown.includes(name);
          return (
            <div key={name} className="iro-env-var">
              <dt className="iro-env-var-name">{name}</dt>
              <dd className="iro-env-var-value" data-hidden={hidden || undefined}>
                <span>{hidden ? MASK : value}</span>
                {secret && !all ? (
                  <IconButton
                    size="sm"
                    icon={hidden ? <EyeGlyph /> : <EyeOffGlyph />}
                    label={`${hidden ? "Show" : "Hide"} ${name}`}
                    onClick={() => setShown(hidden ? [...shown, name] : shown.filter((item) => item !== name))}
                  />
                ) : null}
                <CopyButton text={value} label={`Copy ${name}`} />
              </dd>
            </div>
          );
        })}
      </dl>
    </section>
  );
}
