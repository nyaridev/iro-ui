import type { ComponentProps } from "react";
import { type AvatarColor } from "../avatar/Avatar";
export interface AvatarGroupPerson {
    name: string;
    src?: string | null;
    color?: AvatarColor;
}
export interface AvatarGroupProps extends Omit<ComponentProps<"div">, "children"> {
    people: AvatarGroupPerson[];
    /** How many avatars show before the count (default 4). */
    max?: number;
    /** Width and height of each, in px (default 28). */
    size?: number;
    /** Names the group for screen readers (default: everyone's names). */
    label?: string;
}
/** Overlapping avatars with a "+N" count for the rest. */
export declare function AvatarGroup({ people, max, size, label, className, style, ...rest }: AvatarGroupProps): import("react").JSX.Element;
