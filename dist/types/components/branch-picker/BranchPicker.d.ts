export interface BranchPickerProps {
    /** How many versions there are. */
    count: number;
    /** The version shown, from 0, when the app keeps it. */
    index?: number;
    /** The version shown first, when the picker keeps it (default the last). */
    defaultIndex?: number;
    onIndexChange?: (index: number) => void;
    /** The group's name for screen readers (default "Versions"). */
    label?: string;
    previousLabel?: string;
    nextLabel?: string;
    className?: string;
}
/** Previous and next buttons around "n / count". */
export declare function BranchPicker({ count, index, defaultIndex, onIndexChange, label, previousLabel, nextLabel, className, }: BranchPickerProps): import("react").JSX.Element | null;
