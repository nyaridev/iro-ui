// Lab page: SpeechInput writing into a text area, and its sizes. Dictation needs a browser with speech recognition;
// elsewhere the button is disabled.

import { useState } from "react";
import { TextArea } from "../text-area/TextArea";
import { SpeechInput } from "./SpeechInput";

export default function SpeechInputLab() {
  const [said, setSaid] = useState("");
  const [hearing, setHearing] = useState("");
  return (
    <div className="lab-stack" style={{ maxWidth: 480 }}>
      <h3>Dictating into a field</h3>
      <div className="lab-row" style={{ alignItems: "flex-start" }}>
        <div style={{ flex: 1 }}>
          <TextArea
            aria-label="Notes"
            placeholder="Press the microphone and speak"
            value={hearing ? `${said}${hearing}` : said}
            onChange={(event) => setSaid(event.currentTarget.value)}
            style={{ width: "100%" }}
          />
        </div>
        <SpeechInput
          onTranscript={(text, final) => {
            if (final) {
              setSaid((before) => `${before}${text.trim()} `);
              setHearing("");
            } else setHearing(text);
          }}
        />
      </div>
      <h3>Sizes</h3>
      <div className="lab-row">
        <SpeechInput size="sm" onTranscript={() => {}} />
        <SpeechInput onTranscript={() => {}} />
        <SpeechInput size="lg" onTranscript={() => {}} />
      </div>
    </div>
  );
}
