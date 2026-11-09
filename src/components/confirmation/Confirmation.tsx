// Confirmation: the assistant asks before it acts (runs a command, sends an email, deletes a file): what it wants to
// do, the details, and Allow or Deny. Once answered, the buttons give way to the answer, so the history shows it.

// ── Dependencies ──────────────────────────
import type { ReactNode } from "react";
import { Button } from "../button/Button";
import { cx } from "../shared/cx";
import { CloseGlyph, SuccessGlyph, WarningGlyph } from "../shared/glyphs";

// ── Types ─────────────────────────────────
export interface ConfirmationProps {
  /** What it wants to do: "Run a command in your project". */
  title: ReactNode;
  /** The details: the command in a CodeBlock, the email's recipients. */
  children?: ReactNode;
  /** `pending` (default) shows the buttons; `allowed` and `denied` show the answer. */
  state?: "pending" | "allowed" | "denied";
  onAllow: () => void;
  onDeny: () => void;
  allowLabel?: string;
  denyLabel?: string;
  /** The answer's words (default "Allowed" and "Denied"). */
  allowedText?: string;
  deniedText?: string;
  className?: string;
}

// ── Public API ────────────────────────────
/** An inline request to approve an action. */
export function Confirmation({
  title,
  children,
  state = "pending",
  onAllow,
  onDeny,
  allowLabel = "Allow",
  denyLabel = "Deny",
  allowedText = "Allowed",
  deniedText = "Denied",
  className,
}: ConfirmationProps) {
  return (
    <section data-state={state} className={cx("iro-confirmation", className)}>
      <header className="iro-confirmation-head">
        <span className="iro-confirmation-icon">
          <WarningGlyph />
        </span>
        <span className="iro-confirmation-title">{title}</span>
      </header>
      {children ? <div className="iro-confirmation-body">{children}</div> : null}
      {state === "pending" ? (
        <div className="iro-confirmation-actions">
          <Button size="sm" onClick={onDeny}>
            {denyLabel}
          </Button>
          <Button size="sm" variant="primary" onClick={onAllow}>
            {allowLabel}
          </Button>
        </div>
      ) : (
        <div className="iro-confirmation-answer" role="status">
          {state === "allowed" ? <SuccessGlyph /> : <CloseGlyph />}
          {state === "allowed" ? allowedText : deniedText}
        </div>
      )}
    </section>
  );
}
