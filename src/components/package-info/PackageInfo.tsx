// PackageInfo: a package at a glance: its name and version, what it does, the command that installs it, details
// (license, size, when published), what it depends on and where to read more.

// ── Dependencies ──────────────────────────
import type { ReactNode } from "react";
import { Badge } from "../badge/Badge";
import { type Property, PropertyList } from "../property-list/PropertyList";
import { cx } from "../shared/cx";
import { ExternalLinkGlyph } from "../shared/glyphs";
import { Snippet } from "../snippet/Snippet";

// ── Types ─────────────────────────────────
export interface PackageInfoProps {
  name: string;
  version: string;
  description?: ReactNode;
  /** The install command: "pnpm add iro-ui". */
  install?: string;
  /** Rows under it: license, size, published. */
  details?: Property[];
  /** Name to version range, as a manifest lists them. */
  dependencies?: Record<string, string>;
  /** Links at the end: the homepage, the repository. */
  links?: { label: string; href: string }[];
  /** Heading over the dependencies (default "Dependencies"). */
  dependenciesLabel?: string;
  className?: string;
}

// ── Public API ────────────────────────────
/** A package's name, version, install command, details and dependencies. */
export function PackageInfo({
  name,
  version,
  description,
  install,
  details,
  dependencies,
  links,
  dependenciesLabel = "Dependencies",
  className,
}: PackageInfoProps) {
  const deps = Object.entries(dependencies ?? {});
  return (
    <article className={cx("iro-package-info", className)}>
      <header className="iro-package-info-head">
        <h3 className="iro-package-info-name">{name}</h3>
        <Badge>v{version}</Badge>
      </header>
      {description ? <p className="iro-package-info-description">{description}</p> : null}
      {install ? <Snippet code={install} /> : null}
      {details && details.length > 0 ? <PropertyList properties={details} /> : null}
      {deps.length > 0 ? (
        <section className="iro-package-info-deps">
          <h4 className="iro-package-info-label">
            {dependenciesLabel} <span>{deps.length}</span>
          </h4>
          <ul className="iro-package-info-dep-list">
            {deps.map(([dep, range]) => (
              <li key={dep} className="iro-package-info-dep">
                {dep} <span>{range}</span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
      {links && links.length > 0 ? (
        <footer className="iro-package-info-links">
          {links.map((link) => (
            <a key={link.href} href={link.href} target="_blank" rel="noreferrer" className="iro-package-info-link">
              {link.label}
              <ExternalLinkGlyph />
            </a>
          ))}
        </footer>
      ) : null}
    </article>
  );
}
