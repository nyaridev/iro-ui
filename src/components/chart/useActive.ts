// useActive: which point, bar group or part a chart is showing in its readout, moved by the pointer or arrow keys.

// ── Dependencies ──────────────────────────
import { type KeyboardEvent, useState } from "react";

// ── Constants ─────────────────────────────
const STEPS: Record<string, number> = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };

// ── Public API ────────────────────────────
/** The shown index (null for none), a setter, and the keyboard and focus handlers for the chart's focus target. */
export function useActive(count: number) {
  const [active, setActive] = useState<number | null>(null);
  const clamp = (index: number) => Math.min(Math.max(index, 0), count - 1);

  const keys = {
    onKeyDown(event: KeyboardEvent) {
      if (count === 0) return;
      const step = STEPS[event.key];
      let next: number | null | undefined;
      if (step) next = active === null ? 0 : clamp(active + step);
      else if (event.key === "Home") next = 0;
      else if (event.key === "End") next = count - 1;
      else if (event.key === "Escape") next = null;
      if (next === undefined) return;
      event.preventDefault();
      setActive(next);
    },
    onFocus: () => setActive((current) => current ?? (count > 0 ? 0 : null)),
    onBlur: () => setActive(null),
    onPointerLeave: () => setActive(null),
  };

  return { active: active === null || active >= count ? null : active, setActive, keys };
}
