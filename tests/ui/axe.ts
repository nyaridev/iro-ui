// axe-core as a measure: runs some of its rules on the checked area and turns each failing element into a finding.

// ── Dependencies ──────────────────────────
import AxeBuilder from "@axe-core/playwright";
import type { Page } from "@playwright/test";
import type { RawFinding } from "./measure/page";

// ── Types ─────────────────────────────────
interface ContrastData {
  fgColor: string;
  bgColor: string;
  contrastRatio: number;
  expectedContrastRatio: string;
}

// ── Public API ────────────────────────────
/** Runs the rules `pick` chooses on the Lab column; each failing element becomes a finding with id `check(rule)`.
 *  Text in a disabled control is left out of color-contrast: WCAG exempts it, labels of disabled groups included. */
export async function axe(
  page: Page,
  pick: (builder: AxeBuilder) => AxeBuilder,
  check: (rule: string) => string,
): Promise<RawFinding[]> {
  const { violations } = await pick(new AxeBuilder({ page }).include(".lab-column")).analyze();
  const nodes = violations.flatMap((violation) =>
    violation.nodes.map((node) => {
      const data = node.any[0]?.data as ContrastData | undefined;
      const detail = node.failureSummary
        ?.split("\n")
        .find((line) => line.startsWith("  "))
        ?.trim();
      return {
        check: check(violation.id),
        selector: String(node.target[0]),
        exempt: violation.id === "color-contrast",
        message:
          violation.id === "color-contrast" && data
            ? `text is ${data.contrastRatio}:1 (${data.fgColor} on ${data.bgColor}), needs ${data.expectedContrastRatio}`
            : `${violation.help}${detail ? `: ${detail}` : ""}`,
      };
    }),
  );
  return page.evaluate(
    (found) =>
      found.flatMap(({ check, selector, exempt, message }) => {
        const element = document.querySelector(selector);
        const off = exempt && element?.closest(":disabled, [aria-disabled='true'], [data-disabled]");
        return element && !off ? [iroUi.finding(check, element, message)] : [];
      }),
    nodes,
  );
}
