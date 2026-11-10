/** Splits `items` so at most `max` show (at least two): the first, the folded middle, the rest. */
export declare function foldItems<T>(items: T[], max: number): {
    start: T[];
    folded: T[];
    end: T[];
};
