// Lightbox: pictures one at a time over a dark backdrop, as large as the window allows: arrows and the arrow keys step
// through them (wrapping at the ends), a count shows where you are, captions sit under the picture, and Esc or a
// click outside closes it. On Base UI's dialog, so focus stays inside while it's open.

// ── Dependencies ──────────────────────────
import { Dialog as BaseDialog } from "@base-ui/react/dialog";
import { type ReactElement, type ReactNode, useState } from "react";
import { useIroLayer } from "../../root/IroRoot";
import { IconButton } from "../icon-button/IconButton";
import { cx } from "../shared/cx";
import { ChevronLeftGlyph, ChevronRightGlyph, CloseGlyph } from "../shared/glyphs";

// ── Types ─────────────────────────────────
export interface LightboxImage {
  src: string;
  alt: string;
  caption?: ReactNode;
}

export interface LightboxProps {
  images: LightboxImage[];
  /** The element that opens it; leave it out and control `open` instead. */
  trigger?: ReactElement;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** The picture shown, when the app keeps it (a gallery opens at the one clicked). */
  index?: number;
  onIndexChange?: (index: number) => void;
  /** The picture shown first, when the lightbox keeps it. */
  defaultIndex?: number;
  closeLabel?: string;
  previousLabel?: string;
  nextLabel?: string;
  className?: string;
}

// ── Public API ────────────────────────────
/** A full-window viewer for a set of pictures. */
export function Lightbox({
  images,
  trigger,
  open,
  onOpenChange,
  index,
  onIndexChange,
  defaultIndex = 0,
  closeLabel = "Close",
  previousLabel = "Previous",
  nextLabel = "Next",
  className,
}: LightboxProps) {
  const layer = useIroLayer();
  const [own, setOwn] = useState(defaultIndex);
  const count = images.length;
  const current = Math.min(index ?? own, count - 1);
  const image = images[current];
  const go = (step: number) => {
    const next = (current + step + count) % count;
    setOwn(next);
    onIndexChange?.(next);
  };

  return (
    <BaseDialog.Root open={open} onOpenChange={onOpenChange ? (next) => onOpenChange(next) : undefined}>
      {trigger ? <BaseDialog.Trigger render={trigger} /> : null}
      <BaseDialog.Portal container={layer}>
        <BaseDialog.Backdrop className="iro-lightbox-backdrop" />
        <BaseDialog.Popup
          className={cx("iro-lightbox", className)}
          onKeyDown={(event) => {
            if (count < 2) return;
            if (event.key === "ArrowLeft") go(-1);
            if (event.key === "ArrowRight") go(1);
          }}
        >
          <header className="iro-lightbox-bar">
            <span className="iro-lightbox-count" aria-hidden="true">
              {count > 1 ? `${current + 1} / ${count}` : null}
            </span>
            <BaseDialog.Title className="iro-lightbox-title">{image?.alt}</BaseDialog.Title>
            <BaseDialog.Close render={<IconButton icon={<CloseGlyph />} label={closeLabel} tooltip={false} />} />
          </header>
          {image ? (
            <figure className="iro-lightbox-stage">
              <img key={image.src} src={image.src} alt={image.alt} className="iro-lightbox-img" />
              {image.caption ? <figcaption className="iro-lightbox-caption">{image.caption}</figcaption> : null}
            </figure>
          ) : null}
          {count > 1 ? (
            <>
              <IconButton
                icon={<ChevronLeftGlyph />}
                label={previousLabel}
                size="lg"
                tooltip={false}
                className="iro-lightbox-step"
                data-side="previous"
                onClick={() => go(-1)}
              />
              <IconButton
                icon={<ChevronRightGlyph />}
                label={nextLabel}
                size="lg"
                tooltip={false}
                className="iro-lightbox-step"
                data-side="next"
                onClick={() => go(1)}
              />
            </>
          ) : null}
        </BaseDialog.Popup>
      </BaseDialog.Portal>
    </BaseDialog.Root>
  );
}
