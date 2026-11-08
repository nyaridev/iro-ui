// Select options: their shape, grouping them under headings, and the type-to-filter match. Shared by Select and
// MultiSelect.

// ── Types ─────────────────────────────────
/** One choice in a Select or MultiSelect. */
export interface SelectOption<T extends string> {
  value: T;
  label: string;
  /** A heading to list it under. Options with the same group are shown together, in order of first appearance. */
  group?: string;
  disabled?: boolean;
}

/** Options under one heading. */
export interface OptionGroup<T extends string> {
  value: string;
  items: SelectOption<T>[];
}

// ── Public API ────────────────────────────
/** The options split by `group`, or null when none has a group. Ungrouped options go under an empty heading. */
export function groupOptions<T extends string>(options: SelectOption<T>[]): OptionGroup<T>[] | null {
  if (!options.some((option) => option.group)) return null;
  const groups = new Map<string, SelectOption<T>[]>();
  for (const option of options) {
    const name = option.group ?? "";
    groups.set(name, [...(groups.get(name) ?? []), option]);
  }
  return [...groups].map(([value, items]) => ({ value, items }));
}

/** Whether `label` contains every word of `query`, in any order and case: "wan 2.2" matches "Wan Video 2.2 T2V". */
export function matchesAllWords(label: string, query: string): boolean {
  const text = label.toLowerCase();
  return query
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .every((word) => text.includes(word));
}
