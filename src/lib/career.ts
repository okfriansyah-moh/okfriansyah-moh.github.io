/** First engineering role began May 2013 (KMK Online). */
export const ENGINEERING_CAREER_START_YEAR = 2013;

/** Whole years since career start, e.g. 13 → "13+" in 2026. */
export function engineeringYearsPlus(referenceDate: Date = new Date()): string {
  const years = referenceDate.getFullYear() - ENGINEERING_CAREER_START_YEAR;
  return `${Math.max(1, years)}+`;
}

export function engineeringYearsCount(referenceDate: Date = new Date()): number {
  return Math.max(1, referenceDate.getFullYear() - ENGINEERING_CAREER_START_YEAR);
}
