// Lab page: StatusDot in every tone, then pulsing at each pace (a service: idle, running, stopped).

import { StatusDot } from "./StatusDot";

const TONES = ["neutral", "accent", "success", "warning", "danger", "info"] as const;

export default function StatusDotLab() {
  return (
    <div className="lab-stack">
      <div className="lab-row">
        {TONES.map((tone) => (
          <span key={tone} className="lab-row" style={{ gap: 6 }}>
            <StatusDot tone={tone} /> {tone}
          </span>
        ))}
      </div>
      <div className="lab-row" style={{ gap: 24 }}>
        <span className="lab-row" style={{ gap: 8 }}>
          <StatusDot tone="neutral" pulse="slow" label="Service idle" /> Idle
        </span>
        <span className="lab-row" style={{ gap: 8 }}>
          <StatusDot tone="success" pulse="steady" label="Service running" /> Running
        </span>
        <span className="lab-row" style={{ gap: 8 }}>
          <StatusDot tone="danger" pulse="fast" label="Service stopped" /> Stopped
        </span>
      </div>
    </div>
  );
}
