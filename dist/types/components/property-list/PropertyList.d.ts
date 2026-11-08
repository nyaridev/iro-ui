import { type ComponentProps, type ReactNode } from "react";
export interface Property {
    /** Unique within the list. */
    label: string;
    /** Rows whose value is null, undefined or "" are left out. */
    value: ReactNode;
    /** Numbers, hashes, paths. */
    mono?: boolean;
    /** Text to copy; adds a copy button to the row. */
    copy?: string;
}
export interface PropertyListProps extends Omit<ComponentProps<"dl">, "children"> {
    properties: Property[];
    /** Accessible name of the copy buttons; the row's label is added after it. */
    copyLabel?: string;
}
/** A definition list of labelled values. */
export declare function PropertyList({ properties, copyLabel, className, ...rest }: PropertyListProps): import("react").JSX.Element;
