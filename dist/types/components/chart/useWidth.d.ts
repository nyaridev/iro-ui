import { type RefObject } from "react";
/** A ref to put on the element, and its current width. */
export declare function useWidth<T extends HTMLElement>(): [RefObject<T | null>, number];
