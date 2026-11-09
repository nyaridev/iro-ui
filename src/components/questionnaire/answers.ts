// Questionnaire's answers: what's picked per question, with "Other" standing for the text typed beside it. A question
// counts as answered once something is picked, and "Other" only once its text isn't blank.

// ── Constants ─────────────────────────────
/** The value of the "Other" choice. */
export const OTHER = "__other__";

// ── Public API ────────────────────────────
/** The answers to send: each question's picks, with "Other" replaced by its text. */
export function collectAnswers(
  picked: Record<string, string[]>,
  others: Record<string, string>,
): Record<string, string[]> {
  return Object.fromEntries(
    Object.entries(picked).map(([id, values]) => [
      id,
      values.map((value) => (value === OTHER ? (others[id] ?? "").trim() : value)),
    ]),
  );
}

/** Whether every question in `ids` has an answer. */
export function isComplete(ids: string[], picked: Record<string, string[]>, others: Record<string, string>): boolean {
  return ids.every((id) => {
    const values = picked[id] ?? [];
    return values.length > 0 && (!values.includes(OTHER) || (others[id] ?? "").trim() !== "");
  });
}
