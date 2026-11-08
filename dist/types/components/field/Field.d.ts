import type { ComponentProps, ReactNode } from "react";
export interface FieldProps extends Omit<ComponentProps<"div">, "children"> {
    label: ReactNode;
    /** A line under the control on what to enter. Hidden while there's an error. */
    hint?: ReactNode;
    /** What's wrong; shows in the danger color and marks the control invalid. */
    error?: ReactNode;
    /** `top` (default): label above. `left`: a settings row, label beside the control. */
    layout?: "top" | "left";
    disabled?: boolean;
    /** The control: a TextField, TextArea, NumberField… */
    children: ReactNode;
}
/** A labelled control with an optional hint or error. */
export declare function Field({ label, hint, error, layout, disabled, className, children, ...rest }: FieldProps): import("react").JSX.Element;
