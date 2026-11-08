// Lab page: the Spinner at a few text sizes and colors.

import { Spinner } from "./Spinner";

export default function SpinnerLab() {
  return (
    <div className="lab-row">
      <Spinner label="Loading" style={{ fontSize: "var(--iro-text-xs)" }} />
      <Spinner label="Loading" />
      <Spinner label="Loading" style={{ fontSize: "var(--iro-text-xl)", color: "var(--iro-accent-ink)" }} />
      <Spinner label="Loading" style={{ fontSize: "var(--iro-text-3xl)", color: "var(--iro-fg-3)" }} />
    </div>
  );
}
