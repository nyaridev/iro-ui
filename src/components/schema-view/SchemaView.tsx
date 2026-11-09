// SchemaView: the shape of some data or an API call: each field's name, type, whether it's required, its default
// and what it means, with object fields folding open to their own. A method and path make it an endpoint's reference.

// ── Dependencies ──────────────────────────
import { Collapsible as BaseCollapsible } from "@base-ui/react/collapsible";
import type { ReactNode } from "react";
import { cx } from "../shared/cx";
import { ChevronDownGlyph } from "../shared/glyphs";

// ── Types ─────────────────────────────────
export interface SchemaField {
  /** Unique among its siblings. */
  name: string;
  /** As the reader knows it: "string", "number[]", "object". */
  type: string;
  required?: boolean;
  /** Shown as written: "true", "\"draft\"". */
  default?: string;
  description?: ReactNode;
  /** An object's fields; the row folds open to them. */
  children?: SchemaField[];
}

export interface SchemaViewProps {
  fields: SchemaField[];
  /** An HTTP method, colored by kind: GET, POST, PUT, PATCH, DELETE. */
  method?: string;
  /** The path or the schema's name, in mono after the method. */
  title?: ReactNode;
  description?: ReactNode;
  /** Opens every object field from the start (default false). */
  defaultOpen?: boolean;
  /** The required mark's text (default "required"). */
  requiredLabel?: string;
  className?: string;
}

// ── Private helpers ───────────────────────
function FieldRows({ fields, open, required }: { fields: SchemaField[]; open: boolean; required: string }) {
  return (
    <ul className="iro-schema-fields">
      {fields.map((field) => {
        const head = (
          <>
            <code className="iro-schema-name">{field.name}</code>
            <code className="iro-schema-type">{field.type}</code>
            {field.required ? <span className="iro-schema-required">{required}</span> : null}
            {field.default !== undefined ? <code className="iro-schema-default">= {field.default}</code> : null}
          </>
        );
        const description = field.description ? <p className="iro-schema-description">{field.description}</p> : null;
        return (
          <li key={field.name} className="iro-schema-field">
            {field.children ? (
              <BaseCollapsible.Root defaultOpen={open}>
                <BaseCollapsible.Trigger className="iro-schema-head">
                  <ChevronDownGlyph />
                  {head}
                </BaseCollapsible.Trigger>
                {description}
                <BaseCollapsible.Panel className="iro-schema-panel">
                  <FieldRows fields={field.children} open={open} required={required} />
                </BaseCollapsible.Panel>
              </BaseCollapsible.Root>
            ) : (
              <>
                <div className="iro-schema-head">{head}</div>
                {description}
              </>
            )}
          </li>
        );
      })}
    </ul>
  );
}

// ── Public API ────────────────────────────
/** A list of typed fields, nested objects folding open. */
export function SchemaView({
  fields,
  method,
  title,
  description,
  defaultOpen = false,
  requiredLabel = "required",
  className,
}: SchemaViewProps) {
  return (
    <section className={cx("iro-schema", className)}>
      {method || title || description ? (
        <header className="iro-schema-top">
          <div className="iro-schema-endpoint">
            {method ? (
              <span className="iro-schema-method" data-method={method.toLowerCase()}>
                {method.toUpperCase()}
              </span>
            ) : null}
            {title ? <code className="iro-schema-title">{title}</code> : null}
          </div>
          {description ? <p className="iro-schema-description">{description}</p> : null}
        </header>
      ) : null}
      <FieldRows fields={fields} open={defaultOpen} required={requiredLabel} />
    </section>
  );
}
