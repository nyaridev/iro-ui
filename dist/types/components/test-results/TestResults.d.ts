import type { ReactNode } from "react";
declare const STATUSES: {
    passed: {
        label: string;
        icon: import("react").JSX.Element;
    };
    failed: {
        label: string;
        icon: import("react").JSX.Element;
    };
    skipped: {
        label: string;
        icon: import("react").JSX.Element;
    };
    running: {
        label: string;
        icon: import("react").JSX.Element;
    };
};
export type TestStatus = keyof typeof STATUSES;
export interface TestCase {
    name: string;
    status: TestStatus;
    /** In milliseconds. */
    duration?: number;
    /** What went wrong: a message, a StackTrace, a diff. */
    error?: ReactNode;
}
export interface TestSuite {
    /** A file or a describe block; unique within the run. */
    name: string;
    tests: TestCase[];
}
export interface TestResultsProps {
    suites: TestSuite[];
    /** Over the counts: "Unit tests", a run's name. */
    title?: ReactNode;
    className?: string;
}
/** A test run's counts and its suites, failures open. */
export declare function TestResults({ suites, title, className }: TestResultsProps): import("react").JSX.Element;
export {};
