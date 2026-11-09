// Toolbar: a row of tool buttons (an editor's bold and italic, a canvas's tools) that the keyboard reaches as one
// stop: Tab enters, the arrow keys move between buttons. Its parts, ToolbarButton and ToolbarSeparator, live here
// because they only work inside it. Base UI's toolbar handles the keys.

// ── Dependencies ──────────────────────────
import { Toolbar as BaseToolbar } from "@base-ui/react/toolbar";
import type { ComponentProps, ReactNode } from "react";
import { Button } from "../button/Button";
import { IconButton } from "../icon-button/IconButton";
import { cx } from "../shared/cx";

// ── Types ─────────────────────────────────
export interface ToolbarProps extends Omit<ComponentProps<"div">, "dir"> {
  /** `horizontal` (default) or `vertical`. */
  orientation?: "horizontal" | "vertical";
  /** What the tools are for: "Text formatting". */
  "aria-label": string;
}

export interface ToolbarButtonProps {
  icon?: ReactNode;
  /** What it does: the accessible name, and the tooltip of an icon-only button. */
  label: string;
  /** Text beside the icon; left out, the button is icon-only. */
  children?: ReactNode;
  /** On, for toggles like bold (`aria-pressed`). */
  active?: boolean;
  /** A keyboard shortcut for the tooltip: `"Ctrl B"`. */
  shortcut?: string;
  disabled?: boolean;
  onClick?: () => void;
}

// ── Public API ────────────────────────────
/** A row of tools reached as one keyboard stop. */
export function Toolbar({ orientation = "horizontal", className, ...rest }: ToolbarProps) {
  return <BaseToolbar.Root orientation={orientation} className={cx("iro-toolbar", className)} {...rest} />;
}

/** A button in a Toolbar: icon-only with a tooltip, or with text. */
export function ToolbarButton({ icon, label, children, active, shortcut, disabled, onClick }: ToolbarButtonProps) {
  return (
    <BaseToolbar.Button
      disabled={disabled}
      render={
        children ? (
          <Button size="sm" variant="ghost" icon={icon} pressed={active} aria-label={label} onClick={onClick}>
            {children}
          </Button>
        ) : (
          <IconButton size="sm" icon={icon} label={label} shortcut={shortcut} active={active} onClick={onClick} />
        )
      }
    />
  );
}

/** A line between groups of tools. */
export function ToolbarSeparator() {
  return <BaseToolbar.Separator className="iro-toolbar-separator" />;
}
