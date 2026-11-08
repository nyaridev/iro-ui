// Lab page: Kbd as single keys and a combination in text.

import { Kbd } from "./Kbd";

export default function KbdLab() {
  return (
    <div className="lab-stack">
      <div className="lab-row">
        <Kbd>Esc</Kbd>
        <Kbd>Enter</Kbd>
        <Kbd>↑</Kbd>
        <Kbd>K</Kbd>
      </div>
      <p>
        Open the palette with <Kbd>Ctrl</Kbd> <Kbd>K</Kbd>.
      </p>
    </div>
  );
}
