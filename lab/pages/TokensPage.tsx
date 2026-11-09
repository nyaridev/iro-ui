// Tokens page: every value in the contract, drawn in the picked style so styles can be compared at a glance.

// ── Dependencies ──────────────────────────
import type { CSSProperties, ReactNode } from "react";
import { TOKENS } from "../../src/styles/contract";

// ── Constants ─────────────────────────────
const COLOR_GROUPS = ["surfaces", "text", "accent", "status", "palette"] as const;
const SAMPLE = "Sphinx of black quartz, judge my vow";

// ── Private helpers ───────────────────────
/** A token's name and what it's for, under its visual. */
function Caption({ name, about }: { name: string; about: string }) {
  return (
    <figcaption>
      <code>{name}</code>
      <small>{about}</small>
    </figcaption>
  );
}

/** A grid of figures, one per token in the group, each drawn by `draw`. */
function Grid({ group, draw }: { group: keyof typeof TOKENS; draw: (variable: string) => ReactNode }) {
  return (
    <div className="lab-grid">
      {Object.entries(TOKENS[group]).map(([name, about]) => (
        <figure key={name} className="lab-token">
          {draw(`var(--iro-${name})`)}
          <Caption name={name} about={about} />
        </figure>
      ))}
    </div>
  );
}

// ── Public API ────────────────────────────
/** Colors as swatches, then type, shape, size, depth and motion as samples. */
export function TokensPage() {
  return (
    <section className="lab-page">
      <h2>Tokens</h2>

      {COLOR_GROUPS.map((group) => (
        <div key={group}>
          <h3>{group}</h3>
          <Grid group={group} draw={(color) => <span className="lab-swatch" style={{ background: color }} />} />
        </div>
      ))}

      <h3>type</h3>
      <div className="lab-type">
        {Object.entries(TOKENS.type).map(([name, about]) => {
          const isFont = name.startsWith("font-");
          const isSize = name.startsWith("text-");
          const style = isFont
            ? { fontFamily: `var(--iro-${name})` }
            : isSize
              ? { fontSize: `var(--iro-${name})` }
              : { lineHeight: `var(--iro-${name})`, maxWidth: 220 };
          return (
            <figure key={name} className="lab-token">
              <p style={style}>{isFont || isSize ? SAMPLE : `${SAMPLE}. ${SAMPLE}.`}</p>
              <Caption name={name} about={about} />
            </figure>
          );
        })}
      </div>

      <h3>shape</h3>
      <Grid group="shape" draw={(radius) => <span className="lab-shape" style={{ borderRadius: radius }} />} />

      <h3>size</h3>
      <Grid
        group="size"
        draw={(size) => (
          <span className="lab-bar-sample" style={{ width: size, height: size.includes("control") ? size : 12 }} />
        )}
      />

      <h3>depth</h3>
      <Grid group="depth" draw={(shadow) => <span className="lab-shape" style={{ boxShadow: shadow }} />} />

      <h3>motion</h3>
      <p className="lab-hint">
        Hover a track to send its dot across; press the buttons. The Motion page shows them at work.
      </p>
      <Grid
        group="motion"
        draw={(value) =>
          value.includes("press") || value.includes("lift") ? (
            <button type="button" className="lab-press">
              Press me
            </button>
          ) : (
            <span
              className="lab-track"
              data-travel={value.includes("travel") || undefined}
              style={
                value.includes("ease")
                  ? ({ "--lab-ease": value } as CSSProperties)
                  : value.includes("travel")
                    ? undefined
                    : ({ "--lab-dur": value } as CSSProperties)
              }
            >
              <span className="lab-dot" />
            </span>
          )
        }
      />

      <h3>scroll</h3>
      <p className="lab-hint">The scrollbars these make are on the Base page.</p>
      <Grid
        group="scroll"
        draw={(value) =>
          value.includes("size") || value.includes("inset") ? (
            <span className="lab-bar-sample" style={{ width: value, height: 48 }} />
          ) : (
            <span className="lab-swatch" style={{ background: value }} />
          )
        }
      />

      <h3>effects</h3>
      <p className="lab-hint">The backdrop, reveal and burst these color are on the Effects page.</p>
      <Grid
        group="effects"
        draw={(value) =>
          value.includes("strength") ? (
            <span
              className="lab-swatch"
              style={{ background: `color-mix(in oklab, var(--iro-glow-1) ${value}, transparent)` }}
            />
          ) : value.includes("grain") ? (
            <span className="lab-swatch" style={{ background: "var(--iro-fg)", opacity: value }} />
          ) : (
            <span className="lab-swatch" style={{ background: value }} />
          )
        }
      />
    </section>
  );
}
