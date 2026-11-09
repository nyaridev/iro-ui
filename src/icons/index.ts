// iro-ui/icons (ADR-0009): every icon as plain data, one export each, so apps bundle only what they import. React
// apps draw them with `<Icon icon={FolderIcon} />` from iro-ui; other apps build the svg from `iconMarkup`.

export { allIcons } from "./all";
export { type IconData, type IconParts, icon, iconMarkup } from "./icon";
export * from "./set/arrows";
export * from "./set/basics";
export * from "./set/brands";
export * from "./set/charts";
export * from "./set/chevrons";
export * from "./set/code";
export * from "./set/communication";
export * from "./set/controls";
export * from "./set/devices";
export * from "./set/editing";
export * from "./set/files";
export * from "./set/folders";
export * from "./set/history";
export * from "./set/layout";
export * from "./set/marks";
export * from "./set/media";
export * from "./set/nature";
export * from "./set/people";
export * from "./set/places";
export * from "./set/security";
export * from "./set/status";
export * from "./set/structure";
export * from "./set/tools";
