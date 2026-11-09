// ScrollArea: a box that scrolls with thin bars of the style's look laid over its edge, showing while it scrolls or
// is pointed at, so content keeps its full width. Base UI's scroll area keeps the native scrolling (wheel, touch,
// keys); only the bars are drawn.

// ── Dependencies ──────────────────────────
import { ScrollArea as BaseScrollArea } from "@base-ui/react/scroll-area";
import type { CSSProperties, ReactNode } from "react";
import { cx } from "../shared/cx";

// ── Types ─────────────────────────────────
export interface ScrollAreaProps {
  children: ReactNode;
  /** Which ways it scrolls (default `vertical`). */
  direction?: "vertical" | "horizontal" | "both";
  /** The most it grows before scrolling: a number of px or any CSS length. */
  maxHeight?: number | string;
  /** Fades the content into the edge it continues past. */
  fade?: boolean;
  className?: string;
  /** Names the area for keyboard users, who can focus it to scroll. */
  "aria-label"?: string;
}

// ── Public API ────────────────────────────
/** A scrolling box with overlay scrollbars. */
export function ScrollArea({
  children,
  direction = "vertical",
  maxHeight,
  fade = false,
  className,
  "aria-label": ariaLabel,
}: ScrollAreaProps) {
  const bars = direction === "both" ? (["vertical", "horizontal"] as const) : ([direction] as const);
  return (
    <BaseScrollArea.Root
      className={cx("iro-scroll-area", className)}
      data-fade={fade || undefined}
      style={{ "--scroll-area-max": typeof maxHeight === "number" ? `${maxHeight}px` : maxHeight } as CSSProperties}
    >
      <BaseScrollArea.Viewport className="iro-scroll-area-viewport" aria-label={ariaLabel}>
        <BaseScrollArea.Content className="iro-scroll-area-content" data-direction={direction}>
          {children}
        </BaseScrollArea.Content>
      </BaseScrollArea.Viewport>
      {bars.map((orientation) => (
        <BaseScrollArea.Scrollbar key={orientation} orientation={orientation} className="iro-scroll-area-bar">
          <BaseScrollArea.Thumb className="iro-scroll-area-thumb" />
        </BaseScrollArea.Scrollbar>
      ))}
      {direction === "both" ? <BaseScrollArea.Corner /> : null}
    </BaseScrollArea.Root>
  );
}
