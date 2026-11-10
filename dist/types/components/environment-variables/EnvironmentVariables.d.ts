import { type ReactNode } from "react";
export interface EnvVariable {
    /** Unique within the list. */
    name: string;
    value: string;
    /** Hidden until revealed. */
    secret?: boolean;
}
export interface EnvironmentVariablesProps {
    variables: EnvVariable[];
    /** Makes it an editor: called with the whole list after each change. */
    onChange?: (variables: EnvVariable[]) => void;
    /** Over the rows: "Production", a file name. */
    title?: ReactNode;
    /** The reveal-all switch's label (default "Show values"). */
    revealLabel?: string;
    className?: string;
}
/** Name and value rows with masked secrets; an editor with `onChange`. */
export declare function EnvironmentVariables({ variables, onChange, title, revealLabel, className, }: EnvironmentVariablesProps): import("react").JSX.Element;
