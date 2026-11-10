import type { ReactNode } from "react";
declare const FILE_MARKS: {
    added: string;
    modified: string;
    deleted: string;
    renamed: string;
};
export interface CommitFile {
    path: string;
    additions: number;
    deletions: number;
    status?: keyof typeof FILE_MARKS;
}
export interface CommitProps {
    hash: string;
    /** The whole message: the first line is the subject, the rest the body. */
    message: string;
    author: {
        name: string;
        avatar?: string;
    };
    /** When, as the app words it: "2 hours ago", a date. */
    date?: ReactNode;
    files?: CommitFile[];
    /** Shows the files from the start (default false). */
    defaultOpen?: boolean;
    className?: string;
}
/** A commit's message, author, hash and changed files. */
export declare function Commit({ hash, message, author, date, files, defaultOpen, className }: CommitProps): import("react").JSX.Element;
export {};
