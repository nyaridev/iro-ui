// Template: a new account's first run. A side panel previews the workspace as it takes shape; beside it a Stepper
// walks through verifying the email, a few questions, naming the workspace and inviting the team, then a summary.
// Continue waits for each step's answers, Back keeps them, and the code check, resend countdown and address checks work.

// ── Dependencies ──────────────────────────
import { type FormEvent, useEffect, useRef, useState } from "react";
import { Avatar, Button, Icon, Notice, Panel, ProgressBar, Stepper } from "../../../src";
import { burst } from "../../../src/effects";
import { ArrowLeftIcon, ArrowRightIcon, RocketIcon } from "../../../src/icons";
import { AboutStep } from "./AboutStep";
import { DoneStep } from "./DoneStep";
import { InviteStep } from "./InviteStep";
import { EMAIL, labelOf, type Setup, SIZES, START, stepReady, WRONG_CODE } from "./setup";
import { VerifyStep } from "./VerifyStep";
import { WorkspaceStep } from "./WorkspaceStep";

// ── Constants ─────────────────────────────
const STEPS = [
  { label: "Verify", title: "Check your email", text: `We sent a six-digit code to ${EMAIL}.` },
  { label: "About you", title: "Tell us about you", text: "It shapes the templates we suggest. You can skip it." },
  { label: "Workspace", title: "Name your workspace", text: "Your team's home in Harbor. You can change it later." },
  { label: "Invite", title: "Invite your team", text: "They get an email with a link to join." },
  { label: "Done", title: "You're all set", text: "Your workspace is ready. Here's what you set up." },
];

const LAST = STEPS.length - 1;

/** How long the fake server takes to check a code, and how long until another can be sent, in ms and s. */
const CHECK_MS = 700;
const RESEND_S = 30;

// ── Public API ────────────────────────────
/** The onboarding screen. */
export default function Onboarding() {
  const [step, setStep] = useState(0);
  const [setup, setSetup] = useState<Setup>(START);
  const [checking, setChecking] = useState(false);
  const [codeError, setCodeError] = useState("");
  const [inviteError, setInviteError] = useState("");
  const [resendIn, setResendIn] = useState(RESEND_S);
  const [opened, setOpened] = useState(false);
  const heading = useRef<HTMLHeadingElement>(null);
  const mark = useRef<HTMLSpanElement>(null);
  const timer = useRef<number | undefined>(undefined);
  const moved = useRef(false);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  // The resend countdown, a second at a time.
  useEffect(() => {
    if (resendIn <= 0) return;
    const tick = window.setTimeout(() => setResendIn(resendIn - 1), 1000);
    return () => window.clearTimeout(tick);
  }, [resendIn]);

  // A new step moves focus to its heading so screen readers hear where they are; the summary bursts.
  useEffect(() => {
    if (!moved.current) return;
    heading.current?.focus();
    if (step === LAST && mark.current) burst(mark.current);
  }, [step]);

  const go = (next: number) => {
    moved.current = true;
    setStep(next);
  };
  const update = (patch: Partial<Setup>) => {
    if ("code" in patch) setCodeError("");
    setSetup((current) => ({ ...current, ...patch }));
  };
  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (!stepReady(step, setup) || checking) return;
    if (step > 0) return go(step + 1);
    setChecking(true);
    timer.current = window.setTimeout(() => {
      setChecking(false);
      if (setup.code === WRONG_CODE) setCodeError("That code is wrong or has expired.");
      else go(1);
    }, CHECK_MS);
  };
  const resend = () => {
    update({ code: "" });
    setResendIn(RESEND_S);
  };
  const restart = () => {
    setSetup(START);
    setOpened(false);
    setInviteError("");
    go(0);
  };

  const { title, text } = STEPS[step];
  const invites = setup.invites.length;
  const continueLabel =
    step === 0 ? "Verify" : step === 3 && invites ? `Send ${invites} invite${invites === 1 ? "" : "s"}` : "Continue";

  return (
    <div className="tpl-onboarding">
      <Panel padded={false} className="tpl-onboarding-card">
        <aside className="tpl-onboarding-side">
          <div className="tpl-onboarding-brand">
            <span className="tpl-onboarding-logo" aria-hidden="true" />
            Harbor
          </div>
          <h1>Set up your workspace</h1>
          <p>A few questions and you're in. It takes about a minute.</p>
          <div className="tpl-onboarding-preview">
            <span className="tpl-onboarding-swatch" style={{ background: setup.color }} aria-hidden="true" />
            <div className="tpl-onboarding-preview-name">
              <strong>{setup.name.trim() || "Your workspace"}</strong>
              <span>harbor.app/{setup.slug || "…"}</span>
            </div>
            <div className="tpl-onboarding-preview-team">
              <Avatar name="Maya Chen" color="blue" size={24} />
              <span>
                You{invites ? ` and ${invites} invited` : ""} · {labelOf(SIZES, setup.size)}
              </span>
            </div>
          </div>
        </aside>

        <form className="tpl-onboarding-main" onSubmit={submit} noValidate>
          <Stepper
            className="tpl-onboarding-stepper"
            aria-label="Setup steps"
            steps={STEPS.map(({ label }) => ({ label }))}
            current={step === LAST ? STEPS.length : step}
            onStepClick={go}
          />
          <div className="tpl-onboarding-progress">
            <span>
              Step {step + 1} of {STEPS.length}
            </span>
            <ProgressBar value={(step + 1) / STEPS.length} size="sm" label="Setup progress" />
          </div>

          <header className="tpl-onboarding-head">
            <h2 ref={heading} tabIndex={-1}>
              {title}
            </h2>
            <p>{text}</p>
          </header>

          <div className="tpl-onboarding-body">
            {step === 0 ? (
              <VerifyStep setup={setup} update={update} error={codeError} resendIn={resendIn} onResend={resend} />
            ) : step === 1 ? (
              <AboutStep setup={setup} update={update} />
            ) : step === 2 ? (
              <WorkspaceStep setup={setup} update={update} />
            ) : step === 3 ? (
              <InviteStep setup={setup} update={update} error={inviteError} onError={setInviteError} />
            ) : (
              <DoneStep setup={setup} mark={mark} />
            )}
            {opened ? (
              <Notice tone="success" title="Opening your workspace">
                In a real app, Harbor would open harbor.app/{setup.slug} now.
              </Notice>
            ) : null}
          </div>

          <footer className="tpl-onboarding-footer">
            {step > 0 && step < LAST ? (
              <Button variant="ghost" icon={<Icon icon={ArrowLeftIcon} />} onClick={() => go(step - 1)}>
                Back
              </Button>
            ) : null}
            {step === 1 || step === 3 ? (
              <Button
                variant="ghost"
                className="tpl-onboarding-skip"
                onClick={() => {
                  if (step === 3) update({ invites: [] });
                  setInviteError("");
                  go(step + 1);
                }}
              >
                Skip
              </Button>
            ) : null}
            {step === LAST ? (
              <>
                <Button variant="ghost" onClick={restart}>
                  Start over
                </Button>
                <Button
                  variant="primary"
                  className="tpl-onboarding-next"
                  icon={<Icon icon={RocketIcon} />}
                  onClick={(event) => {
                    burst(event.currentTarget);
                    setOpened(true);
                  }}
                >
                  Open workspace
                </Button>
              </>
            ) : (
              <Button
                type="submit"
                variant="primary"
                className="tpl-onboarding-next"
                iconEnd={<Icon icon={ArrowRightIcon} />}
                disabled={!stepReady(step, setup)}
                loading={checking}
              >
                {continueLabel}
              </Button>
            )}
          </footer>
        </form>
      </Panel>
    </div>
  );
}
