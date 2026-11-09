// Lab page: Attachment as a file, an image, uploading, failed, removable, and with a long name.

import { Attachment } from "./Attachment";

// A small inline picture, so the page needs no network.
const PICTURE =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40'><rect width='40' height='40' fill='%232a78d6'/><circle cx='28' cy='12' r='5' fill='%23eda100'/><path d='M0 40 L14 20 L26 32 L32 26 L40 34 V40Z' fill='%231baf7a'/></svg>";

export default function AttachmentLab() {
  return (
    <div className="lab-row" style={{ alignItems: "flex-start" }}>
      <Attachment name="q3-report.pdf" kind="PDF" size={2_400_000} />
      <Attachment name="cover.png" kind="PNG" size={812_000} preview={PICTURE} onRemove={() => undefined} />
      <Attachment name="dataset.csv" kind="CSV" status="uploading" progress={0.45} onRemove={() => undefined} />
      <Attachment name="video.mov" status="error" onRemove={() => undefined} />
      <Attachment name="a-very-long-file-name-that-does-not-fit.txt" kind="TXT" size={920} />
    </div>
  );
}
