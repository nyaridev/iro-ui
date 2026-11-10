import type { ReactNode } from "react";
import { type Property } from "../property-list/PropertyList";
export interface PackageInfoProps {
    name: string;
    version: string;
    description?: ReactNode;
    /** The install command: "pnpm add iro-ui". */
    install?: string;
    /** Rows under it: license, size, published. */
    details?: Property[];
    /** Name to version range, as a manifest lists them. */
    dependencies?: Record<string, string>;
    /** Links at the end: the homepage, the repository. */
    links?: {
        label: string;
        href: string;
    }[];
    /** Heading over the dependencies (default "Dependencies"). */
    dependenciesLabel?: string;
    className?: string;
}
/** A package's name, version, install command, details and dependencies. */
export declare function PackageInfo({ name, version, description, install, details, dependencies, links, dependenciesLabel, className, }: PackageInfoProps): import("react").JSX.Element;
