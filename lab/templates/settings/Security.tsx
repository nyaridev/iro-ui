// Template part: Settings' security panel. Changing the password, two-factor sign-in, and the devices signed in.

// ── Dependencies ──────────────────────────
import { useState } from "react";
import { Badge, Button, Field, Icon, Panel, SectionTitle, Switch, TextField, toast } from "../../../src";
import { SESSIONS } from "./data";

// ── Types ─────────────────────────────────
interface SecurityProps {
  id: string;
  twoFactor: boolean;
  onTwoFactorChange: (on: boolean) => void;
}

// ── Public API ────────────────────────────
/** The security panel. */
export function Security({ id, twoFactor, onTwoFactorChange }: SecurityProps) {
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [tried, setTried] = useState(false);
  const [sessions, setSessions] = useState(SESSIONS);
  const short = next.length < 8;
  const error = tried && short ? "Use at least 8 characters." : undefined;

  const change = () => {
    setTried(true);
    if (!current || short) return;
    setCurrent("");
    setNext("");
    setTried(false);
    toast({ title: "Password changed", description: "Other devices stay signed in.", tone: "success" });
  };
  const signOut = (session: (typeof SESSIONS)[number]) => {
    setSessions((all) => all.filter(({ id: each }) => each !== session.id));
    toast({ title: `Signed out ${session.device}`, tone: "info" });
  };

  return (
    <Panel as="section" padded id={id} className="tpl-settings-panel">
      <SectionTitle level={2}>Security</SectionTitle>
      <div className="tpl-settings-pair">
        <Field label="Current password" error={tried && !current ? "Enter your current password." : undefined}>
          <TextField
            type="password"
            autoComplete="current-password"
            value={current}
            onChange={(event) => setCurrent(event.target.value)}
          />
        </Field>
        <Field label="New password" hint="At least 8 characters." error={error}>
          <TextField
            type="password"
            autoComplete="new-password"
            value={next}
            onChange={(event) => setNext(event.target.value)}
          />
        </Field>
      </div>
      <div className="tpl-settings-end">
        <Button size="sm" onClick={change}>
          Change password
        </Button>
      </div>

      <div className="tpl-settings-toggle">
        <div>
          <strong>Two-factor sign-in</strong>
          <span>Ask for a code from your phone when you sign in on a new device.</span>
        </div>
        <Switch checked={twoFactor} onCheckedChange={onTwoFactorChange} aria-label="Two-factor sign-in" />
      </div>

      <SectionTitle level={3}>Signed in</SectionTitle>
      <ul className="tpl-settings-list">
        {sessions.map((session) => (
          <li key={session.id}>
            <Icon icon={session.icon} />
            <div>
              <strong>{session.device}</strong>
              <span>
                {session.place} · {session.when}
              </span>
            </div>
            {session.current ? (
              <Badge tone="success">This device</Badge>
            ) : (
              <Button size="sm" variant="ghost" onClick={() => signOut(session)}>
                Sign out
              </Button>
            )}
          </li>
        ))}
      </ul>
    </Panel>
  );
}
