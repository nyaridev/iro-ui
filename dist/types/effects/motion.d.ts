export type MotionMode = "full" | "smooth" | "reduced" | "off";
/** The motion mode `element` is in: its root's `data-iro-motion`, or the system's reduced-motion setting. */
export declare function motionOf(element: Element | null): MotionMode;
