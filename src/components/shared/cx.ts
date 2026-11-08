// cx: joins class names, skipping empty ones. Internal; not exported from the package.

/** `cx("iro-button", isOn && "on", className)` → `"iro-button on …"`. */
export function cx(...names: (string | false | null | undefined)[]): string {
  return names.filter(Boolean).join(" ");
}
