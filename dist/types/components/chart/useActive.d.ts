import { type KeyboardEvent } from "react";
/** The shown index (null for none), a setter, and the keyboard and focus handlers for the chart's focus target. */
export declare function useActive(count: number): {
    active: number | null;
    setActive: import("react").Dispatch<import("react").SetStateAction<number | null>>;
    keys: {
        onKeyDown(event: KeyboardEvent): void;
        onFocus: () => void;
        onBlur: () => void;
        onPointerLeave: () => void;
    };
};
