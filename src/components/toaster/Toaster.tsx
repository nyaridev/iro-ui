// Toasts: `toast()` shows a short message from anywhere; `<Toaster />`, mounted once inside the app's IroRoot, draws
// them in the bottom-right corner. They close on their own unless the user hovers or focuses them.

// ── Dependencies ──────────────────────────
import { Toast } from "@base-ui/react/toast";
import type { ReactNode } from "react";
import { useIroLayer } from "../../root/IroRoot";
import { Button } from "../button/Button";
import { CloseGlyph, DangerGlyph, InfoGlyph, SuccessGlyph, WarningGlyph } from "../shared/glyphs";

// ── Constants ─────────────────────────────
const ICONS = {
  info: <InfoGlyph />,
  success: <SuccessGlyph />,
  warning: <WarningGlyph />,
  error: <DangerGlyph />,
};

// ── Types ─────────────────────────────────
export interface ToastOptions {
  title: ReactNode;
  description?: ReactNode;
  tone?: keyof typeof ICONS;
  /** One button in the toast: Undo, Open, Retry. */
  action?: { label: ReactNode; onClick: () => void };
  /** Milliseconds before it closes on its own; 0 keeps it until dismissed. Base UI's default is 5000. */
  timeout?: number;
}

export interface ToasterProps {
  /** Accessible name of each toast's × button. */
  closeLabel?: string;
}

// ── State ─────────────────────────────────
// One manager for the whole app, so toast() works outside React components.
const manager = Toast.createToastManager();

// ── Private helpers ───────────────────────
/** The open toasts, newest last. */
function ToastList({ closeLabel }: { closeLabel: string }) {
  const { toasts } = Toast.useToastManager();
  return toasts.map((item) => {
    const tone = (item.type ?? "info") as keyof typeof ICONS;
    return (
      <Toast.Root key={item.id} toast={item} className="iro-toast" data-tone={tone}>
        <Toast.Content className="iro-toast-content">
          <span className="iro-toast-icon">{ICONS[tone] ?? ICONS.info}</span>
          <div className="iro-toast-text">
            <Toast.Title className="iro-toast-title" />
            <Toast.Description className="iro-toast-description" />
          </div>
          {item.actionProps ? <Toast.Action render={<Button size="sm" />} /> : null}
          <Toast.Close className="iro-toast-close" aria-label={closeLabel}>
            <CloseGlyph />
          </Toast.Close>
        </Toast.Content>
      </Toast.Root>
    );
  });
}

// ── Public API ────────────────────────────
/** Shows a toast; returns its id for `dismissToast`. */
export function toast({ title, description, tone = "info", action, timeout }: ToastOptions): string {
  return manager.add({
    title,
    description,
    type: tone,
    timeout,
    actionProps: action ? { children: action.label, onClick: action.onClick } : undefined,
  });
}

/** Closes a toast early. */
export function dismissToast(id: string): void {
  manager.close(id);
}

/** Draws the toasts. Mount it once, inside the app's IroRoot. */
export function Toaster({ closeLabel = "Dismiss" }: ToasterProps) {
  const layer = useIroLayer();
  return (
    <Toast.Provider toastManager={manager}>
      <Toast.Portal container={layer}>
        <Toast.Viewport className="iro-toaster">
          <ToastList closeLabel={closeLabel} />
        </Toast.Viewport>
      </Toast.Portal>
    </Toast.Provider>
  );
}
