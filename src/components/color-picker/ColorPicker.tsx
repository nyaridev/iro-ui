// ColorPicker: a swatch and its hex code that open a picker: a square for saturation (across) and brightness (up), a
// hue strip, a hex field and the app's preset swatches. Drag, click, or focus the square or strip and use the arrow
// keys (Shift for bigger steps). Base UI has no color picker, so the square and strip are hand-built sliders.

// ── Dependencies ──────────────────────────
import { type CSSProperties, type KeyboardEvent, type PointerEvent, useEffect, useState } from "react";
import { Popover } from "../popover/Popover";
import { cx } from "../shared/cx";
import { TextField } from "../text-field/TextField";
import { type Hsv, hexToHsv, hsvToHex, normalizeHex } from "./color";

// ── Constants ─────────────────────────────
/** The hue strip's colors, as data: red, through the hues, back to red. */
const HUES = `linear-gradient(to right, ${[0, 60, 120, 180, 240, 300, 360].map((h) => `hsl(${h} 100% 50%)`).join(", ")})`;

// ── Types ─────────────────────────────────
export interface ColorPickerProps {
  /** The color as "#rrggbb". */
  value: string;
  onValueChange: (hex: string) => void;
  /** Preset colors under the picker, as hex. */
  swatches?: string[];
  size?: "sm" | "md";
  disabled?: boolean;
  id?: string;
  className?: string;
  /** What the color is for, for screen readers ("Label color"), when no Field names it. */
  "aria-label"?: string;
}

// ── Private helpers ───────────────────────
const clamp = (value: number) => Math.min(1, Math.max(0, value));
const percent = (value: number) => `${Math.round(value * 100)}%`;

/** Where a pointer is inside an element, as 0–1 across and down. */
function spot(event: PointerEvent<HTMLElement>) {
  const box = event.currentTarget.getBoundingClientRect();
  return { x: clamp((event.clientX - box.left) / box.width), y: clamp((event.clientY - box.top) / box.height) };
}

/** Pointer handlers that call `move` on press and while dragging. */
function dragging(move: (x: number, y: number) => void) {
  return {
    onPointerDown: (event: PointerEvent<HTMLElement>) => {
      event.currentTarget.setPointerCapture(event.pointerId);
      const { x, y } = spot(event);
      move(x, y);
    },
    onPointerMove: (event: PointerEvent<HTMLElement>) => {
      if (!event.currentTarget.hasPointerCapture(event.pointerId)) return;
      const { x, y } = spot(event);
      move(x, y);
    },
  };
}

/** The arrow keys' step: 1%, or 10% with Shift; null for other keys. */
function arrowStep(event: KeyboardEvent): { x: number; y: number } | null {
  const step = event.shiftKey ? 0.1 : 0.01;
  if (event.key === "ArrowLeft") return { x: -step, y: 0 };
  if (event.key === "ArrowRight") return { x: step, y: 0 };
  if (event.key === "ArrowUp") return { x: 0, y: step };
  if (event.key === "ArrowDown") return { x: 0, y: -step };
  return null;
}

// ── Public API ────────────────────────────
/** A color field with a picker. */
export function ColorPicker({
  value,
  onValueChange,
  swatches = [],
  size = "md",
  disabled,
  id,
  className,
  "aria-label": ariaLabel,
}: ColorPickerProps) {
  // HSV is kept, not derived, so the hue survives dragging through grays.
  const [hsv, setHsv] = useState<Hsv>(() => hexToHsv(value) ?? { h: 0, s: 0, v: 0 });
  const [text, setText] = useState(value);
  // A color set from outside moves the picker, keeping the hue when the new color is a gray (which has none).
  useEffect(() => {
    setText(value);
    setHsv((current) => {
      const next = hsvToHex(current) === value ? null : hexToHsv(value);
      if (!next) return current;
      return next.s === 0 ? { ...next, h: current.h } : next;
    });
  }, [value]);

  const set = (next: Hsv) => {
    setHsv(next);
    onValueChange(hsvToHex(next));
  };
  const square = dragging((x, y) => set({ ...hsv, s: x, v: 1 - y }));
  const strip = dragging((x) => set({ ...hsv, h: x * 360 }));
  const takeText = () => {
    const hex = normalizeHex(text);
    if (hex) onValueChange(hex);
    else setText(value);
  };

  return (
    <Popover
      align="start"
      className="iro-color-picker-popup"
      trigger={
        <button
          type="button"
          id={id}
          disabled={disabled}
          aria-label={ariaLabel ? `${ariaLabel}: ${value}` : undefined}
          data-size={size}
          className={cx("iro-select", "iro-color-picker", className)}
        >
          <span className="iro-color-picker-swatch" style={{ background: value }} />
          <span className="iro-select-value">{value}</span>
        </button>
      }
    >
      <div className="iro-color-picker-panel" style={{ "--picker-hue": `hsl(${hsv.h} 100% 50%)` } as CSSProperties}>
        <div
          role="slider"
          tabIndex={0}
          aria-label="Saturation and brightness"
          aria-valuenow={Math.round(hsv.s * 100)}
          aria-valuetext={`Saturation ${percent(hsv.s)}, brightness ${percent(hsv.v)}`}
          className="iro-color-picker-square"
          style={{
            background: `linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, transparent), hsl(${hsv.h} 100% 50%)`,
          }}
          {...square}
          onKeyDown={(event) => {
            const step = arrowStep(event);
            if (!step) return;
            event.preventDefault();
            set({ ...hsv, s: clamp(hsv.s + step.x), v: clamp(hsv.v + step.y) });
          }}
        >
          <span
            className="iro-color-picker-thumb"
            style={{ left: percent(hsv.s), top: percent(1 - hsv.v), background: value }}
          />
        </div>
        <div
          role="slider"
          tabIndex={0}
          aria-label="Hue"
          aria-valuemin={0}
          aria-valuemax={360}
          aria-valuenow={Math.round(hsv.h)}
          className="iro-color-picker-strip"
          style={{ background: HUES }}
          {...strip}
          onKeyDown={(event) => {
            const step = arrowStep(event);
            if (!step) return;
            event.preventDefault();
            set({ ...hsv, h: Math.min(360, Math.max(0, hsv.h + (step.x + step.y) * 360)) });
          }}
        >
          <span className="iro-color-picker-thumb" style={{ left: `${(hsv.h / 360) * 100}%`, top: "50%" }} />
        </div>
        <TextField
          size="sm"
          aria-label="Hex code"
          value={text}
          spellCheck={false}
          onChange={(event) => setText(event.currentTarget.value)}
          onBlur={takeText}
          onKeyDown={(event) => event.key === "Enter" && takeText()}
          className="iro-color-picker-hex"
        />
        {swatches.length > 0 ? (
          <div className="iro-color-picker-swatches">
            {swatches.map((swatch) => (
              <button
                key={swatch}
                type="button"
                aria-label={swatch}
                aria-pressed={swatch.toLowerCase() === value.toLowerCase()}
                className="iro-color-picker-preset"
                style={{ background: swatch }}
                onClick={() => onValueChange(normalizeHex(swatch) ?? swatch)}
              />
            ))}
          </div>
        ) : null}
      </div>
    </Popover>
  );
}
