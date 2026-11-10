import type { ReactNode } from "react";
export interface SchemaField {
    /** Unique among its siblings. */
    name: string;
    /** As the reader knows it: "string", "number[]", "object". */
    type: string;
    required?: boolean;
    /** Shown as written: "true", "\"draft\"". */
    default?: string;
    description?: ReactNode;
    /** An object's fields; the row folds open to them. */
    children?: SchemaField[];
}
export interface SchemaViewProps {
    fields: SchemaField[];
    /** An HTTP method, colored by kind: GET, POST, PUT, PATCH, DELETE. */
    method?: string;
    /** The path or the schema's name, in mono after the method. */
    title?: ReactNode;
    description?: ReactNode;
    /** Opens every object field from the start (default false). */
    defaultOpen?: boolean;
    /** The required mark's text (default "required"). */
    requiredLabel?: string;
    className?: string;
}
/** A list of typed fields, nested objects folding open. */
export declare function SchemaView({ fields, method, title, description, defaultOpen, requiredLabel, className, }: SchemaViewProps): import("react").JSX.Element;
