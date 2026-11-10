// Template: a sign-in screen. One centered card with three forms: sign in (email, password, remember me, a second way
// in), reset (a link by email) and sign up (name, email, a password with a strength hint). Submitting checks the
// fields, shows a busy button for a second, then says it worked.

// ── Dependencies ──────────────────────────
import { type FormEvent, useEffect, useState } from "react";
import { Button, Checkbox, Divider, Field, Icon, IconButton, Notice, Panel, TextField } from "../../../src";
import { EyeIcon, EyeOffIcon, GithubIcon, LockIcon, MailIcon, UserIcon } from "../../../src/icons";

// ── Constants ─────────────────────────────
const HEADINGS = {
  "sign-in": { title: "Sign in to Harbor", text: "Welcome back. Enter your details to continue." },
  reset: { title: "Reset your password", text: "We'll email you a link to choose a new one." },
  "sign-up": { title: "Create your account", text: "Free for teams of up to three." },
};

/** How long the fake server takes, in ms. */
const WAIT = 1000;

// ── Types ─────────────────────────────────
type Mode = keyof typeof HEADINGS;

// ── Private helpers ───────────────────────
const emailProblem = (email: string) =>
  !email
    ? "Enter your email."
    : /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
      ? undefined
      : "That doesn't look like an email.";

/** A word for how hard the password is to guess, from its length and kinds of characters. */
function strength(password: string): string {
  const kinds = [/[a-z]/, /[A-Z]/, /\d/, /[^a-zA-Z\d]/].filter((kind) => kind.test(password)).length;
  if (password.length >= 12 && kinds >= 3) return "Strong password";
  if (password.length >= 8 && kinds >= 2) return "Okay password: make it longer, or mix in numbers and symbols";
  return "Weak password: use 8 or more characters";
}

// ── Public API ────────────────────────────
/** The sign-in screen. */
export default function SignIn() {
  const [mode, setMode] = useState<Mode>("sign-in");
  const [shown, setShown] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [tried, setTried] = useState(false);
  const [busy, setBusy] = useState<string | null>(null);
  const [done, setDone] = useState<string | null>(null);

  // The fake server: answer `busy`'s message after a moment.
  useEffect(() => {
    if (!busy) return;
    const timer = window.setTimeout(() => {
      setDone(busy);
      setBusy(null);
    }, WAIT);
    return () => window.clearTimeout(timer);
  }, [busy]);

  const errors = {
    name: mode === "sign-up" && !name.trim() ? "Enter your name." : undefined,
    email: emailProblem(email.trim()),
    password: mode === "reset" ? undefined : !password ? "Enter a password." : undefined,
  };
  const go = (next: Mode) => {
    setMode(next);
    setTried(false);
    setDone(null);
    setPassword("");
  };
  const submit = (event: FormEvent) => {
    event.preventDefault();
    setTried(true);
    if (errors.name || errors.email || errors.password) return;
    const who = email.trim();
    setBusy(
      mode === "reset"
        ? `If ${who} has an account, a reset link is on its way.`
        : mode === "sign-up"
          ? `Account created for ${who}. Check your inbox to confirm it.`
          : `Signed in as ${who}.`,
    );
  };
  const error = (problem: string | undefined) => (tried ? problem : undefined);
  const heading = HEADINGS[mode];

  return (
    <div className="tpl-signin">
      <Panel padded className="tpl-signin-card">
        <header>
          <span className="tpl-signin-mark" aria-hidden="true" />
          <h1>{heading.title}</h1>
          <p>{heading.text}</p>
        </header>

        {done ? (
          <Notice
            tone="success"
            title={mode === "reset" ? "Check your email" : "You're in"}
            actions={
              <Button size="sm" onClick={() => go("sign-in")}>
                {mode === "reset" ? "Back to sign in" : "Sign out"}
              </Button>
            }
          >
            {done}
          </Notice>
        ) : (
          <form className="tpl-signin-form" onSubmit={submit} noValidate>
            {mode === "sign-up" ? (
              <Field label="Name" error={error(errors.name)}>
                <TextField
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  autoComplete="name"
                  start={<Icon icon={UserIcon} />}
                />
              </Field>
            ) : null}
            <Field label="Email" error={error(errors.email)}>
              <TextField
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
                start={<Icon icon={MailIcon} />}
              />
            </Field>
            {mode === "reset" ? null : (
              <Field
                label="Password"
                error={error(errors.password)}
                hint={mode === "sign-up" && password ? strength(password) : undefined}
              >
                <TextField
                  type={shown ? "text" : "password"}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  autoComplete={mode === "sign-up" ? "new-password" : "current-password"}
                  start={<Icon icon={LockIcon} />}
                  end={
                    <IconButton
                      icon={<Icon icon={shown ? EyeOffIcon : EyeIcon} />}
                      label={shown ? "Hide password" : "Show password"}
                      size="sm"
                      onClick={() => setShown(!shown)}
                    />
                  }
                />
              </Field>
            )}
            {mode === "sign-in" ? (
              <div className="tpl-signin-row">
                <Checkbox label="Remember me" />
                <Button variant="ghost" size="sm" onClick={() => go("reset")}>
                  Forgot password?
                </Button>
              </div>
            ) : null}
            <Button type="submit" variant="primary" size="lg" loading={Boolean(busy)}>
              {mode === "reset" ? "Send link" : mode === "sign-up" ? "Create account" : "Sign in"}
            </Button>
          </form>
        )}

        {mode === "sign-in" && !done ? (
          <>
            <div className="tpl-signin-or">
              <Divider className="tpl-signin-rule" />
              <span>or</span>
              <Divider className="tpl-signin-rule" />
            </div>
            <Button
              variant="outline"
              size="lg"
              icon={<Icon icon={GithubIcon} />}
              disabled={Boolean(busy)}
              onClick={() => setBusy("Signed in with GitHub.")}
            >
              Continue with GitHub
            </Button>
          </>
        ) : null}

        {done ? null : (
          <p className="tpl-signin-foot">
            {mode === "sign-in" ? "No account yet? " : mode === "sign-up" ? "Have an account? " : null}
            <Button variant="ghost" size="sm" onClick={() => go(mode === "sign-in" ? "sign-up" : "sign-in")}>
              {mode === "sign-in" ? "Create one" : mode === "sign-up" ? "Sign in" : "Back to sign in"}
            </Button>
          </p>
        )}
      </Panel>
    </div>
  );
}
