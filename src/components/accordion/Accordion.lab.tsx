// Lab page: Accordion with one section open at a time, with many, and with a section turned off.

import { Accordion, type AccordionItem } from "./Accordion";

const QUESTIONS: AccordionItem[] = [
  {
    value: "export",
    title: "Can I export my data?",
    content: "Yes. Settings has an export that sends you a zip of every project, as CSV and JSON.",
  },
  {
    value: "seats",
    title: "What happens when I run out of seats?",
    content: "New invites wait until a seat frees up or you add more. Nobody already in loses access.",
  },
  {
    value: "delete",
    title: "How do I delete a workspace?",
    content:
      "Only the owner can. It's at the bottom of the workspace settings, and it asks you to type the name first.",
  },
];

export default function AccordionLab() {
  return (
    <div className="lab-stack" style={{ maxWidth: 560 }}>
      <h3>One at a time</h3>
      <Accordion items={QUESTIONS} defaultValue={["export"]} className="lab-fill" />
      <h3>Many at once, one turned off</h3>
      <Accordion
        multiple
        defaultValue={["export", "seats"]}
        items={[...QUESTIONS.slice(0, 2), { ...QUESTIONS[2], disabled: true }]}
        className="lab-fill"
      />
    </div>
  );
}
