import type { ReactNode } from "react";
export interface PlanStep {
    id: string;
    label: ReactNode;
    status: "waiting" | "running" | "done" | "error";
    /** A line under the label: what came of it. */
    detail?: ReactNode;
}
export interface PlanProps {
    steps: PlanStep[];
    /** The heading (default "Plan"). */
    title?: ReactNode;
    /** The count's words (default "2 of 5 done"). */
    progressLabel?: (done: number, total: number) => string;
    className?: string;
}
/** A checklist of the assistant's steps. */
export declare function Plan({ steps, title, progressLabel, className, }: PlanProps): import("react").JSX.Element;
