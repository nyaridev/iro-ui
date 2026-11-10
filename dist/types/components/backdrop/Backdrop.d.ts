import { type ComponentProps } from "react";
import type { BackdropOptions } from "../../effects/options";
export interface BackdropProps extends Omit<ComponentProps<"div">, "children">, BackdropOptions {
}
/** Fills its positioned parent behind the content; give the parent `isolation: isolate`. Each layer prop is `true`
 *  or that layer's settings (`dust={{ count: 2 }}`). */
export declare function Backdrop({ liquid, aurora, mesh, spotlight, grid, paper, dust, contours, ink, className, ...rest }: BackdropProps): import("react").JSX.Element;
