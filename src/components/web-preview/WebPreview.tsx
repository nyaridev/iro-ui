// WebPreview: a page shown in a small browser frame: reload, the address, open in a new tab, and the page in a
// sandboxed iframe. It shows a URL (`src`) or a page's own HTML (`html`, a generated page; the address bar still
// shows `src` when given). With `onNavigate`, the address can be edited and Enter hands the new one to the app, and
// back and forward step through the addresses it has shown. Links followed inside the page aren't among them: the
// browser keeps another site's history private.

// ── Dependencies ──────────────────────────
import { useState } from "react";
import { IconButton } from "../icon-button/IconButton";
import { cx } from "../shared/cx";
import { ArrowLeftGlyph, ArrowRightGlyph, ExternalLinkGlyph, RefreshGlyph } from "../shared/glyphs";

// ── Constants ─────────────────────────────
/** Scripts and forms run, but the page can't reach the app's origin, cookies or storage. */
const SANDBOX = "allow-scripts allow-forms allow-popups";

// ── Types ─────────────────────────────────
export interface WebPreviewProps {
  /** The page's address. */
  src?: string;
  /** A page's own HTML, shown in place of loading `src`. */
  html?: string;
  /** Names the frame for screen readers. */
  title: string;
  /** Called with the address typed in, or the one back or forward leads to; the app sets `src` to it. Without it the
   * address bar is read-only and there's no back or forward. */
  onNavigate?: (url: string) => void;
  /** The frame's height in px (default 360). */
  height?: number;
  /** The iframe's sandbox rules; widen them only for pages you trust. */
  sandbox?: string;
  className?: string;
}

// ── Public API ────────────────────────────
/** A sandboxed page in a browser-like frame. */
export function WebPreview({
  src,
  html,
  title,
  onNavigate,
  height = 360,
  sandbox = SANDBOX,
  className,
}: WebPreviewProps) {
  const [loads, setLoads] = useState(0);
  const [trail, setTrail] = useState({ list: src ? [src] : [], at: 0 });
  // A new address from the app or the address bar drops what was ahead of the current one, as browsers do.
  if (src && src !== trail.list[trail.at]) {
    const list = [...trail.list.slice(0, trail.at + 1), src];
    setTrail({ list, at: list.length - 1 });
  }
  const step = (by: number) => {
    const at = trail.at + by;
    setTrail({ ...trail, at });
    onNavigate?.(trail.list[at]);
  };
  const address = src ?? (html ? "about:srcdoc" : "");
  const external = !html && src && /^https?:\/\//.test(src);

  return (
    <div className={cx("iro-web-preview", className)}>
      <div className="iro-web-preview-bar">
        {onNavigate ? (
          <>
            <IconButton
              size="sm"
              icon={<ArrowLeftGlyph />}
              label="Back"
              disabled={trail.at === 0}
              onClick={() => step(-1)}
            />
            <IconButton
              size="sm"
              icon={<ArrowRightGlyph />}
              label="Forward"
              disabled={trail.at >= trail.list.length - 1}
              onClick={() => step(1)}
            />
          </>
        ) : null}
        <IconButton size="sm" icon={<RefreshGlyph />} label="Reload" onClick={() => setLoads(loads + 1)} />
        <input
          key={address}
          className="iro-web-preview-address"
          aria-label="Address"
          defaultValue={address}
          readOnly={!onNavigate}
          spellCheck={false}
          onKeyDown={(event) => {
            if (event.key === "Enter" && onNavigate) onNavigate(event.currentTarget.value.trim());
          }}
        />
        {external ? (
          <IconButton
            size="sm"
            icon={<ExternalLinkGlyph />}
            label="Open in a new tab"
            onClick={() => window.open(src, "_blank", "noopener,noreferrer")}
          />
        ) : null}
      </div>
      <iframe
        key={loads}
        className="iro-web-preview-frame"
        title={title}
        src={html ? undefined : src}
        srcDoc={html}
        sandbox={sandbox}
        style={{ height }}
      />
    </div>
  );
}
