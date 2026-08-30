export type LiturgicalSeason =
  | "SOLEMNITIES"
  | "MARTYRDOM"
  | "ROSE"
  | "LENT"
  | "ADVENT"
  | "ORDINARY";

type FixedSolemnity = {
  month: number;
  day: number;
  theme: LiturgicalSeason;
};

// Months are 0-indexed (0-11)
const FIXED_SOLEMNITIES: FixedSolemnity[] = [
  { month: 0, day: 1, theme: "SOLEMNITIES" },
  { month: 0, day: 6, theme: "SOLEMNITIES" },
  { month: 0, day: 25, theme: "SOLEMNITIES" },
  { month: 1, day: 2, theme: "SOLEMNITIES" },
  { month: 2, day: 19, theme: "SOLEMNITIES" },
  { month: 2, day: 25, theme: "SOLEMNITIES" },
  { month: 3, day: 25, theme: "MARTYRDOM" },
  { month: 4, day: 3, theme: "MARTYRDOM" },
  { month: 4, day: 14, theme: "MARTYRDOM" },
  { month: 5, day: 24, theme: "MARTYRDOM" },
  { month: 5, day: 29, theme: "MARTYRDOM" },
  { month: 6, day: 3, theme: "MARTYRDOM" },
  { month: 6, day: 11, theme: "MARTYRDOM" },
  { month: 6, day: 16, theme: "MARTYRDOM" },
  { month: 6, day: 20, theme: "MARTYRDOM" },
  { month: 6, day: 22, theme: "SOLEMNITIES" },
  { month: 6, day: 25, theme: "MARTYRDOM" },
  { month: 6, day: 31, theme: "MARTYRDOM" },
  { month: 7, day: 1, theme: "MARTYRDOM" },
  { month: 7, day: 2, theme: "MARTYRDOM" },
  { month: 7, day: 6, theme: "SOLEMNITIES" },
  { month: 7, day: 10, theme: "MARTYRDOM" },
  { month: 7, day: 15, theme: "SOLEMNITIES" },
  { month: 7, day: 24, theme: "MARTYRDOM" },
  { month: 7, day: 29, theme: "MARTYRDOM" },
  { month: 8, day: 8, theme: "SOLEMNITIES" },
  { month: 8, day: 14, theme: "SOLEMNITIES" },
  { month: 8, day: 21, theme: "MARTYRDOM" },
  { month: 8, day: 29, theme: "SOLEMNITIES" },
  { month: 9, day: 18, theme: "MARTYRDOM" },
  { month: 9, day: 28, theme: "MARTYRDOM" },
  { month: 10, day: 1, theme: "SOLEMNITIES" },
  { month: 10, day: 2, theme: "SOLEMNITIES" },
  { month: 10, day: 9, theme: "SOLEMNITIES" },
  { month: 10, day: 24, theme: "MARTYRDOM" },
  { month: 11, day: 8, theme: "SOLEMNITIES" },
  { month: 11, day: 26, theme: "MARTYRDOM" },
  { month: 11, day: 27, theme: "SOLEMNITIES" },
  { month: 11, day: 28, theme: "MARTYRDOM" },
];

export const getEaster = (year: number): Date => {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = (c % 100) % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return new Date(year, month - 1, day);
};

/**
 * Gets the ISO date string (YYYY-MM-DD) for a given date in the specified time zone.
 * @param dateInput - The date input (Date object, timestamp, or string).
 * @param timeZone - The time zone to use for the date.
 * @returns The ISO date string in the specified time zone.
 */
export const getStaticLiturgicalSeason = (
  date = new Date(),
): LiturgicalSeason => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const today = new Date(year, month, day);

  const fixedFeast = FIXED_SOLEMNITIES.find(
    (f) => f.month === month && f.day === day,
  );
  if (fixedFeast) return fixedFeast.theme;

  const easter = getEaster(year);
  const pentecost = new Date(easter);
  pentecost.setDate(easter.getDate() + 49);
  const ashWednesday = new Date(easter);
  ashWednesday.setDate(easter.getDate() - 46);

  const trinitySunday = new Date(pentecost);
  trinitySunday.setDate(pentecost.getDate() + 7);

  const corpusChristi = new Date(pentecost);
  corpusChristi.setDate(pentecost.getDate() + 14);

  const christmas = new Date(year, 11, 25);
  const epiphany = new Date(year + 1, 0, 6);

  const nov30 = new Date(year, 10, 30);
  const adventStart = new Date(nov30);
  adventStart.setDate(nov30.getDate() - nov30.getDay());

  const gaudeteSunday = new Date(adventStart);
  gaudeteSunday.setDate(adventStart.getDate() + 14);
  const laetareSunday = new Date(easter);
  laetareSunday.setDate(easter.getDate() - 21);

  if (today.getTime() === pentecost.getTime()) return "MARTYRDOM";

  if (
    today.getTime() === gaudeteSunday.getTime() ||
    today.getTime() === laetareSunday.getTime()
  ) {
    return "ROSE";
  }

  if (today >= easter && today < pentecost) return "SOLEMNITIES";
  if (today >= christmas && today < epiphany) return "SOLEMNITIES";
  if (
    today.getTime() === trinitySunday.getTime() ||
    today.getTime() === corpusChristi.getTime()
  ) {
    return "SOLEMNITIES";
  }

  if (today >= ashWednesday && today < easter) return "LENT";
  if (today >= adventStart && today < christmas) return "ADVENT";

  return "ORDINARY";
};
