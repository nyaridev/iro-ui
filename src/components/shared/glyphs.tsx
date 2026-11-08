// Glyphs: the few small icons components draw themselves (checks, steppers, close, status). Internal; apps pass
// their own icons through `icon` props.

// ── Dependencies ──────────────────────────
import type { ReactNode } from "react";

// ── Private helpers ───────────────────────
/** A 24-grid stroke icon sized by the surrounding font, colored by `currentColor`. */
function Glyph({ children }: { children: ReactNode }) {
  return (
    <svg
      className="iro-glyph"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

// ── Public API ────────────────────────────
export const CheckGlyph = () => (
  <Glyph>
    <path d="M5 12.5l4.5 4.5L19 7.5" />
  </Glyph>
);

export const MinusGlyph = () => (
  <Glyph>
    <path d="M6 12h12" />
  </Glyph>
);

export const PlusGlyph = () => (
  <Glyph>
    <path d="M12 6v12M6 12h12" />
  </Glyph>
);

export const ChevronDownGlyph = () => (
  <Glyph>
    <path d="M6 9.5l6 6 6-6" />
  </Glyph>
);

export const CopyGlyph = () => (
  <Glyph>
    <rect x="8" y="8" width="12" height="12" rx="2" />
    <path d="M16 8V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3" />
  </Glyph>
);

export const CloseGlyph = () => (
  <Glyph>
    <path d="M7 7l10 10M17 7L7 17" />
  </Glyph>
);

export const InfoGlyph = () => (
  <Glyph>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 11v5M12 8h.01" />
  </Glyph>
);

export const SuccessGlyph = () => (
  <Glyph>
    <circle cx="12" cy="12" r="9" />
    <path d="M8 12.5l2.5 2.5L16 9.5" />
  </Glyph>
);

export const WarningGlyph = () => (
  <Glyph>
    <path d="M12 4l9 16H3z" />
    <path d="M12 10v4M12 17h.01" />
  </Glyph>
);

export const DangerGlyph = () => (
  <Glyph>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7.5v5.5M12 16.5h.01" />
  </Glyph>
);
