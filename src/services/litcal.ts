import {
  getStaticLiturgicalSeason,
  type LiturgicalSeason,
} from "@app/utils/liturgical-utils";
import type { Locale } from "@app/i18n/config";

type LitCalEvent = {
  date?: string | Date | number;
  color?: string | number | Array<string | number>;
  grade?: number;
  name?: string;
  event_key?: string;
};

type LitCalData =
  | LitCalEvent[]
  | { litcal?: LitCalEvent[] }
  | Record<string, unknown>;

const days: Record<string, number> = {
  Sun: 0,
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thu: 4,
  Fri: 5,
  Sat: 6,
};

/**
 * @brief Gets the current liturgical season based on the provided date and time zone.
 * @param date - The date for which to determine the liturgical season.
 * @param timeZone - The time zone to use for the date.
 * @returns The liturgical season.
 */
const getDayOfWeekInTimeZone = (date: Date, timeZone: string): number => {
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone,
    weekday: "short",
  });
  const dayStr = formatter.format(date);
  return days[dayStr] ?? date.getDay();
};

/**
 * @brief Gets the hour of the day in the specified time zone.
 * @param date - The date for which to determine the hour.
 * @param timeZone - The time zone to use for the date.
 * @returns The hour of the day (0-23).
 */
const getHourInTimeZone = (date: Date, timeZone: string): number => {
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hour: "numeric",
    hour12: false,
  });
  return parseInt(formatter.format(date), 10);
};

/**
 * @brief Gets the ISO date string (YYYY-MM-DD) for a given date in the specified time zone.
 * @param dateInput - The date input (Date object, timestamp, or string).
 * @param timeZone - The time zone to use for the date.
 * @returns The ISO date string in the specified time zone.
 */
const getIsoDateInTimeZone = (
  dateInput: Date | number | string,
  timeZone: string,
): string => {
  const d =
    typeof dateInput === "number"
      ? new Date(dateInput > 1e11 ? dateInput : dateInput * 1_000)
      : new Date(dateInput);

  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  return formatter.format(d);
};

/**
 * @brief Maps a LitCalEvent to a LiturgicalSeason based on its color and date.
 * @param event - The LitCalEvent to map.
 * @param userTimeZone - The user's time zone for date calculations.
 * @returns The corresponding LiturgicalSeason or null if no match is found.
 */
const mapLitCalToTheme = (
  event: LitCalEvent | null | undefined,
  userTimeZone: string,
): LiturgicalSeason | null => {
  if (!event) return null;

  const colors = (Array.isArray(event.color) ? event.color : [event.color])
    .filter(
      (value): value is string | number =>
        value !== null && value !== undefined,
    )
    .map((value) => String(value).toLowerCase());

  if (colors.includes("rose") || colors.includes("4")) return "ROSE";
  if (colors.includes("red") || colors.includes("2")) return "MARTYRDOM";

  if (
    colors.includes("purple") ||
    colors.includes("violet") ||
    colors.includes("1")
  ) {
    const eventIso = getIsoDateInTimeZone(
      String(event.date ?? new Date()),
      userTimeZone,
    );
    const month = parseInt(eventIso.split("-")[1], 10) - 1;
    return month === 10 || month === 11 ? "ADVENT" : "LENT";
  }

  if (colors.includes("white") || colors.includes("3")) return "SOLEMNITIES";
  if (colors.includes("green") || colors.includes("0")) return "ORDINARY";

  return null;
};

/** @brief Result returned after resolving the current liturgical calendar event. */
export interface LitCalResult {
  season: LiturgicalSeason;
  name?: string;
}

/**
 * @brief Fetches a localized liturgical event and maps it to a visual season.
 * @param date - The date for which to fetch the liturgical season.
 * @param timeZone - The time zone used for date calculations.
 * @param locale - The language requested from the LitCal API.
 * @returns A promise containing the season and optional event name.
 */
export const fetchApiLiturgicalSeason = async (
  date = new Date(),
  timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone,
  locale: Locale = "en",
): Promise<LitCalResult> => {
  const localDay = getDayOfWeekInTimeZone(date, timeZone);
  const localHour = getHourInTimeZone(date, timeZone);
  const isSaturdayVigil = localDay === 6 && localHour >= 16;

  const targetDate = new Date(date);
  if (isSaturdayVigil) {
    targetDate.setDate(targetDate.getDate() + 1);
  }

  const year = targetDate.getFullYear();
  const url = `https://litcal.johnromanodorazio.com/api/v5/calendar/${year}?year_type=CIVIL&locale=${encodeURIComponent(locale)}`;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 3_000);

  try {
    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (!response.ok) throw new Error(`Status ${response.status}`);

    const data = (await response.json()) as LitCalData;
    const calendarArray: LitCalEvent[] = Array.isArray(data)
      ? data
      : Array.isArray((data as { litcal?: LitCalEvent[] }).litcal)
        ? (data as { litcal: LitCalEvent[] }).litcal
        : (Object.values(
            (data as { litcal?: LitCalEvent[] }).litcal ?? data,
          ) as LitCalEvent[]);

    const targetIsoDate = getIsoDateInTimeZone(targetDate, timeZone);

    const todayEvents = calendarArray.filter((event: LitCalEvent) => {
      if (!event.date) return false;

      const eventIsoDate =
        typeof event.date === "string"
          ? event.date.split("T")[0]
          : getIsoDateInTimeZone(event.date, timeZone);

      return eventIsoDate === targetIsoDate;
    });

    if (todayEvents.length > 0) {
      todayEvents.sort((a, b) => (b.grade ?? 0) - (a.grade ?? 0));
      const primaryEvent = todayEvents[0];
      const mappedTheme = mapLitCalToTheme(primaryEvent, timeZone);

      if (mappedTheme) {
        console.log(
          `[LitCal] [${timeZone}] ${isSaturdayVigil ? "(Saturday Vigil >=4PM) " : ""}Matched "${primaryEvent.name || primaryEvent.event_key}" - Theme: ${mappedTheme}`,
        );

        return {
          season: mappedTheme,
          name:
            primaryEvent.name ||
            primaryEvent.event_key ||
            "Unknown Liturgical Event",
        };
      }
    }

    console.warn(
      `[LitCal] No event found for ${targetIsoDate} in ${timeZone}. Using local fallback.`,
    );

    return { season: getStaticLiturgicalSeason(targetDate) };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.warn(
      "[LitCal] API error or timeout. Using local fallback:",
      message,
    );

    return { season: getStaticLiturgicalSeason(targetDate) };
  }
};
