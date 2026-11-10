import type { ReactNode } from "react";
export interface AccordionItem {
    /** Names the section in `value`; unique within the accordion. */
    value: string;
    title: ReactNode;
    content: ReactNode;
    disabled?: boolean;
}
export interface AccordionProps {
    items: AccordionItem[];
    /** Lets more than one section stay open. */
    multiple?: boolean;
    /** The open sections; leave it out and use `defaultValue` to let the accordion manage it. */
    value?: string[];
    defaultValue?: string[];
    onValueChange?: (value: string[]) => void;
    className?: string;
}
/** Sections with headers that open and close their bodies. */
export declare function Accordion({ items, multiple, value, defaultValue, onValueChange, className }: AccordionProps): import("react").JSX.Element;
