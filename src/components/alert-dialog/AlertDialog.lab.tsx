// Lab page: AlertDialog for a destructive action and a plain one, with the result shown after.

import { useState } from "react";
import { Button } from "../button/Button";
import { AlertDialog } from "./AlertDialog";

export default function AlertDialogLab() {
  const [result, setResult] = useState("Nothing yet.");
  return (
    <div className="lab-stack">
      <div className="lab-row">
        <AlertDialog
          trigger={<Button variant="danger">Delete project</Button>}
          title="Delete this project?"
          description="Its 48 files and their history go too. This can't be undone."
          confirmLabel="Delete"
          onConfirm={() => setResult("Deleted.")}
        />
        <AlertDialog
          trigger={<Button>Sign out everywhere</Button>}
          tone="accent"
          title="Sign out on every device?"
          description="You'll need to sign in again on each one."
          confirmLabel="Sign out"
          cancelLabel="Stay signed in"
          onConfirm={() => setResult("Signed out everywhere.")}
        />
      </div>
      <span className="lab-hint">{result}</span>
    </div>
  );
}
