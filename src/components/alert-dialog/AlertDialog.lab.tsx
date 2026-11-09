// Lab page: AlertDialog for a destructive action, a plain one, and one whose action takes a moment (and fails every
// other time, to show it staying open), with the result shown after.

import { useState } from "react";
import { Button } from "../button/Button";
import { AlertDialog } from "./AlertDialog";

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default function AlertDialogLab() {
  const [result, setResult] = useState("Nothing yet.");
  const [tries, setTries] = useState(0);
  return (
    <div className="lab-stack">
      <div className="lab-row">
        <AlertDialog
          trigger={
            <Button variant="danger" data-lab-state="click">
              Delete project
            </Button>
          }
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
        <AlertDialog
          trigger={<Button>Empty the trash</Button>}
          title="Empty the trash?"
          description="The 12 files in it are deleted for good."
          confirmLabel="Empty trash"
          onConfirm={async () => {
            setTries(tries + 1);
            await wait(1200);
            if (tries % 2 === 0) {
              setResult("Couldn't reach the server. The dialog stayed open; try again.");
              throw new Error("Lab: a failed attempt, on purpose");
            }
            setResult("Trash emptied.");
          }}
        />
      </div>
      <span className="lab-hint">{result}</span>
    </div>
  );
}
