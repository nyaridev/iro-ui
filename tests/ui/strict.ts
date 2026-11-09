// Which UI checks fail the run. A check starts report-only and turns strict once its findings are fixed (ADR-0015).

/** Check ids (`layout.end-gap`) or whole areas (`contrast`). */
export const STRICT = new Set<string>(["layout", "contrast", "a11y", "responsive", "motion"]);

/** Whether a check's findings fail the run. */
export const isStrict = (check: string) => STRICT.has(check) || STRICT.has(check.split(".")[0]);
