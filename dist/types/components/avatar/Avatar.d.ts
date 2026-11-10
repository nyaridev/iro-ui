export type AvatarColor = "red" | "orange" | "yellow" | "green" | "cyan" | "blue" | "purple" | "pink";
export interface AvatarProps {
    /** Whose it is: the initials come from it, and screen readers hear it. */
    name: string;
    src?: string | null;
    /** A palette color for the initials and the ring (default blue). */
    color?: AvatarColor;
    /** Width and height in px (default 32). */
    size?: number;
    ring?: boolean;
    className?: string;
}
/** A round avatar with an initials fallback. */
export declare function Avatar({ name, src, color, size, ring, className }: AvatarProps): import("react").JSX.Element;
