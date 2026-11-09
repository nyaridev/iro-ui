// TagInput's rule for adding typed text: split on commas, trim, skip blanks and tags already there (in any case),
// and stop at the limit.

// ── Public API ────────────────────────────
/** `tags` with the tags in `text` added. */
export function addTags(tags: string[], text: string, max = Number.POSITIVE_INFINITY): string[] {
  const next = [...tags];
  for (const part of text.split(",")) {
    const tag = part.trim();
    if (next.length >= max) break;
    if (tag && !next.some((existing) => existing.toLowerCase() === tag.toLowerCase())) next.push(tag);
  }
  return next;
}
