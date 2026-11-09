// Lab page: EnvironmentVariables with secrets to reveal, as an editor, and a plain list without a title.

import { useState } from "react";
import { EnvironmentVariables, type EnvVariable } from "./EnvironmentVariables";

export default function EnvironmentVariablesLab() {
  const [edited, setEdited] = useState<EnvVariable[]>([
    { name: "API_URL", value: "https://api.example.com" },
    { name: "API_KEY", value: "example-key-not-real", secret: true },
  ]);
  return (
    <div className="lab-stack" style={{ maxWidth: 560 }}>
      <h3>With secrets</h3>
      <EnvironmentVariables
        title="Production"
        variables={[
          { name: "NODE_ENV", value: "production" },
          { name: "DATABASE_URL", value: "postgres://app:example@db.internal:5432/app", secret: true },
          { name: "SESSION_SECRET", value: "example-session-secret-value", secret: true },
          { name: "PORT", value: "8080" },
        ]}
        className="lab-fill"
      />
      <h3>Editing</h3>
      <EnvironmentVariables title="Preview" variables={edited} onChange={setEdited} className="lab-fill" />
      <h3>Plain</h3>
      <EnvironmentVariables
        variables={[
          { name: "LOG_LEVEL", value: "info" },
          { name: "REGION", value: "eu-west" },
        ]}
        className="lab-fill"
      />
    </div>
  );
}
