// Accordion: a stack of headed sections (questions, settings groups) where opening one can close the others. For one
// section on its own, use Collapsible. Base UI handles the arrow keys between headers.

// ── Dependencies ──────────────────────────
import { Accordion as BaseAccordion } from "@base-ui/react/accordion";
import type { ReactNode } from "react";
import { cx } from "../shared/cx";
import { ChevronDownGlyph } from "../shared/glyphs";

// ── Types ─────────────────────────────────
export interface AccordionItem {
  /** Names the section in `value`; unique within the accordion. */
  value: string;
  title: ReactNode;
  content: ReactNode;
  disabled?: boolean;
}

export interface AccordionProps {
  items: AccordionItem[];
  /** Lets more than one section stay open. */
  multiple?: boolean;
  /** The open sections; leave it out and use `defaultValue` to let the accordion manage it. */
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
  className?: string;
}

// ── Public API ────────────────────────────
/** Sections with headers that open and close their bodies. */
export function Accordion({ items, multiple = false, value, defaultValue, onValueChange, className }: AccordionProps) {
  return (
    <BaseAccordion.Root
      multiple={multiple}
      value={value}
      defaultValue={defaultValue}
      onValueChange={onValueChange ? (next) => onValueChange(next as string[]) : undefined}
      className={cx("iro-accordion", className)}
    >
      {items.map((item) => (
        <BaseAccordion.Item key={item.value} value={item.value} disabled={item.disabled} className="iro-accordion-item">
          <BaseAccordion.Header className="iro-accordion-header">
            <BaseAccordion.Trigger className="iro-accordion-trigger">
              <span className="iro-accordion-title">{item.title}</span>
              <ChevronDownGlyph />
            </BaseAccordion.Trigger>
          </BaseAccordion.Header>
          <BaseAccordion.Panel className="iro-accordion-panel">
            <div className="iro-accordion-body">{item.content}</div>
          </BaseAccordion.Panel>
        </BaseAccordion.Item>
      ))}
    </BaseAccordion.Root>
  );
}
