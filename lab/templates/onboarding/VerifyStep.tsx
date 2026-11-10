// Onboarding, step 1: the code from the email, with a resend that waits out its countdown.

// ── Dependencies ──────────────────────────
import { Button, Field, OtpField } from "../../../src";
import type { StepProps } from "./setup";

// ── Types ─────────────────────────────────
interface VerifyStepProps extends StepProps {
  /** Why the last code was turned down. */
  error: string;
  /** Seconds until another code can be sent. */
  resendIn: number;
  onResend: () => void;
}

// ── Public API ────────────────────────────
/** The verification code and its resend button. */
export function VerifyStep({ setup, update, error, resendIn, onResend }: VerifyStepProps) {
  return (
    <>
      <Field
        label="Verification code"
        hint="Any six digits work; 000000 shows a wrong code."
        error={error || undefined}
      >
        <OtpField groupSize={3} value={setup.code} onValueChange={(code) => update({ code })} />
      </Field>
      <p className="tpl-onboarding-resend">
        Didn't get it?{" "}
        <Button variant="ghost" size="sm" disabled={resendIn > 0} onClick={onResend}>
          {resendIn > 0 ? `Resend in 0:${String(resendIn).padStart(2, "0")}` : "Resend code"}
        </Button>
      </p>
    </>
  );
}
