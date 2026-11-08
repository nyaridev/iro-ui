import type { ReactNode } from "react";
declare const ICONS: {
    info: import("react").JSX.Element;
    success: import("react").JSX.Element;
    warning: import("react").JSX.Element;
    error: import("react").JSX.Element;
};
export interface ToastOptions {
    title: ReactNode;
    description?: ReactNode;
    tone?: keyof typeof ICONS;
    /** One button in the toast: Undo, Open, Retry. */
    action?: {
        label: ReactNode;
        onClick: () => void;
    };
    /** Milliseconds before it closes on its own; 0 keeps it until dismissed. Base UI's default is 5000. */
    timeout?: number;
}
export interface ToasterProps {
    /** Accessible name of each toast's × button. */
    closeLabel?: string;
}
/** Shows a toast; returns its id for `dismissToast`. */
export declare function toast({ title, description, tone, action, timeout }: ToastOptions): string;
/** Closes a toast early. */
export declare function dismissToast(id: string): void;
/** Draws the toasts. Mount it once, inside the app's IroRoot. */
export declare function Toaster({ closeLabel }: ToasterProps): import("react").JSX.Element;
export {};
