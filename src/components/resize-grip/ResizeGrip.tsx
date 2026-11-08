// ResizeGrip: a handle that resizes the box it sits in, in place of the browser's resize corner (which can't be moved,
// styled or double-clicked). Where it sits says which way: bottom center for height, right edge for width, the corner
// for both. Drag it, use the arrow keys (Shift: bigger steps), or double-click (Enter) to fit the box to its content.
// Its parent needs `position: relative`.

// ── Dependencies ──────────────────────────
import { type KeyboardEvent, type PointerEvent, type RefObject, useLayoutEffect, useRef, useState } from "react";
import { cx } from "../shared/cx";

// ── Constants ─────────────────────────────
const STEP = 16;
const LARGE_STEP = 64;
const MAX_FIT = { width: 900, height: 360 };

// ── Types ─────────────────────────────────
export type ResizeAxis = "x" | "y" | "both";

export interface ResizeGripProps {
  /** The box that changes size. */
  target: RefObject<HTMLElement | null>;
  axis?: ResizeAxis;
  /** The content's own size in px, borders included. Without it, a double-click goes back to the default size. */
  fitSize?: () => { width?: number; height?: number };
  /** The largest size a fit picks. */
  maxFit?: { width: number; height: number };
  /** Accessible name. */
  label?: string;
  /** After each change: `fitted` is true for a fit, false for a drag or a key. */
  onResize?: (fitted: boolean) => void;
  className?: string;
}

// ── Public API ────────────────────────────
/** A grip that resizes `target` by dragging, keys or a double-click to fit. */
export function ResizeGrip({
  target,
  axis = "y",
  fitSize,
  maxFit = MAX_FIT,
  label = "Resize",
  onResize,
  className,
}: ResizeGripProps) {
  const drag = useRef<{ x: number; y: number; width: number; height: number } | null>(null);
  const doesX = axis !== "y";
  const doesY = axis !== "x";
  // The size screen readers hear: the height, or the width for a sideways grip.
  const [now, setNow] = useState(0);

  const measure = () => {
    const box = target.current?.getBoundingClientRect();
    if (box) setNow(Math.round(axis === "x" ? box.width : box.height));
  };
  // biome-ignore lint/correctness/useExhaustiveDependencies: measured once; each resize measures again
  useLayoutEffect(measure, []);

  const resizeTo = (width: number, height: number) => {
    const box = target.current;
    if (!box) return;
    if (doesX) box.style.width = `${Math.max(0, width)}px`;
    if (doesY) box.style.height = `${Math.max(0, height)}px`;
  };

  const fitContent = () => {
    const box = target.current;
    if (!box) return;
    // The default size is whatever the box is without a size of ours.
    if (doesX) box.style.width = "";
    if (doesY) box.style.height = "";
    const base = box.getBoundingClientRect();
    const want = fitSize?.() ?? {};
    if (doesX && want.width && want.width > base.width) box.style.width = `${Math.min(want.width, maxFit.width)}px`;
    if (doesY && want.height && want.height > base.height) {
      box.style.height = `${Math.min(want.height, maxFit.height)}px`;
    }
    measure();
    onResize?.(true);
  };

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    const box = target.current?.getBoundingClientRect();
    if (!box || event.button !== 0) return;
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    drag.current = { x: event.clientX, y: event.clientY, width: box.width, height: box.height };
  };
  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const start = drag.current;
    if (!start) return;
    resizeTo(start.width + event.clientX - start.x, start.height + event.clientY - start.y);
  };
  const endDrag = () => {
    if (!drag.current) return;
    drag.current = null;
    measure();
    onResize?.(false);
  };
  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      fitContent();
      return;
    }
    const step = event.shiftKey ? LARGE_STEP : STEP;
    const moves: Record<string, [number, number]> = {
      ArrowUp: [0, -step],
      ArrowDown: [0, step],
      ArrowLeft: [-step, 0],
      ArrowRight: [step, 0],
    };
    const move = moves[event.key];
    const box = target.current?.getBoundingClientRect();
    if (!move || !box || (move[0] && !doesX) || (move[1] && !doesY)) return;
    event.preventDefault();
    resizeTo(box.width + move[0], box.height + move[1]);
    measure();
    onResize?.(false);
  };

  return (
    // biome-ignore lint/a11y/useSemanticElements: an <hr> can't take focus, pointer capture or children
    <div
      role="separator"
      tabIndex={0}
      aria-label={`${label}. Double-click or Enter fits the content`}
      aria-orientation={axis === "x" ? "vertical" : "horizontal"}
      aria-valuenow={now}
      aria-valuemin={0}
      aria-valuemax={axis === "x" ? maxFit.width : maxFit.height}
      title="Drag to resize, double-click to fit"
      data-axis={axis}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onDoubleClick={fitContent}
      onKeyDown={onKeyDown}
      className={cx("iro-resize-grip", className)}
    >
      <span className="iro-resize-grip-mark" />
    </div>
  );
}
