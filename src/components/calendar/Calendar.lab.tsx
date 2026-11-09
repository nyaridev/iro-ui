// Lab page: Calendar picking a day, with limits and with weekends turned off. A fixed today keeps the shots stable.

import { useState } from "react";
import { Calendar } from "./Calendar";

const TODAY = "2026-11-09";
const weekend = (day: string) => [0, 6].includes(new Date(`${day}T00:00:00Z`).getUTCDay());

export default function CalendarLab() {
  const [day, setDay] = useState("2026-11-12");
  const [meeting, setMeeting] = useState("");
  return (
    <div className="lab-row" style={{ alignItems: "flex-start", gap: 32 }}>
      <div className="lab-stack">
        <h3>Pick a day: {day || "none"}</h3>
        <Calendar value={day} onValueChange={setDay} today={TODAY} />
      </div>
      <div className="lab-stack">
        <h3>Weekdays in the next month</h3>
        <Calendar
          value={meeting}
          onValueChange={setMeeting}
          today={TODAY}
          earliest={TODAY}
          latest="2026-12-09"
          isDayDisabled={weekend}
        />
      </div>
    </div>
  );
}
