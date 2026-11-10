import type { ComponentProps, ReactNode } from "react";
export interface StepperStep {
    /** The step's name; unique within the stepper. */
    label: string;
    /** A line under the label. */
    description?: ReactNode;
}
export interface StepperProps extends Omit<ComponentProps<"ol">, "children"> {
    steps: StepperStep[];
    /** The step in progress, from 0; the ones before it are done, and `steps.length` means all are. */
    current: number;
    /** `horizontal` (default) or `vertical`. */
    orientation?: "horizontal" | "vertical";
    /** Makes the finished steps buttons, to go back to one. */
    onStepClick?: (index: number) => void;
}
/** Numbered steps, marked done, current or waiting. */
export declare function Stepper({ steps, current, orientation, onStepClick, className, ...rest }: StepperProps): import("react").JSX.Element;
