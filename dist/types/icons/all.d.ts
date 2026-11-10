import type { IconData } from "./icon";
/** A category of the set: one file in `set/`, its icons sorted by name. */
export interface IconCategory {
    name: string;
    icons: IconData[];
}
/** The set by category, in the order the Lab shows them. */
export declare const iconCategories: IconCategory[];
/** Every icon, sorted by name. */
export declare const allIcons: IconData[];
