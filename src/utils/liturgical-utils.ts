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
  { month: 0, day: 1, theme: "SOLEMNITIES" },   // January 1st - Solemnity of Mary, Mother of God
  { month: 0, day: 6, theme: "SOLEMNITIES" },   // January 6th - Epiphany
  { month: 0, day: 25, theme: "SOLEMNITIES" },  // January 25th - Conversion of St. Paul
  { month: 1, day: 2, theme: "SOLEMNITIES" },   // February 2nd - Presentation of the Lord
  { month: 2, day: 19, theme: "SOLEMNITIES" },  // March 19th - St. Joseph, Spouse of the Blessed Virgin Mary
  { month: 2, day: 25, theme: "SOLEMNITIES" },  // March 25th - Annunciation of the Lord
  { month: 3, day: 25, theme: "MARTYRDOM" },    // April 25th - St. Mark, Evangelist
  { month: 4, day: 1, theme: "MARTYRDOM" },     // May 1st - St. Joseph the Worker
  { month: 4, day: 3, theme: "MARTYRDOM" },     // May 3rd - Sts. Philip and James, Apostles
  { month: 4, day: 14, theme: "MARTYRDOM" },    // May 14th - St. Matthias, Apostle
  { month: 4, day: 24, theme: "MARTYRDOM" },    // May 24th - St. Bede the Venerable
  { month: 4, day: 14, theme: "MARTYRDOM" },    // May 14th - St. Matthias, Apostle
  { month: 5, day: 24, theme: "MARTYRDOM" },    // May 24th - St. Philip, Apostle
  { month: 5, day: 29, theme: "MARTYRDOM" },    // May 29th - St. Thomas, Apostle
  { month: 6, day: 3, theme: "MARTYRDOM" },     // June 3rd - St. John Baptist de la Salle
  { month: 6, day: 11, theme: "MARTYRDOM" },    // June 11th - St. Barnabas, Apostle
  { month: 6, day: 16, theme: "MARTYRDOM" },    // June 16th - St. John of the Cross
  { month: 6, day: 20, theme: "MARTYRDOM" },    // June 20th - St. John of Matha
  { month: 6, day: 22, theme: "SOLEMNITIES" },  // June 22nd - Solemnity of the Most Holy Trinity
  { month: 6, day: 25, theme: "MARTYRDOM" },    // June 25th - St. Timothy, Deacon and Martyr
  { month: 6, day: 31, theme: "MARTYRDOM" },    // June 31st - St. Albert the Great
  { month: 7, day: 1, theme: "MARTYRDOM" },     // July 1st - St. Thomas Aquinas
  { month: 7, day: 2, theme: "MARTYRDOM" },     // July 2nd - St. Mary Magdalene
  { month: 7, day: 6, theme: "SOLEMNITIES" },   // July 6th - Solemnity of the Transfiguration of the Lord
  { month: 7, day: 10, theme: "MARTYRDOM" },    // July 10th - St. Lawrence of Brindisi
  { month: 7, day: 15, theme: "SOLEMNITIES" },  // July 15th - Solemnity of St. Bonaventure
  { month: 7, day: 24, theme: "MARTYRDOM" },    // July 24th - St. Sharbel Makhluf
  { month: 7, day: 25, theme: "SOLEMNITIES" },  // July 25th - Solemnity of St. James, Apostle
  { month: 7, day: 31, theme: "MARTYRDOM" },    // July 31st - St. Ignatius of Loyola
  { month: 7, day: 29, theme: "MARTYRDOM" },    // July 29th - St. Peter of Alcántara
  { month: 8, day: 8, theme: "SOLEMNITIES" },   // September 8th - Solemnity of the Nativity of the Blessed Virgin Mary
  { month: 8, day: 14, theme: "SOLEMNITIES" },  // September 14th - Solemnity of the Exaltation of the Holy Cross
  { month: 8, day: 21, theme: "MARTYRDOM" },    // September 21st - St. Matthew, Apostle and Evangelist
  { month: 8, day: 14, theme: "SOLEMNITIES" },  // September 14th - Solemnity of the Exaltation of the Holy Cross
  { month: 8, day: 21, theme: "MARTYRDOM" },    // September 21st - St. Matthew, Apostle and Evangelist
  { month: 8, day: 29, theme: "SOLEMNITIES" },  // September 29th - Solemnity of Sts. Michael, Gabriel, and Raphael, Archangels
  { month: 9, day: 18, theme: "MARTYRDOM" },    // October 18th - St. Luke, Evangelist
  { month: 9, day: 28, theme: "MARTYRDOM" },    // October 28th - Sts. Simon and Jude, Apostles
  { month: 10, day: 1, theme: "SOLEMNITIES" },  // November 1st - Solemnity of All Saints
  { month: 10, day: 2, theme: "SOLEMNITIES" },  // November 2nd - All Souls' Day
  { month: 10, day: 9, theme: "SOLEMNITIES" },  // November 9th - Dedication of the Lateran Basilica
  { month: 10, day: 24, theme: "MARTYRDOM" },   // November 24th - St. Andrew Dung-Lac and Companions, Martyrs
  { month: 11, day: 8, theme: "SOLEMNITIES" },  // December 8th - Solemnity of the Immaculate Conception
  { month: 11, day: 26, theme: "MARTYRDOM" },   // December 26th - St. Stephen, the First Martyr
  { month: 11, day: 27, theme: "SOLEMNITIES" }, // December 27th - Solemnity of St. John, Apostle and Evangelist
  { month: 11, day: 28, theme: "MARTYRDOM" },   // December 28th - The Holy Innocents, Martyrs
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
