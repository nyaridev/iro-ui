/** The value of the "Other" choice. */
export declare const OTHER = "__other__";
/** The answers to send: each question's picks, with "Other" replaced by its text. */
export declare function collectAnswers(picked: Record<string, string[]>, others: Record<string, string>): Record<string, string[]>;
/** Whether every question in `ids` has an answer. */
export declare function isComplete(ids: string[], picked: Record<string, string[]>, others: Record<string, string>): boolean;
