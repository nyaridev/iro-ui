// Carousel: slides in a row that scroll sideways and snap into place: swipe or scroll them, or use the arrows and
// dots. It's the browser's own scrolling (scroll snap), so touch, trackpads and the keyboard all work; the buttons
// only scroll it. Slides glide in full motion and jump otherwise.

// ── Dependencies ──────────────────────────
import { Children, type ComponentProps, type CSSProperties, type ReactNode, useRef, useState } from "react";
import { motionOf } from "../../effects/motion";
import { IconButton } from "../icon-button/IconButton";
import { cx } from "../shared/cx";
import { ChevronLeftGlyph, ChevronRightGlyph } from "../shared/glyphs";

// ── Types ─────────────────────────────────
export interface CarouselProps extends Omit<ComponentProps<"section">, "children"> {
  /** The slides, one child each. */
  children: ReactNode;
  /** What it shows, for screen readers: "Featured projects". */
  label: string;
  /** How many slides show at once (default 1). */
  perView?: number;
  /** Dots under the slides, one per position (default true). */
  dots?: boolean;
  previousLabel?: string;
  nextLabel?: string;
}

// ── Public API ────────────────────────────
/** Slides that scroll sideways, with arrows and dots. */
export function Carousel({
  children,
  label,
  perView = 1,
  dots = true,
  previousLabel = "Previous slide",
  nextLabel = "Next slide",
  className,
  style,
  ...rest
}: CarouselProps) {
  const slides = Children.toArray(children);
  const track = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const last = Math.max(0, slides.length - perView);

  const slideWidth = () => {
    const node = track.current;
    const first = node?.firstElementChild as HTMLElement | null;
    return first ? first.offsetWidth + Number.parseFloat(getComputedStyle(node as Element).columnGap || "0") : 1;
  };
  const go = (to: number) => {
    const node = track.current;
    if (!node) return;
    const smooth = ["full", "smooth"].includes(motionOf(node));
    node.scrollTo({ left: Math.min(Math.max(to, 0), last) * slideWidth(), behavior: smooth ? "smooth" : "auto" });
  };

  return (
    <section
      aria-roledescription="carousel"
      aria-label={label}
      className={cx("iro-carousel", className)}
      style={{ "--carousel-per-view": perView, ...style } as CSSProperties}
      {...rest}
    >
      <div
        ref={track}
        // biome-ignore lint/a11y/noNoninteractiveTabindex: a track that scrolls must be reachable by keyboard.
        tabIndex={0}
        className="iro-carousel-track"
        onScroll={(event) => setIndex(Math.round(event.currentTarget.scrollLeft / slideWidth()))}
      >
        {slides.map((slide, position) => (
          // biome-ignore lint/a11y/useSemanticElements: a fieldset is for form fields; a slide is a group of content.
          <div
            // biome-ignore lint/suspicious/noArrayIndexKey: a slide is its place in the row.
            key={position}
            role="group"
            aria-roledescription="slide"
            aria-label={`${position + 1} of ${slides.length}`}
            className="iro-carousel-slide"
          >
            {slide}
          </div>
        ))}
      </div>
      <div className="iro-carousel-controls">
        <IconButton
          size="sm"
          variant="secondary"
          icon={<ChevronLeftGlyph />}
          label={previousLabel}
          tooltip={false}
          disabled={index <= 0}
          onClick={() => go(index - 1)}
        />
        {dots ? (
          <div className="iro-carousel-dots">
            {Array.from({ length: last + 1 }, (_, position) => (
              <button
                // biome-ignore lint/suspicious/noArrayIndexKey: a dot is a position.
                key={position}
                type="button"
                className="iro-carousel-dot"
                aria-label={`Go to slide ${position + 1}`}
                aria-current={position === index || undefined}
                onClick={() => go(position)}
              />
            ))}
          </div>
        ) : null}
        <IconButton
          size="sm"
          variant="secondary"
          icon={<ChevronRightGlyph />}
          label={nextLabel}
          tooltip={false}
          disabled={index >= last}
          onClick={() => go(index + 1)}
        />
      </div>
    </section>
  );
}
