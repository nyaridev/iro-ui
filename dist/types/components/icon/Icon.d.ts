import { type ComponentProps } from "react";
import { type IconData } from "../../icons/icon";
export interface IconProps extends Omit<ComponentProps<"svg">, "children"> {
    /** The icon, from `iro-ui/icons`: `<Icon icon={FolderIcon} />`. */
    icon: IconData;
    /** Width and height: pixels, or any CSS length (`"1em"` follows the text). Default 16. */
    size?: number | string;
    /** Names the icon for screen readers; left out, the icon is decoration and hidden from them. */
    label?: string;
}
/** An icon in the style's look: line drawings in kon, solid ones in sumi. */
export declare function Icon({ icon, size, label, className, ...rest }: IconProps): import("react").JSX.Element;
