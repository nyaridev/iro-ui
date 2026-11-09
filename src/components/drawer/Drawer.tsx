// Drawer: a panel that slides up from the bottom, the phone-friendly Dialog. Drag it down (or press Escape, or tap
// outside) to close it. Base UI's drawer handles the swipe; for side panels, use Sheet.

// ── Dependencies ──────────────────────────
import { Drawer as BaseDrawer } from "@base-ui/react/drawer";
import type { ReactElement, ReactNode } from "react";
import { useIroLayer } from "../../root/IroRoot";
import { cx } from "../shared/cx";

// ── Types ─────────────────────────────────
export interface DrawerProps {
  title: ReactNode;
  /** A line under the title; screen readers read it with the title. */
  description?: ReactNode;
  children?: ReactNode;
  /** Buttons at the bottom, full width on phones. */
  footer?: ReactNode;
  /** The element that opens it; leave it out and control `open` instead. */
  trigger?: ReactElement;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Goes on the panel. */
  className?: string;
}

// ── Public API ────────────────────────────
/** A bottom panel that can be dragged down to close. */
export function Drawer({ title, description, children, footer, trigger, open, onOpenChange, className }: DrawerProps) {
  const layer = useIroLayer();
  return (
    <BaseDrawer.Root
      swipeDirection="down"
      open={open}
      onOpenChange={onOpenChange ? (next) => onOpenChange(next) : undefined}
    >
      {trigger ? <BaseDrawer.Trigger render={trigger} /> : null}
      <BaseDrawer.Portal container={layer}>
        <BaseDrawer.Backdrop className="iro-dialog-backdrop" />
        <BaseDrawer.Viewport className="iro-drawer-viewport">
          <BaseDrawer.Popup className={cx("iro-drawer", className)}>
            <span className="iro-drawer-handle" aria-hidden="true" />
            <BaseDrawer.Content className="iro-drawer-content">
              <BaseDrawer.Title className="iro-drawer-title">{title}</BaseDrawer.Title>
              {description ? (
                <BaseDrawer.Description className="iro-drawer-description">{description}</BaseDrawer.Description>
              ) : null}
              {children ? <div className="iro-drawer-body">{children}</div> : null}
              {footer ? <footer className="iro-drawer-footer">{footer}</footer> : null}
            </BaseDrawer.Content>
          </BaseDrawer.Popup>
        </BaseDrawer.Viewport>
      </BaseDrawer.Portal>
    </BaseDrawer.Root>
  );
}
