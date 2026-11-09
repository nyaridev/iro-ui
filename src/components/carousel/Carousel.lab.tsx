// Lab page: Carousel one slide at a time, and three at a time without dots.

import { Panel } from "../panel/Panel";
import { Carousel } from "./Carousel";

const SLIDES = [
  { title: "Shared folders", text: "Work on the same files with your team." },
  { title: "Faster search", text: "Results while you type, across every project." },
  { title: "New export", text: "CSV and JSON, with every field kept." },
  { title: "Dark themes", text: "Every style has a dark one." },
  { title: "Keyboard first", text: "Every action has a shortcut." },
];

function Slide({ title, text, tall }: { title: string; text: string; tall?: boolean }) {
  return (
    <Panel style={{ display: "grid", gap: 6, alignContent: "end", height: tall ? 180 : 120 }}>
      <strong>{title}</strong>
      <span className="lab-hint">{text}</span>
    </Panel>
  );
}

export default function CarouselLab() {
  return (
    <div className="lab-stack" style={{ maxWidth: 640 }}>
      <h3>One at a time</h3>
      <Carousel label="What's new" className="lab-fill">
        {SLIDES.map((slide) => (
          <Slide key={slide.title} {...slide} tall />
        ))}
      </Carousel>
      <h3>Three at a time, no dots</h3>
      <Carousel label="Features" perView={3} dots={false} className="lab-fill">
        {SLIDES.map((slide) => (
          <Slide key={slide.title} {...slide} />
        ))}
      </Carousel>
    </div>
  );
}
