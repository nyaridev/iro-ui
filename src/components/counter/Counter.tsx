// Counter: a number that counts to its new value when it changes, with a little bump and glow so you notice (UmeSync's
// line counts). The first value shows at once; reduced and off motion switch straight to the new number.

// ── Dependencies ──────────────────────────
import { type ComponentProps, useEffect, useRef, useState } from "react";
import { motionOf } from "../../effects/motion";
import { cx } from "../shared/cx";

// ── Constants ─────────────────────────────
const COUNT_MS = 700;

// ── Types ─────────────────────────────────
export interface CounterProps extends Omit<ComponentProps<"span">, "children"> {
  value: number;
  /** How the number reads while counting and after (default: rounded, with the locale's separators). */
  format?: (value: number) => string;
}

// ── Private helpers ───────────────────────
const easeOutQuart = (t: number) => 1 - (1 - t) ** 4;
const rounded = (value: number) => Math.round(value).toLocaleString();

// ── Public API ────────────────────────────
/** A number that counts up or down to each new value. */
export function Counter({ value, format = rounded, className, ...rest }: CounterProps) {
  const element = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(value);
  const current = useRef(value);
  // Bumped on each counted change; keying the span on it restarts the bump animation.
  const [bump, setBump] = useState(0);

  useEffect(() => {
    const from = current.current;
    if (value === from) return;
    const mode = motionOf(element.current);
    if (mode === "reduced" || mode === "off") {
      current.current = value;
      setShown(value);
      return;
    }
    setBump((count) => count + 1);
    const start = performance.now();
    let frame = 0;
    const step = (now: number) => {
      const t = Math.min((now - start) / COUNT_MS, 1);
      current.current = from + (value - from) * easeOutQuart(t);
      setShown(current.current);
      if (t < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [value]);

  return (
    <span key={bump} ref={element} data-bump={bump > 0 || undefined} className={cx("iro-counter", className)} {...rest}>
      {format(shown)}
    </span>
  );
}
