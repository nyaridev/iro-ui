// PropertyList: label and value rows for details (a file, a model, an image's settings). Empty values are skipped;
// a value can be mono and can get a copy button.

// ── Dependencies ──────────────────────────
import { type ComponentProps, type ReactNode, useEffect, useState } from "react";
import { IconButton } from "../icon-button/IconButton";
import { cx } from "../shared/cx";
import { CheckGlyph, CopyGlyph } from "../shared/glyphs";

// ── Constants ─────────────────────────────
const COPIED_MS = 1200;

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

// ── Private helpers ───────────────────────
/** Copies `text`, then shows a check for a moment. */
function CopyButton({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), COPIED_MS);
    return () => clearTimeout(timer);
  }, [copied]);

  const copy = () => {
    navigator.clipboard.writeText(text).then(
      () => setCopied(true),
      // The browser refused (no permission, not a secure page): there's nothing useful to show.
      () => {},
    );
  };
  return (
    <IconButton
      icon={copied ? <CheckGlyph /> : <CopyGlyph />}
      label={label}
      size="sm"
      onClick={copy}
      className="iro-property-copy"
    />
  );
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
            {property.copy ? <CopyButton text={property.copy} label={`${copyLabel} ${property.label}`} /> : null}
          </dd>
        </div>
      ))}
    </dl>
  );
}
