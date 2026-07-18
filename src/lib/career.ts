/** First engineering role began May 2013 (KMK Online). */
export const ENGINEERING_CAREER_START_YEAR = 2013;

/** Whole years since career start, e.g. 2026 → 13 (first role May 2013). */
export function engineeringYearsCount(referenceDate: Date = new Date()): number {
  return Math.max(1, referenceDate.getFullYear() - ENGINEERING_CAREER_START_YEAR);
}

/** Same count with trailing "+", for metric chips (e.g. "13+"). */
export function engineeringYearsPlus(referenceDate: Date = new Date()): string {
  return `${engineeringYearsCount(referenceDate)}+`;
}
