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
/** A dictation button on the browser's speech recognition. */
export declare function SpeechInput({ onTranscript, lang, label, stopLabel, unsupportedLabel, size, className, }: SpeechInputProps): import("react").JSX.Element;
