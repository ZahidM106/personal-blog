const WORDS_PER_MINUTE = 220;

/** Estimate reading time from raw markdown/MDX body text. */
export function readingTime(body: string): number {
  const words = body.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
}
