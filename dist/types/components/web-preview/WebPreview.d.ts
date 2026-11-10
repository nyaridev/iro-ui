export interface WebPreviewProps {
    /** The page's address. */
    src?: string;
    /** A page's own HTML, shown in place of loading `src`. */
    html?: string;
    /** Names the frame for screen readers. */
    title: string;
    /** Called with the address typed in, or the one back or forward leads to; the app sets `src` to it. Without it the
     * address bar is read-only and there's no back or forward. */
    onNavigate?: (url: string) => void;
    /** The frame's height in px (default 360). */
    height?: number;
    /** The iframe's sandbox rules; widen them only for pages you trust. */
    sandbox?: string;
    className?: string;
}
/** A sandboxed page in a browser-like frame. */
export declare function WebPreview({ src, html, title, onNavigate, height, sandbox, className, }: WebPreviewProps): import("react").JSX.Element;
