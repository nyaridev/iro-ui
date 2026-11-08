// Lab page: RangeCalendar with a picked week, and one limited to 7 days. "Today" is fixed so the page looks the same
// every day.

import { useState } from "react";
import type { DayRange } from "./calendar";
import { RangeCalendar } from "./RangeCalendar";

const TODAY = "2026-11-08";

export default function RangeCalendarLab() {
  const [range, setRange] = useState<DayRange>({ from: "2026-11-02", to: "2026-11-06" });
  const [short, setShort] = useState<DayRange>({ from: "", to: "" });

  return (
    <div className="lab-row" style={{ alignItems: "flex-start", gap: 32 }}>
      <RangeCalendar from={range.from} to={range.to} onRangeChange={setRange} today={TODAY} />
      <RangeCalendar from={short.from} to={short.to} onRangeChange={setShort} maxDays={7} today={TODAY} />
    </div>
  );
}
