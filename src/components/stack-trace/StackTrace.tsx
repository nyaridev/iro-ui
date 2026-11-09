// StackTrace: a JavaScript error and its stack, read into frames: the message in the danger color, then each frame's
// function and place. Frames from dependencies and the runtime fold away behind one button, and with `onOpenFrame` a
// frame's place opens it (in an editor, a source view).

// ── Dependencies ──────────────────────────
import { useState } from "react";
import { CopyButton } from "../copy-button/CopyButton";
import { cx } from "../shared/cx";
import { DangerGlyph } from "../shared/glyphs";
import { parseStack, type StackFrame } from "./stack";

// ── Types ─────────────────────────────────
export interface StackTraceProps {
  /** The raw trace, as `error.stack` gives it. */
  stack: string;
  /** Opens a frame's file; each place becomes a button. */
  onOpenFrame?: (frame: StackFrame) => void;
  /** Shows dependency and runtime frames from the start (default false). */
  defaultShowInternal?: boolean;
  className?: string;
}

// ── Private helpers ───────────────────────
const placeOf = ({ file, line, column }: StackFrame) =>
  [file, line, column].filter((part) => part !== undefined).join(":");

// ── Public API ────────────────────────────
/** An error message over its stack frames, with internal frames folded. */
export function StackTrace({ stack, onOpenFrame, defaultShowInternal = false, className }: StackTraceProps) {
  const [showInternal, setShowInternal] = useState(defaultShowInternal);
  const { message, frames } = parseStack(stack);
  const internal = frames.filter((frame) => frame.internal).length;
  const shown = showInternal ? frames : frames.filter((frame) => !frame.internal);

  return (
    <figure className={cx("iro-stack-trace", className)}>
      <figcaption className="iro-stack-trace-head">
        <DangerGlyph />
        <span className="iro-stack-trace-message">{message || "Error"}</span>
        <CopyButton text={stack} label="Copy stack trace" />
      </figcaption>
      <ol className="iro-stack-trace-frames">
        {shown.map((frame, index) => (
          <li
            // biome-ignore lint/suspicious/noArrayIndexKey: a frame is its place in the stack.
            key={index}
            data-internal={frame.internal || undefined}
            className="iro-stack-trace-frame"
          >
            <span className="iro-stack-trace-fn">{frame.fn ?? "(anonymous)"}</span>
            {onOpenFrame ? (
              <button type="button" className="iro-stack-trace-place" onClick={() => onOpenFrame(frame)}>
                {placeOf(frame)}
              </button>
            ) : (
              <span className="iro-stack-trace-place">{placeOf(frame)}</span>
            )}
          </li>
        ))}
      </ol>
      {internal > 0 ? (
        <button type="button" className="iro-stack-trace-toggle" onClick={() => setShowInternal(!showInternal)}>
          {showInternal ? "Hide" : "Show"} {internal} internal {internal === 1 ? "frame" : "frames"}
        </button>
      ) : null}
    </figure>
  );
}
