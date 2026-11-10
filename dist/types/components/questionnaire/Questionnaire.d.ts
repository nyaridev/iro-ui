import { type ReactNode } from "react";
export interface QuestionOption {
    value: string;
    label: string;
    description?: ReactNode;
}
export interface Question {
    id: string;
    question: ReactNode;
    options: QuestionOption[];
    /** Lets the reader pick several. */
    multiple?: boolean;
    /** Adds an "Other" choice with a field. */
    other?: boolean;
}
export interface QuestionnaireProps {
    questions: Question[];
    /** Each question's picks by id; "Other" arrives as the typed text. */
    onSubmit: (answers: Record<string, string[]>) => void;
    /** Adds a Skip button that calls this. */
    onSkip?: () => void;
    submitLabel?: string;
    skipLabel?: string;
    otherLabel?: string;
    className?: string;
}
/** A short form of questions with choices. */
export declare function Questionnaire({ questions, onSubmit, onSkip, submitLabel, skipLabel, otherLabel, className, }: QuestionnaireProps): import("react").JSX.Element;
