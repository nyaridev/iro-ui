// Lab page: Questionnaire with a pick-one question, a pick-several question with Other, and what was sent.

import { useState } from "react";
import { Questionnaire } from "./Questionnaire";

export default function QuestionnaireLab() {
  const [sent, setSent] = useState("");
  return (
    <div className="lab-stack" style={{ maxWidth: 520 }}>
      <Questionnaire
        className="lab-fill"
        onSubmit={(answers) => setSent(JSON.stringify(answers))}
        onSkip={() => setSent("Skipped")}
        questions={[
          {
            id: "format",
            question: "Which format should the export use?",
            options: [
              { value: "csv", label: "CSV", description: "Opens in any spreadsheet." },
              { value: "json", label: "JSON", description: "Keeps nested fields." },
            ],
          },
          {
            id: "fields",
            question: "Which fields should it keep?",
            multiple: true,
            other: true,
            options: [
              { value: "name", label: "Name" },
              { value: "email", label: "Email" },
              { value: "created", label: "Created date" },
            ],
          },
        ]}
      />
      <span className="lab-hint">Sent: {sent || "nothing yet"}</span>
    </div>
  );
}
