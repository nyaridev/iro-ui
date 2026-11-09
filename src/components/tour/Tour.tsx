// Tour: a guided tour, one card at a time next to a highlighted part of the page. Steps point at elements by CSS
// selector (`[data-tour="editor"]`); a `display: contents` wrapper is measured by its children. The rest of the page
// is dimmed but stays visible. → and Enter go on, ← goes back, Escape skips. It follows resizes and scrolling. A
// modal Base UI dialog, so focus stays on the card.

// ── Dependencies ──────────────────────────
import { Dialog as BaseDialog } from "@base-ui/react/dialog";
import { type KeyboardEvent, type ReactNode, useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useIroLayer } from "../../root/IroRoot";
import { Button } from "../button/Button";
import { cx } from "../shared/cx";

// ── Constants ─────────────────────────────
const CARD_WIDTH = 320;
/** Room between the target and the highlight's edge, and between the highlight and the card. */
const PAD = 6;
const GAP = 12;
const EDGE = 8;

// ── Types ─────────────────────────────────
export interface TourStep {
  /** A CSS selector for the part to highlight; when nothing matches, the card sits in the middle. */
  target: string;
  title: string;
  text: ReactNode;
  /** Where the card goes next to the target (default below). */
  placement?: "bottom" | "top" | "right" | "left";
}

export interface TourProps {
  steps: TourStep[];
  open: boolean;
  /** `finished` is true after the last step, false when skipped. */
  onClose: (finished: boolean) => void;
  className?: string;
}

interface Box {
  x: number;
  y: number;
  width: number;
  height: number;
}

// ── Private helpers ───────────────────────
/** The target's box on screen, or its children's together when it has no box of its own. */
function measure(selector: string): Box | null {
  const element = document.querySelector(selector);
  if (!element) return null;
  let rect = element.getBoundingClientRect();
  if (rect.width === 0 && rect.height === 0 && element.children.length) {
    const rects = Array.from(element.children, (child) => child.getBoundingClientRect());
    const left = Math.min(...rects.map((r) => r.left));
    const top = Math.min(...rects.map((r) => r.top));
    rect = new DOMRect(
      left,
      top,
      Math.max(...rects.map((r) => r.right)) - left,
      Math.max(...rects.map((r) => r.bottom)) - top,
    );
  }
  if (rect.width === 0 && rect.height === 0) return null;
  return { x: rect.left, y: rect.top, width: rect.width, height: rect.height };
}

/** Where the card goes: beside the target as asked, above when it doesn't fit below, always on screen. */
function cardPlace(box: Box | null, placement: TourStep["placement"], cardHeight: number) {
  const width = window.innerWidth;
  const height = window.innerHeight;
  // Narrower than the window on a phone.
  const card = Math.min(CARD_WIDTH, width - 2 * EDGE);
  if (!box) return { left: width / 2 - card / 2, top: height / 2 - cardHeight / 2, width: card };
  let left = box.x;
  let top = box.y + box.height + PAD + GAP;
  if (placement === "top") top = box.y - PAD - GAP - cardHeight;
  if (placement === "right" || placement === "left") {
    left = placement === "right" ? box.x + box.width + PAD + GAP : box.x - PAD - GAP - card;
    top = box.y;
  }
  if (top + cardHeight > height - EDGE && placement !== "top") top = box.y - PAD - GAP - cardHeight;
  return {
    left: Math.min(Math.max(EDGE, left), width - card - EDGE),
    top: Math.min(Math.max(EDGE, top), height - cardHeight - EDGE),
    width: card,
  };
}

// ── Public API ────────────────────────────
/** A step-by-step tour over the page. */
export function Tour({ steps, open, onClose, className }: TourProps) {
  const layer = useIroLayer();
  const [index, setIndex] = useState(0);
  const [box, setBox] = useState<Box | null>(null);
  const [cardHeight, setCardHeight] = useState(170);
  const card = useRef<HTMLDivElement>(null);
  // Focus starts on Next, so Enter goes on (as on a focused Skip it would skip).
  const nextButton = useRef<HTMLButtonElement>(null);
  const step = steps[index];

  useEffect(() => {
    if (open) setIndex(0);
  }, [open]);

  const update = useCallback(() => {
    if (step) setBox(measure(step.target));
    if (card.current) setCardHeight(card.current.offsetHeight);
  }, [step]);

  useLayoutEffect(() => {
    if (!open || !step) return;
    const target = document.querySelector(step.target);
    target?.scrollIntoView({ block: "nearest" });
    update();
    window.addEventListener("resize", update);
    window.addEventListener("scroll", update, true);
    // The highlighted part can change size as it loads (thumbnails, a layout).
    const observer = new ResizeObserver(update);
    if (target) {
      observer.observe(target);
      for (const child of Array.from(target.children)) observer.observe(child);
    }
    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("scroll", update, true);
      observer.disconnect();
    };
  }, [open, step, update]);

  const next = () => (index >= steps.length - 1 ? onClose(true) : setIndex(index + 1));
  const back = () => setIndex(Math.max(0, index - 1));
  const onKeyDown = (event: KeyboardEvent) => {
    // Enter on a focused button (Skip, Back) is that button's own.
    if (event.key === "ArrowRight" || (event.key === "Enter" && !(event.target instanceof HTMLButtonElement))) next();
    else if (event.key === "ArrowLeft") back();
    else return;
    event.preventDefault();
  };

  const place = cardPlace(box, step?.placement, cardHeight);
  return (
    <BaseDialog.Root
      open={open && Boolean(step)}
      onOpenChange={(next) => !next && onClose(false)}
      disablePointerDismissal
    >
      <BaseDialog.Portal container={layer}>
        {/* The dim layer is one big shadow around the highlighted box. */}
        <div
          aria-hidden="true"
          className="iro-tour-spotlight"
          data-empty={box ? undefined : true}
          style={
            box
              ? { left: box.x - PAD, top: box.y - PAD, width: box.width + PAD * 2, height: box.height + PAD * 2 }
              : undefined
          }
        />
        {step ? (
          <BaseDialog.Popup
            ref={card}
            initialFocus={nextButton}
            className={cx("iro-tour", className)}
            style={{ left: place.left, top: place.top, width: place.width }}
            onKeyDown={onKeyDown}
          >
            <div className="iro-tour-progress">
              <span className="iro-tour-count">
                {index + 1} / {steps.length}
              </span>
              <span className="iro-tour-dots">
                {steps.map((item, at) => (
                  <span
                    key={item.target + item.title}
                    className="iro-tour-dot"
                    data-current={at === index || undefined}
                  />
                ))}
              </span>
            </div>
            <BaseDialog.Title className="iro-tour-title">{step.title}</BaseDialog.Title>
            <BaseDialog.Description render={<div />} className="iro-tour-text">
              {step.text}
            </BaseDialog.Description>
            <div className="iro-tour-actions">
              <Button size="sm" variant="ghost" onClick={() => onClose(false)}>
                Skip the tour
              </Button>
              <span className="iro-tour-moves">
                {index > 0 ? (
                  <Button size="sm" variant="secondary" onClick={back}>
                    Back
                  </Button>
                ) : null}
                <Button ref={nextButton} size="sm" variant="primary" onClick={next}>
                  {index === steps.length - 1 ? "Done" : "Next"}
                </Button>
              </span>
            </div>
          </BaseDialog.Popup>
        ) : null}
      </BaseDialog.Portal>
    </BaseDialog.Root>
  );
}
