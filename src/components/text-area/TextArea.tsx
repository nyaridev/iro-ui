// TextArea: a multi-line text input in the field look. It grows with its text up to `maxRows`, and a grip under it
// resizes it: drag for a size of your own, double-click to fit the text again. Inside a Field, Base UI links its label
// and messages.

// ── Dependencies ──────────────────────────
import { Field as BaseField } from "@base-ui/react/field";
import { type ComponentProps, type RefObject, useLayoutEffect, useRef } from "react";
import { ResizeGrip } from "../resize-grip/ResizeGrip";
import { cx } from "../shared/cx";

// ── Types ─────────────────────────────────
export interface TextAreaProps extends ComponentProps<"textarea"> {
  /** Marks it wrong; inside a Field, `error` does this already. */
  invalid?: boolean;
  /** Grow with the text, up to `maxRows` (default true). A size picked with the grip stays until a fit. */
  autoGrow?: boolean;
  /** The most rows it grows to (default 12); after that it scrolls. */
  maxRows?: number;
  /** Monospace text: code, logs, paths. */
  mono?: boolean;
  /** The grip under it that resizes it (default true). */
  resizable?: boolean;
}

// ── Private helpers ───────────────────────
/** The textarea's top and bottom border, which `scrollHeight` leaves out. */
function borderOf(box: HTMLTextAreaElement): number {
  return box.offsetHeight - box.clientHeight;
}

// ── Public API ────────────────────────────
/** A multi-line text input that grows with its text and has a resize grip. */
export function TextArea({
  invalid,
  autoGrow = true,
  maxRows = 12,
  mono,
  resizable = true,
  className,
  ref,
  onInput,
  ...rest
}: TextAreaProps) {
  const box = useRef<HTMLTextAreaElement | null>(null);
  // Set while the grip holds a size someone picked; a fit clears it.
  const sized = useRef(false);

  const grow = () => {
    const element = box.current;
    if (!element || !autoGrow || sized.current) return;
    element.style.height = "auto";
    const style = getComputedStyle(element);
    const line = Number.parseFloat(style.lineHeight) || 20;
    const padding = Number.parseFloat(style.paddingTop) + Number.parseFloat(style.paddingBottom);
    const most = line * maxRows + padding + borderOf(element);
    element.style.height = `${Math.min(element.scrollHeight + borderOf(element), most)}px`;
  };
  // biome-ignore lint/correctness/useExhaustiveDependencies: grows again when a controlled value changes
  useLayoutEffect(grow, [rest.value, autoGrow, maxRows]);

  const setRef = (node: HTMLTextAreaElement | null) => {
    box.current = node;
    if (typeof ref === "function") ref(node);
    else if (ref) (ref as RefObject<HTMLTextAreaElement | null>).current = node;
  };

  const field = (
    <BaseField.Control
      render={
        <textarea
          ref={setRef}
          className={cx("iro-text-area", className)}
          aria-invalid={invalid || undefined}
          data-invalid={invalid || undefined}
          data-mono={mono || undefined}
          data-resizable={resizable || undefined}
          onInput={(event) => {
            grow();
            onInput?.(event);
          }}
          {...rest}
        />
      }
    />
  );
  if (!resizable) return field;
  return (
    <div className="iro-text-area-box">
      {field}
      <ResizeGrip
        target={box}
        label="Resize the text box"
        fitSize={() => ({ height: box.current ? box.current.scrollHeight + borderOf(box.current) : 0 })}
        onResize={(fitted) => {
          sized.current = !fitted;
        }}
      />
    </div>
  );
}
