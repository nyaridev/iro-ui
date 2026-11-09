// Image: a picture that holds its shape while it loads (a pulsing placeholder), fades in when it arrives and shows
// its alt text when it can't load. `ratio` keeps the space; props other than these go to the img (srcSet, loading).

// ── Dependencies ──────────────────────────
import { type ComponentProps, type CSSProperties, type ReactNode, useState } from "react";
import { cx } from "../shared/cx";
import { ImageGlyph } from "../shared/glyphs";
import { Skeleton } from "../skeleton/Skeleton";

// ── Types ─────────────────────────────────
export interface ImageProps extends Omit<ComponentProps<"img">, "children"> {
  /** Required: it's read out, and shown if the image fails. */
  alt: string;
  /** Width over height, as a number (16 / 9) or CSS ("4 / 3"); keeps the space while it loads. */
  ratio?: number | string;
  /** How it fills a `ratio` box (default "cover"). */
  fit?: "cover" | "contain";
  caption?: ReactNode;
  /** In place of the icon and alt text when it fails. */
  fallback?: ReactNode;
}

// ── Public API ────────────────────────────
/** An img with loading and failed states. */
export function Image({
  src,
  alt,
  ratio,
  fit = "cover",
  caption,
  fallback,
  onLoad,
  onError,
  className,
  style,
  ...rest
}: ImageProps) {
  const [state, setState] = useState<"loading" | "loaded" | "failed">("loading");
  const [shown, setShown] = useState(src);
  if (src !== shown) {
    setShown(src);
    setState("loading");
  }

  return (
    <figure
      data-state={state}
      data-fit={fit}
      data-ratio={ratio !== undefined || undefined}
      className={cx("iro-image", className)}
      style={{ "--image-ratio": ratio, ...style } as CSSProperties}
    >
      <div className="iro-image-frame">
        {state === "loading" ? <Skeleton className="iro-image-placeholder" /> : null}
        {state === "failed" ? (
          <div className="iro-image-failed" role="img" aria-label={alt}>
            {fallback ?? (
              <>
                <ImageGlyph />
                <span>{alt}</span>
              </>
            )}
          </div>
        ) : (
          <img
            src={src}
            alt={alt}
            className="iro-image-img"
            {...rest}
            onLoad={(event) => {
              setState("loaded");
              onLoad?.(event);
            }}
            onError={(event) => {
              setState("failed");
              onError?.(event);
            }}
          />
        )}
      </div>
      {caption ? <figcaption className="iro-image-caption">{caption}</figcaption> : null}
    </figure>
  );
}
