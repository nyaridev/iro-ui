// PropertyList: label and value rows for details (a file, an order, a device). Empty values are skipped;
// a value can be mono and can get a copy button.

// ── Dependencies ──────────────────────────
import type { ComponentProps, ReactNode } from "react";
import { CopyButton } from "../copy-button/CopyButton";
import { cx } from "../shared/cx";

// ── Types ─────────────────────────────────
export interface Property {
  /** Unique within the list. */
  label: string;
  /** Rows whose value is null, undefined or "" are left out. */
  value: ReactNode;
  /** Numbers, hashes, paths. */
  mono?: boolean;
  /** Text to copy; adds a copy button to the row. */
  copy?: string;
}

export interface PropertyListProps extends Omit<ComponentProps<"dl">, "children"> {
  properties: Property[];
  /** Accessible name of the copy buttons; the row's label is added after it. */
  copyLabel?: string;
}

// ── Public API ────────────────────────────
/** A definition list of labelled values. */
export function PropertyList({ properties, copyLabel = "Copy", className, ...rest }: PropertyListProps) {
  const shown = properties.filter(({ value }) => value !== null && value !== undefined && value !== "");
  return (
    <dl className={cx("iro-properties", className)} {...rest}>
      {shown.map((property) => (
        <div key={property.label} className="iro-property">
          <dt className="iro-property-label">{property.label}</dt>
          <dd className="iro-property-value" data-mono={property.mono || undefined}>
            <span>{property.value}</span>
            {property.copy ? (
              <CopyButton text={property.copy} label={`${copyLabel} ${property.label}`} className="iro-property-copy" />
            ) : null}
          </dd>
        </div>
      ))}
    </dl>
  );
}
