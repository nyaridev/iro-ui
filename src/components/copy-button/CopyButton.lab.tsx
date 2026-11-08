// Lab page: CopyButton next to a value, at both sizes.

import { CopyButton } from "./CopyButton";

const HASH = "8c7f2a91d4e3";

export default function CopyButtonLab() {
  return (
    <div className="lab-row">
      <code>{HASH}</code>
      <CopyButton text={HASH} label="Copy the hash" />
      <CopyButton text={HASH} label="Copy the hash (medium)" size="md" />
    </div>
  );
}
