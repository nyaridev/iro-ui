export interface PointerTrack {
    x: number;
    y: number;
    inside: boolean;
    /** Stops tracking. */
    stop: () => void;
}
/** Tracks the pointer over `host` until `stop` runs. */
export declare function followPointer(host: HTMLElement): PointerTrack;
