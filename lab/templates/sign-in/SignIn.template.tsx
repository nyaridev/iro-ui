// Template: a sign-in screen. One centered card with email and password, remember me, a forgotten-password link and
// a second way in.

// ── Dependencies ──────────────────────────
import { useState } from "react";
import { Button, Checkbox, Divider, Field, Icon, IconButton, Panel, TextField } from "../../../src";
import { EyeIcon, EyeOffIcon, GithubIcon, LockIcon, MailIcon } from "../../../src/icons";

// ── Public API ────────────────────────────
/** The sign-in screen. */
export default function SignIn() {
  const [shown, setShown] = useState(false);

  return (
    <div className="tpl-signin">
      <Panel padded className="tpl-signin-card">
        <header>
          <span className="tpl-signin-mark" aria-hidden="true" />
          <h1>Sign in to Harbor</h1>
          <p>Welcome back. Enter your details to continue.</p>
        </header>

        <form className="tpl-signin-form" onSubmit={(event) => event.preventDefault()}>
          <Field label="Email">
            <TextField
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              start={<Icon icon={MailIcon} />}
            />
          </Field>
          <Field label="Password">
            <TextField
              type={shown ? "text" : "password"}
              autoComplete="current-password"
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
          <div className="tpl-signin-row">
            <Checkbox label="Remember me" />
            <Button variant="ghost" size="sm">
              Forgot password?
            </Button>
          </div>
          <Button type="submit" variant="primary" size="lg">
            Sign in
          </Button>
        </form>

        <div className="tpl-signin-or">
          <Divider className="tpl-signin-rule" />
          <span>or</span>
          <Divider className="tpl-signin-rule" />
        </div>
        <Button variant="outline" size="lg" icon={<Icon icon={GithubIcon} />}>
          Continue with GitHub
        </Button>

        <p className="tpl-signin-foot">
          No account yet?{" "}
          <Button variant="ghost" size="sm">
            Create one
          </Button>
        </p>
      </Panel>
    </div>
  );
}
