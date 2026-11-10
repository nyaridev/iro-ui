import type { ReactNode } from "react";
/** One choice in a Select or MultiSelect. */
export interface SelectOption<T extends string> {
    value: T;
    label: string;
    /** Drawn before the label, in the list and (Select) in the field once picked. */
    icon?: ReactNode;
    /** A short note at the row's end: a size, a count, a shortcut. Typing doesn't match it. */
    hint?: string;
    /** A heading to list it under. Options with the same group are shown together, in order of first appearance. */
    group?: string;
    disabled?: boolean;
}
/** Options under one heading. */
export interface OptionGroup<T extends string> {
    value: string;
    items: SelectOption<T>[];
}
/** The options split by `group`, or null when none has a group. Ungrouped options go under an empty heading. */
export declare function groupOptions<T extends string>(options: SelectOption<T>[]): OptionGroup<T>[] | null;
/** Whether `label` contains every word of `query`, in any order and case: "wan 2.2" matches "Wan Video 2.2 T2V". */
export declare function matchesAllWords(label: string, query: string): boolean;
