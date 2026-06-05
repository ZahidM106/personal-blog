/** Format a Date as "Month DD, YYYY" (e.g. "June 5, 2025"). */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year:  'numeric',
    month: 'long',
    day:   'numeric',
  }).format(date);
}

/** Format a Date as "YYYY-MM-DD" for datetime attributes. */
export function isoDate(date: Date): string {
  return date.toISOString().split('T')[0];
}
