// CSS check: the static half of the UI checks (ADR-0015). Reads the CSS under src/ and reports spacing and motion that
// aren't tokens, movement that ignores --iro-travel, layout transitions that don't stop under reduced motion, components
// sized by the window
// instead of their container, and features below Baseline "widely available" outside @supports (ADR-0014). Rules in
// STRICT fail `pnpm check`; the others only report.

// ── Dependencies ──────────────────────────
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { features } from "web-features";

// ── Constants ─────────────────────────────
/** Rules that fail the run. A rule turns strict once its findings are fixed (M26 to M28). */
export const STRICT = new Set<string>(["spacing", "motion", "travel", "layout-transition", "container", "baseline"]);

const ROOT = "src";
/** The styles' value files define the tokens themselves. */
const TOKEN_FILES = /styles[\\/][^\\/]+[\\/](tokens|themes|accents|fonts|index)\.css$/;

const SPACING = /^(padding|margin|gap|row-gap|column-gap)(-|$)/;
const MOTION = /^(transition|animation)(-duration|-timing-function)?$/;
const MOVEMENT = /^(transform|translate|scale|rotate)$/;
const LAYOUT = /^(width|height|min-height|max-height|min-width|max-width|top|left|right|bottom|inset|margin|padding)/;
/** Bigger than a hairline: raw px of 4 or more, or rem. */
const RAW_SPACE = /(^|[\s(,*+-])(\d*\.?\d+)(px|rem)\b/g;
const TIME = /(^|[\s,(])(\d*\.?\d+)m?s\b/;
const EASING = /\b(ease|ease-in|ease-out|ease-in-out|cubic-bezier)\b/;
/** A rule whose timing is deliberate (spinners, blinking carets, attention cues: ADR-0007). It still moves only
 *  with --iro-travel or --iro-move. */
const FIXED = /fixed timing/i;
const ENTER_EXIT = /data-(starting|ending)-style|data-iro-animate/;
/** A component's CSS lives here; it adapts to its container, never the window. */
const COMPONENT = /components[\\/]/;
/** The container breakpoints (ADR-0014). */
const BREAKPOINTS = new Set(["30rem", "48rem"]);
const IDENTITY = /^(none|0|1|translate\(-50%(, -50%)?\)|translateX\(-50%\)|translateY\(-50%\)|scale\(1\))$/;
/** Features a browser can skip without harm: it keeps its default, which is the fallback (ADR-0014). */
const HARMLESS = [
  "css.properties.cursor",
  "css.properties.user-select",
  "css.properties.overscroll-behavior",
  "css.properties.scrollbar-",
  "css.properties.resize",
  "css.properties.text-wrap",
  "css.properties.backdrop-filter",
  "css.selectors.selection",
  "css.selectors.marker",
];

// ── Types ─────────────────────────────────
export interface Declaration {
  property: string;
  value: string;
  line: number;
  /** Selectors and at-rules around it, outermost first. */
  context: string[];
  /** Comments in its rule and just before the rule's selector. */
  comments: string[];
}

export interface CssFinding {
  rule: "spacing" | "motion" | "travel" | "layout-transition" | "container" | "baseline";
  file: string;
  line: number;
  message: string;
}

/** `high` is "widely available"; `low` newly available; false not in every engine (web-features types it as boolean). */
type Status = { baseline: boolean | "low" | "high"; low?: string };

// ── Private helpers ───────────────────────
/** Baseline status by compat key (`css.properties.gap`), from the web-features data. */
const BASELINE = new Map<string, Status>();
/** The same for CSS types (`color-mix`, `lh`), by their last name. */
const TYPES = new Map<string, Status>();
for (const feature of Object.values(features)) {
  const byKey = "status" in feature ? feature.status.by_compat_key : undefined;
  for (const [key, status] of Object.entries(byKey ?? {})) {
    const entry: Status = { baseline: status.baseline, low: status.baseline_low_date };
    BASELINE.set(key, entry);
    if (key.startsWith("css.types.")) TYPES.set(key.split(".").at(-1) ?? key, entry);
  }
}

/** Every declaration in a stylesheet, with its line, where it sits and the comments that describe its rule. */
export function declarations(css: string): Declaration[] {
  const out: Declaration[] = [];
  const stack: { prelude: string; comments: string[] }[] = [];
  let buffer = "";
  let pending: string[] = [];
  let line = 1;
  let start = 1;
  for (let at = 0; at < css.length; at++) {
    const char = css[at];
    if (char === "/" && css[at + 1] === "*") {
      const end = css.indexOf("*/", at + 2);
      const comment = css.slice(at + 2, end === -1 ? css.length : end);
      pending.push(comment);
      line += comment.split("\n").length - 1;
      at = end === -1 ? css.length : end + 1;
      continue;
    }
    if (char === "\n") line++;
    if (char === "{") {
      stack.push({ prelude: buffer.trim(), comments: pending });
      pending = [];
      buffer = "";
    } else if (char === ";" || char === "}") {
      const text = buffer.trim();
      const colon = text.indexOf(":");
      if (colon > 0 && stack.length > 0 && !text.startsWith("@")) {
        out.push({
          property: text.slice(0, colon).trim().toLowerCase(),
          value: text.slice(colon + 1).trim(),
          line: start,
          context: stack.map((block) => block.prelude),
          comments: stack.flatMap((block) => block.comments).concat(pending),
        });
      }
      if (char === "}") {
        stack.pop();
        pending = [];
      }
      buffer = "";
    } else {
      if (buffer.trim() === "" && !/\s/.test(char)) start = line;
      buffer += char;
    }
  }
  return out;
}

/** The Baseline statuses a declaration leans on: its property, keyword values, functions, units and selectors. */
function baselineKeys(declaration: Declaration): string[] {
  const { property, value, context } = declaration;
  const keys = [`css.properties.${property}`];
  for (const word of value.match(/[a-z][a-z-]*/g) ?? []) keys.push(`css.properties.${property}.${word}`);
  for (const [, name] of value.matchAll(/([a-z-]+)\(/g)) keys.push(`type:${name}`);
  for (const [, unit] of value.matchAll(/\d(lh|rlh|dvh|svh|lvh|dvw|svw|cqw|cqh|cqi|cqb|vi|vb)\b/g))
    keys.push(`type:${unit}`);
  for (const prelude of context) {
    for (const [, name] of prelude.matchAll(/::?([a-z-]+)/g)) keys.push(`css.selectors.${name}`);
    for (const [, name] of prelude.matchAll(/@([a-z-]+)/g)) keys.push(`css.at-rules.${name}`);
  }
  return keys;
}

/** The value with tokens taken out: `var()`, and any `calc()`, `min()`, `max()` or `clamp()` built on one or on the
 *  text's own size (`lh`, `em`, `%`: alignment math, not a spacing choice). */
function withoutTokens(value: string): string {
  let rest = value.replace(/var\([^()]*\)/g, "TOKEN");
  for (let pass = 0; pass < 5; pass++) {
    rest = rest.replace(/(\b(?:calc|min|max|clamp)|(?<![\w-]))\(([^()]*)\)/g, (_, _fn, inner: string) =>
      /TOKEN|\d(r?lh|em|%)/.test(inner) ? "TOKEN" : inner,
    );
  }
  return rest;
}

const statusOf = (key: string) => (key.startsWith("type:") ? TYPES.get(key.slice(5)) : BASELINE.get(key));

// ── Public API ────────────────────────────
/** What the rules say about one stylesheet. */
export function checkCss(file: string, css: string): CssFinding[] {
  const findings: CssFinding[] = [];
  const tokens = TOKEN_FILES.test(file);
  const report = (rule: CssFinding["rule"], declaration: Declaration, message: string) =>
    findings.push({ rule, file, line: declaration.line, message });
  const queries = new Set<string>();

  for (const declaration of declarations(css)) {
    const { property, value, context, comments } = declaration;
    if (property.startsWith("--") || property.startsWith("-webkit-")) continue;
    const fixed = comments.some((comment) => FIXED.test(comment));
    const keyframes = context.some((prelude) => prelude.startsWith("@keyframes"));

    if (!tokens && SPACING.test(property)) {
      const raw = [...withoutTokens(value).matchAll(RAW_SPACE)].filter(
        ([, , number, unit]) => unit === "rem" || Number(number) > 3,
      );
      if (raw.length > 0) report("spacing", declaration, `${property}: ${value} — use the space tokens`);
    }
    if (MOTION.test(property) && !fixed) {
      if (TIME.test(withoutTokens(value)) && !/^0m?s$/.test(value))
        report("motion", declaration, `${property}: ${value} — use a duration token, or mark the rule "fixed timing"`);
      if (
        EASING.test(
          withoutTokens(value).replace(/\b[a-z]+-[a-z-]+\b/g, (name) => (name.startsWith("ease") ? name : "")),
        )
      )
        report("motion", declaration, `${property}: ${value} — use an easing token`);
    }
    const moving = keyframes || context.some((prelude) => ENTER_EXIT.test(prelude));
    const scaled = /--iro-(travel|move)\b/.test(value);
    if (moving && MOVEMENT.test(property) && !IDENTITY.test(value) && !scaled)
      report("travel", declaration, `${property}: ${value} — scale movement by --iro-travel (or --iro-move)`);
    if (/^transition(-property)?$/.test(property)) {
      for (const part of value.split(",")) {
        const name = part.trim().split(/\s+/)[0];
        if (LAYOUT.test(name) && !part.includes("--iro-move"))
          report(
            "layout-transition",
            declaration,
            `transition on ${name} moves under reduced motion — scale its duration by --iro-move`,
          );
      }
    }
    if (keyframes && LAYOUT.test(property) && !scaled)
      report("layout-transition", declaration, `@keyframes animate ${property} — scale it by --iro-move`);

    for (const prelude of context) {
      if (!COMPONENT.test(file) || queries.has(prelude)) continue;
      queries.add(prelude);
      if (prelude.startsWith("@media") && /\b(width|height|aspect-ratio)\b/.test(prelude))
        report(
          "container",
          declaration,
          `${prelude} — a component follows its container: @container at 30rem or 48rem`,
        );
      const sizes = prelude.startsWith("@container") ? (prelude.match(/\d*\.?\d+[a-z]+/g) ?? []) : [];
      if (sizes.some((size) => !BREAKPOINTS.has(size)))
        report("container", declaration, `${prelude} — the container breakpoints are 30rem and 48rem`);
    }

    if (context.some((prelude) => prelude.startsWith("@supports"))) continue;
    for (const key of new Set(baselineKeys(declaration))) {
      const status = statusOf(key);
      if (!status || status.baseline === "high" || HARMLESS.some((prefix) => key.startsWith(prefix))) continue;
      const since = status.low ? `newly available ${status.low}` : "not in every engine";
      report("baseline", declaration, `${key.replace("type:", "")} is ${since} — wrap it in @supports with a fallback`);
    }
  }
  return findings;
}

// ── Entry point ───────────────────────────
if (import.meta.main) {
  const findings = readdirSync(ROOT, { recursive: true, encoding: "utf8" })
    .filter((file) => file.endsWith(".css"))
    .flatMap((file) => checkCss(join(ROOT, file), readFileSync(join(ROOT, file), "utf8")));
  const byRule = new Map<string, CssFinding[]>();
  for (const finding of findings) byRule.set(finding.rule, [...(byRule.get(finding.rule) ?? []), finding]);
  for (const [rule, list] of byRule) {
    const strict = STRICT.has(rule);
    console.log(`\n${rule}: ${list.length} ${strict ? "(strict)" : "(report only)"}`);
    for (const finding of list) console.log(`  ${finding.file}:${finding.line}  ${finding.message}`);
    if (strict) process.exitCode = 1;
  }
  if (findings.length === 0) console.log("CSS check: nothing to report.");
}
