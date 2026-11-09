// What's wrong with a new variable's name, if anything: shells and most hosts take letters, digits and underscores,
// not starting with a digit, and a name can only be set once.

// ── Constants ─────────────────────────────
const NAME = /^[A-Za-z_][A-Za-z0-9_]*$/;

// ── Public API ────────────────────────────
/** A sentence saying why `name` can't be added, or null when it can. */
export function nameProblem(name: string, taken: string[]): string | null {
  if (!name) return "Enter a name.";
  if (!NAME.test(name)) return "Use letters, digits and _, not starting with a digit.";
  if (taken.includes(name)) return `${name} is already set.`;
  return null;
}
