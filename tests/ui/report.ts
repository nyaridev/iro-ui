// The UI checks' report: drops what the exceptions allow, folds repeats into one finding, crops a picture of each new
// one, and at the end writes findings.json, flags stale exceptions and fails on strict checks (ADR-0015).

// ── Dependencies ──────────────────────────
import { writeFileSync } from "node:fs";
import { expect, type Page, type TestInfo } from "@playwright/test";
import { ALLOW, type Exception } from "./allow";
import type { RawFinding } from "./measure/page";
import { isStrict } from "./strict";
import type { Measure, Run, Stop } from "./walk";

// ── Constants ─────────────────────────────
/** Pictures per check and page, and per test: enough to see the problem without bloating the report. */
const CROPS_PER_PAGE = 2;
const CROPS_PER_TEST = 120;
/** Room around the outlined element in a crop. */
const MARGIN = 32;

// ── Types ─────────────────────────────────
/** One finding as the report keeps it. */
export interface Finding {
  check: string;
  page: string;
  look: string;
  /** The overlay that was open, if any (`click: Delete project`). */
  overlay: string | null;
  path: string;
  message: string;
  /** How many elements with this path showed it. */
  count: number;
  strict: boolean;
}

// ── Public API ────────────────────────────
/** Collects one test's findings. */
export class Report {
  private readonly findings = new Map<string, Finding>();
  private readonly used = new Set<Exception>();
  private readonly notes: string[] = [];
  private readonly crops = new Map<string, number>();
  private cropped = 0;
  private readonly look: string;
  private readonly browser: string;

  constructor(
    private readonly page: Page,
    private readonly info: TestInfo,
    private readonly run: Run,
    private readonly area: string,
  ) {
    this.look = `${run.look.style} ${run.look.theme}`;
    this.browser = page.context().browser()?.browserType().name() ?? "chromium";
  }

  /** Measures the page as it stands and keeps what's new. */
  async add(stop: Stop, overlay: string | null, measures: Measure[]) {
    for (const measure of measures) {
      for (const raw of await measure(this.page)) {
        if (await this.allowed(stop, raw)) continue;
        const key = `${raw.check}|${stop.name}|${raw.path}`;
        const known = this.findings.get(key);
        if (known) {
          if (!overlay) known.count++;
          continue;
        }
        this.findings.set(key, {
          check: raw.check,
          page: stop.name,
          look: this.look,
          overlay,
          path: raw.path,
          message: raw.message,
          count: 1,
          strict: isStrict(raw.check),
        });
        await this.crop(stop, raw);
      }
    }
  }

  /** A line about the walk itself (an overlay that didn't open), shown with the findings. */
  note(text: string) {
    this.notes.push(text);
  }

  /** Writes the findings, reports stale exceptions and fails on strict findings. */
  async finish() {
    const pages = new Set(this.run.stops.map((stop) => stop.name));
    for (const exception of ALLOW) {
      if (this.used.has(exception) || !this.applies(exception) || !pages.has(exception.page)) continue;
      const key = `stale|${exception.page}|${exception.selector}`;
      this.findings.set(key, {
        check: exception.check,
        page: exception.page,
        look: this.look,
        overlay: null,
        path: exception.selector,
        message: `stale exception, it matches nothing now: remove it from tests/ui/allow.ts (${exception.reason})`,
        count: 1,
        strict: true,
      });
    }
    const findings = [...this.findings.values()];
    const file = this.info.outputPath("findings.json");
    writeFileSync(file, `${JSON.stringify({ run: this.run.title, notes: this.notes, findings }, null, 2)}\n`);
    await this.info.attach("findings.json", { path: file, contentType: "application/json" });
    this.info.annotations.push({
      type: "findings",
      description: `${findings.length} (${findings.filter((finding) => finding.strict).length} strict)`,
    });
    const strict = findings.filter((finding) => finding.strict);
    expect
      .soft(
        strict.map((finding) => `${finding.check} · ${finding.page} · ${finding.path}: ${finding.message}`),
        "strict UI checks",
      )
      .toEqual([]);
  }

  /** Whether an exception covers this look, engine and the checks this run makes (an area, `motion`, or one check). */
  private applies(exception: Exception) {
    const look = exception.looks;
    return (
      (exception.check === this.area || exception.check.startsWith(`${this.area}.`)) &&
      (!look || look.includes(this.run.look.style) || look.includes(this.look)) &&
      (!exception.browsers || exception.browsers.includes(this.browser))
    );
  }

  /** Whether an exception covers this finding; marks the exception used. */
  private async allowed(stop: Stop, raw: RawFinding) {
    for (const exception of ALLOW) {
      if (exception.check !== raw.check || !this.applies(exception)) continue;
      if (exception.page !== "*" && exception.page !== stop.name) continue;
      const hit = await this.page.evaluate(([id, selector]) => iroUi.within(id, selector), [
        raw.id,
        exception.selector,
      ] as const);
      if (!hit) continue;
      this.used.add(exception);
      return true;
    }
    return false;
  }

  /** Attaches a picture of the finding's element, outlined, while the budget lasts. */
  private async crop(stop: Stop, raw: RawFinding) {
    const key = `${raw.check}|${stop.name}`;
    const done = this.crops.get(key) ?? 0;
    if (done >= CROPS_PER_PAGE || this.cropped >= CROPS_PER_TEST) return;
    this.crops.set(key, done + 1);
    this.cropped++;
    const box = await this.page.evaluate((id) => iroUi.outline(id), raw.id);
    const view = this.page.viewportSize() ?? { width: 1200, height: 900 };
    const x = Math.max(0, box.x - MARGIN);
    const y = Math.max(0, box.y - MARGIN);
    const clip = {
      x,
      y,
      width: Math.max(1, Math.min(view.width, box.x + box.width + MARGIN) - x),
      height: Math.max(1, Math.min(view.height, box.y + box.height + MARGIN) - y),
    };
    // Saved under test-results too, named so they're easy to find without the HTML report.
    const path = this.info.outputPath("crops", `${raw.check}-${stop.name.replaceAll(" ", "-")}-${this.cropped}.png`);
    await this.page.screenshot({ path, clip, animations: "disabled", caret: "hide" });
    await this.page.evaluate(() => iroUi.unoutline());
    await this.info.attach(`${raw.check} · ${stop.name} · ${raw.path}.png`, { path, contentType: "image/png" });
  }
}
