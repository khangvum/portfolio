// Months are 0-indexed (0-11)
const FIXED_SOLEMNITIES = [
  { month: 0, day: 1, theme: "SOLEMNITIES" },   // Mary, Mother of God (Jan 1)
  { month: 0, day: 6, theme: "SOLEMNITIES" },   // Epiphany (Jan 6)
  { month: 0, day: 25, theme: "SOLEMNITIES" },  // Conversion of St. Paul (Jan 25)
  { month: 2, day: 19, theme: "SOLEMNITIES" },  // St. Joseph (March 19)
  { month: 2, day: 25, theme: "SOLEMNITIES" },  // Annunciation (March 25)
  { month: 5, day: 24, theme: "MARTYRDOM" },    // Birth of St. John the Baptist (June 24)
  { month: 5, day: 29, theme: "MARTYRDOM" },    // Sts. Peter and Paul (June 29)
  { month: 7, day: 6, theme: "SOLEMNITIES" },   // Transfiguration (Aug 6)
  { month: 7, day: 15, theme: "SOLEMNITIES" },  // Assumption (Aug 15)
  { month: 10, day: 1, theme: "SOLEMNITIES" },  // All Saints (Nov 1)
  { month: 10, day: 2, theme: "SOLEMNITIES" },  // All Souls (Nov 2)
  { month: 10, day: 24, theme: "MARTYRDOM" },   // Vietnamese Martyrs (Nov 24)
  { month: 11, day: 8, theme: "SOLEMNITIES" },  // Immaculate Conception (Dec 8)
];

export const getEaster = (year) => {
  const a = year % 19,
    b = Math.floor(year / 100),
    c = year % 100;
  const d = Math.floor(b / 4),
    e = b % 4,
    f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4),
    k = (c % 100) % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return new Date(year, month - 1, day);
};

export const getLiturgicalSeason = (date = new Date()) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const today = new Date(year, month, day);

  // 1. Check for fixed solemnities
  const fixedFeast = FIXED_SOLEMNITIES.find(
    (f) => f.month === month && f.day === day,
  );
  if (fixedFeast) return fixedFeast.theme;

  // 2. Calculate moveable dates
  const easter = getEaster(year);
  const pentecost = new Date(easter);
  pentecost.setDate(easter.getDate() + 49);
  const ashWednesday = new Date(easter);
  ashWednesday.setDate(easter.getDate() - 46);

  const christmas = new Date(year, 11, 25);
  const epiphany = new Date(year + 1, 0, 6);

  const nov30 = new Date(year, 10, 30);
  const adventStart = new Date(nov30);
  adventStart.setDate(nov30.getDate() - nov30.getDay());

  // Specific Rose Sundays
  const gaudeteSunday = new Date(adventStart);
  gaudeteSunday.setDate(adventStart.getDate() + 14);
  const laetareSunday = new Date(easter);
  laetareSunday.setDate(easter.getDate() - 21);

  // 1. MARTYRDOM (Red) - Pentecost or Specific Feast Days
  if (today.getTime() === pentecost.getTime()) return "MARTYRDOM";

  // 2. ROSE (Rose) - Only on the specific Sundays
  if (
    today.getTime() === gaudeteSunday.getTime() ||
    today.getTime() === laetareSunday.getTime()
  )
    return "ROSE";

  // 3. SOLEMNITIES (White/Gold) - Eastertide & Christmastide
  if (today >= easter && today < pentecost) return "SOLEMNITIES";
  if (today >= christmas && today < epiphany) return "SOLEMNITIES";

  // 4. LENT (Violet/Plum)
  if (today >= ashWednesday && today < easter) return "LENT";

  // 5. ADVENT (Purple)
  if (today >= adventStart && today < christmas) return "ADVENT";

  // 6. Default to ORDINARY (Green)
  return "ORDINARY";
};
