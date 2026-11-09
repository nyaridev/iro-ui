// SpeechInput: a microphone button for dictation. It listens through the browser's speech recognition and hands the
// words over as they come; a ring pulses while it listens. Where the browser has none, the button is disabled and
// says so. An app that sends audio to its own service records it itself and doesn't need this.

// ── Dependencies ──────────────────────────
import { useEffect, useRef, useState } from "react";
import { IconButton } from "../icon-button/IconButton";
import { cx } from "../shared/cx";
import { MicGlyph } from "../shared/glyphs";

// ── Types ─────────────────────────────────
/** The part of the Web Speech API this uses; TypeScript's DOM types don't have it yet. */
interface Recognition {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  start(): void;
  stop(): void;
  abort(): void;
  onresult: ((event: RecognitionEvent) => void) | null;
  onend: (() => void) | null;
}

interface RecognitionEvent {
  resultIndex: number;
  results: ArrayLike<{ isFinal: boolean; 0: { transcript: string } }>;
}

type RecognitionEngine = new () => Recognition;

export interface SpeechInputProps {
  /** The words heard so far in a phrase, again as they change; `final` once the phrase is settled. */
  onTranscript: (text: string, final: boolean) => void;
  /** A language tag such as "en-US" (default: the page's language). */
  lang?: string;
  /** The button's name while idle (default "Dictate"). */
  label?: string;
  /** Its name while listening (default "Stop dictating"). */
  stopLabel?: string;
  /** Its name where the browser can't listen. */
  unsupportedLabel?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

// ── Private helpers ───────────────────────
const engineOf = (): RecognitionEngine | undefined => {
  if (typeof window === "undefined") return undefined;
  const speech = window as unknown as Record<string, RecognitionEngine | undefined>;
  return speech.SpeechRecognition ?? speech.webkitSpeechRecognition;
};

// ── Public API ────────────────────────────
/** A dictation button on the browser's speech recognition. */
export function SpeechInput({
  onTranscript,
  lang,
  label = "Dictate",
  stopLabel = "Stop dictating",
  unsupportedLabel = "Dictation isn't available in this browser",
  size = "md",
  className,
}: SpeechInputProps) {
  const [listening, setListening] = useState(false);
  const recognition = useRef<Recognition | null>(null);
  const latest = useRef(onTranscript);
  latest.current = onTranscript;
  const Engine = engineOf();

  // Leaving the page while it listens shouldn't leave the microphone on.
  useEffect(() => () => recognition.current?.abort(), []);

  const start = () => {
    if (!Engine) return;
    const next = new Engine();
    next.lang = lang ?? document.documentElement.lang;
    next.continuous = true;
    next.interimResults = true;
    next.onresult = (event) => {
      for (let index = event.resultIndex; index < event.results.length; index++) {
        const result = event.results[index];
        latest.current(result[0].transcript, result.isFinal);
      }
    };
    next.onend = () => {
      recognition.current = null;
      setListening(false);
    };
    recognition.current = next;
    next.start();
    setListening(true);
  };

  return (
    <IconButton
      icon={<MicGlyph />}
      label={Engine ? (listening ? stopLabel : label) : unsupportedLabel}
      size={size}
      active={listening}
      disabled={!Engine}
      data-listening={listening || undefined}
      className={cx("iro-speech-input", className)}
      onClick={() => (listening ? recognition.current?.stop() : start())}
    />
  );
}
