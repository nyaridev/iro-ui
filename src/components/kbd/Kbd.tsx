// Kbd: a keyboard key, for shortcuts in menus, tooltips and help text.

import type { ComponentProps } from "react";
import { cx } from "../shared/cx";

/** A key cap: `<Kbd>Ctrl</Kbd> <Kbd>K</Kbd>`. */
export function Kbd({ className, ...rest }: ComponentProps<"kbd">) {
  return <kbd className={cx("iro-kbd", className)} {...rest} />;
}
