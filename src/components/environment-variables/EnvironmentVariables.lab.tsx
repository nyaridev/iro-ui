// Lab page: EnvironmentVariables with secrets to reveal, and a plain list without a title.

import { EnvironmentVariables } from "./EnvironmentVariables";

export default function EnvironmentVariablesLab() {
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
