// Lab page: a Tour over three parts of this page; the last step has no target and sits in the middle.

import { useState } from "react";
import { Button } from "../button/Button";
import { Tour, type TourStep } from "./Tour";

const STEPS: TourStep[] = [
  { target: '[data-tour="start"]', title: "Start here", text: "This button starts the tour again any time." },
  {
    target: '[data-tour="editor"]',
    title: "Write something",
    text: "Start with a title; you can change it any time.",
  },
  {
    target: '[data-tour="publish"]',
    title: "Publish",
    text: "Share it. Readers see it right away.",
    placement: "right",
  },
  { target: '[data-tour="nowhere"]', title: "That's it", text: "Steps without a target show here, in the middle." },
];

export default function TourLab() {
  const [open, setOpen] = useState(false);
  const [result, setResult] = useState("not taken yet");

  return (
    <div className="lab-stack">
      <span data-tour="start">
        <Button onClick={() => setOpen(true)} data-lab-state="click">
          Take the tour
        </Button>
      </span>
      <div data-tour="editor" className="lab-card" style={{ maxWidth: 320 }}>
        Quarterly plan: goals, owners and dates
      </div>
      <span data-tour="publish">
        <Button variant="primary">Publish</Button>
      </span>
      <p className="lab-hint">Tour: {result}. → or Enter go on, ← goes back, Escape skips.</p>
      <Tour
        steps={STEPS}
        open={open}
        onClose={(finished) => {
          setOpen(false);
          setResult(finished ? "finished" : "skipped");
        }}
      />
    </div>
  );
}
