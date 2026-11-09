// The Lab frame's light or dark (ADR-0010): the system's until the header's sun/moon is clicked, then that choice,
// remembered per browser. A click back to the system's own scheme forgets the choice, so the frame follows the
// system again.

// ── Dependencies ──────────────────────────
import { useEffect, useState } from "react";

// ── Constants ─────────────────────────────
const KEY = "iro-lab-scheme";
const DARK = "(prefers-color-scheme: dark)";

// ── Types ─────────────────────────────────
export type Scheme = "light" | "dark";

// ── Private helpers ───────────────────────
const systemScheme = (): Scheme => (matchMedia(DARK).matches ? "dark" : "light");

/** The remembered choice, or null; storage can be blocked, and then nothing is remembered. */
function remembered(): Scheme | null {
  try {
    const value = localStorage.getItem(KEY);
    return value === "light" || value === "dark" ? value : null;
  } catch {
    return null;
  }
}

// ── Public API ────────────────────────────
/** The frame's scheme, and the toggle the sun/moon calls. */
export function useScheme(): [Scheme, () => void] {
  const [system, setSystem] = useState(systemScheme);
  const [chosen, setChosen] = useState(remembered);

  // While nothing is chosen, the frame changes with the system.
  useEffect(() => {
    const query = matchMedia(DARK);
    const follow = () => setSystem(query.matches ? "dark" : "light");
    query.addEventListener("change", follow);
    return () => query.removeEventListener("change", follow);
  }, []);

  const scheme = chosen ?? system;
  function toggle() {
    const next: Scheme = scheme === "dark" ? "light" : "dark";
    const keep = next === system ? null : next;
    setChosen(keep);
    try {
      if (keep) localStorage.setItem(KEY, keep);
      else localStorage.removeItem(KEY);
    } catch {}
  }
  return [scheme, toggle];
}
