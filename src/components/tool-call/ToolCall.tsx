// ToolCall: one thing the assistant did (searched, read a file, ran a command), as a folded card: the tool's name, a
// short summary and its state (running, done, failed), opening to what went in and what came back.

// ── Dependencies ──────────────────────────
import { Collapsible as BaseCollapsible } from "@base-ui/react/collapsible";
import type { ReactNode } from "react";
import { cx } from "../shared/cx";
import { ChevronDownGlyph, DangerGlyph, SuccessGlyph, WrenchGlyph } from "../shared/glyphs";
import { Spinner } from "../spinner/Spinner";

// ── Constants ─────────────────────────────
const STATES = {
  running: { label: "Running", icon: <Spinner /> },
  done: { label: "Done", icon: <SuccessGlyph /> },
  error: { label: "Failed", icon: <DangerGlyph /> },
};

// ── Types ─────────────────────────────────
export interface ToolCallProps {
  /** The tool's name: "search", "read_file". */
  name: string;
  /** What it did, in a few words: "3 results for “export”". */
  summary?: ReactNode;
  status: "running" | "done" | "error";
  /** What went in: arguments, a command; a CodeBlock fits. */
  input?: ReactNode;
  /** What came back, or the error. */
  output?: ReactNode;
  /** In place of the wrench. */
  icon?: ReactNode;
  defaultOpen?: boolean;
  /** Section headings (default "Input" and "Output"). */
  inputLabel?: string;
  outputLabel?: string;
  className?: string;
}

// ── Public API ────────────────────────────
/** A folding card for one tool call. */
export function ToolCall({
  name,
  summary,
  status,
  input,
  output,
  icon,
  defaultOpen = false,
  inputLabel = "Input",
  outputLabel = "Output",
  className,
}: ToolCallProps) {
  const state = STATES[status];
  return (
    <BaseCollapsible.Root defaultOpen={defaultOpen} data-status={status} className={cx("iro-tool-call", className)}>
      <BaseCollapsible.Trigger className="iro-tool-call-trigger">
        <span className="iro-tool-call-icon">{icon ?? <WrenchGlyph />}</span>
        <code className="iro-tool-call-name">{name}</code>
        {summary ? <span className="iro-tool-call-summary">{summary}</span> : null}
        <span className="iro-tool-call-state" role="img" aria-label={state.label}>
          {state.icon}
        </span>
        <ChevronDownGlyph />
      </BaseCollapsible.Trigger>
      {input || output ? (
        <BaseCollapsible.Panel className="iro-tool-call-panel">
          <div className="iro-tool-call-body">
            {input ? (
              <section>
                <h4 className="iro-tool-call-label">{inputLabel}</h4>
                {input}
              </section>
            ) : null}
            {output ? (
              <section>
                <h4 className="iro-tool-call-label">{outputLabel}</h4>
                {output}
              </section>
            ) : null}
          </div>
        </BaseCollapsible.Panel>
      ) : null}
    </BaseCollapsible.Root>
  );
}
