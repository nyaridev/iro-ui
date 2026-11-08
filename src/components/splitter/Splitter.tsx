// Splitter: the line between two side-by-side panes. Drag it to change the start pane's share of the row, focus it and
// use ← → (Shift for bigger steps), or double-click to reset. `onShareChange` follows along; `onCommit` fires once the
// drag or key press ends, for saving.

// ── Dependencies ──────────────────────────
import { type KeyboardEvent, type PointerEvent, type RefObject, useRef } from "react";
import { cx } from "../shared/cx";
import { clampShare } from "./share";

// ── Constants ─────────────────────────────
const STEP = 0.02;
const LARGE_STEP = 0.05;

// ── Types ─────────────────────────────────
export interface SplitterProps {
  /** The row both panes sit in; shares are fractions of its width. */
  container: RefObject<HTMLElement | null>;
  /** The start pane's share of the row (0–1). */
  share: number;
  onShareChange: (share: number) => void;
  onCommit?: (share: number) => void;
  /** Double-click; usually sets the default share back. */
  onReset?: () => void;
  min?: number;
  max?: number;
  /** Neither pane gets narrower than this many pixels. */
  minStart?: number;
  minEnd?: number;
  /** Accessible name. */
  label?: string;
  className?: string;
}

// ── Public API ────────────────────────────
/** A draggable, keyboard-operable divider between two panes. */
export function Splitter({
  container,
  share,
  onShareChange,
  onCommit,
  onReset,
  min = 0.2,
  max = 0.8,
  minStart = 0,
  minEnd = 0,
  label = "Resize panes",
  className,
}: SplitterProps) {
  const dragging = useRef(false);
  const latest = useRef(share);
  latest.current = share;

  const set = (next: number) => {
    const width = container.current?.getBoundingClientRect().width ?? 0;
    latest.current = clampShare(next, width, { min, max, minStart, minEnd });
    onShareChange(latest.current);
  };
  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) return;
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    dragging.current = true;
  };
  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const row = container.current?.getBoundingClientRect();
    if (!dragging.current || !row?.width) return;
    set((event.clientX - row.left) / row.width);
  };
  const endDrag = () => {
    if (!dragging.current) return;
    dragging.current = false;
    onCommit?.(latest.current);
  };
  const isArrow = (event: KeyboardEvent) => event.key === "ArrowLeft" || event.key === "ArrowRight";
  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!isArrow(event)) return;
    event.preventDefault();
    const step = event.shiftKey ? LARGE_STEP : STEP;
    set(share + (event.key === "ArrowLeft" ? -step : step));
  };

  return (
    // biome-ignore lint/a11y/useSemanticElements: an <hr> can't take focus, pointer capture or children
    <div
      role="separator"
      tabIndex={0}
      aria-label={label}
      aria-orientation="vertical"
      aria-valuenow={Math.round(share * 100)}
      aria-valuemin={Math.round(min * 100)}
      aria-valuemax={Math.round(max * 100)}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onKeyDown={onKeyDown}
      onKeyUp={(event) => {
        if (isArrow(event)) onCommit?.(latest.current);
      }}
      onDoubleClick={onReset}
      className={cx("iro-splitter", className)}
    >
      <span className="iro-splitter-line" />
    </div>
  );
}
