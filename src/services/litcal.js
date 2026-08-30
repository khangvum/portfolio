import { getStaticLiturgicalSeason } from "../utils/liturgical-utils";

/**
 * Gets the day of the week (0 = Sunday, 6 = Saturday) for a Date object in a specific time zone.
 * @param {Date} date - Target date object.
 * @param {string} timeZone - IANA time zone string.
 * @returns {number} - Day index from 0 (Sunday) to 6 (Saturday).
 */
const getDayOfWeekInTimeZone = (date, timeZone) => {
  // Uses native Intl.DateTimeFormat to resolve the weekday string in the target time zone
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone,
    weekday: "short",
  });
  const dayStr = formatter.format(date);
  const days = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
  return days[dayStr] ?? date.getDay();
};

/**
 * Gets the local hour (0-23) for a Date object in a specific time zone.
 * @param {Date} date - Target date object.
 * @param {string} timeZone - IANA time zone string.
 * @returns {number} - Hour integer in 24-hour format.
 */
const getHourInTimeZone = (date, timeZone) => {
  // Uses native Intl.DateTimeFormat to compute 24-hour time in the target time zone
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hour: "numeric",
    hour12: false,
  });
  return parseInt(formatter.format(date), 10);
};

/**
 * Fetches the liturgical season from the LitCal v5 API, with a fallback to static calculation.
 * @param {Date} date - The date for which to fetch the liturgical season.
 * @param {string} [timeZone] - Optional IANA time zone string. Defaults to the browser's current time zone.
 * @returns {Promise<string>} - A promise that resolves to the liturgical season key.
 */
const getIsoDateInTimeZone = (dateInput, timeZone) => {
  const d =
    typeof dateInput === "number"
      ? new Date(dateInput > 1e11 ? dateInput : dateInput * 1_000)
      : dateInput;

  // Uses native Intl.DateTimeFormat to compute YYYY-MM-DD in the target time zone
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  return formatter.format(d); // Outputs "YYYY-MM-DD" reliably
};

/**
 * Maps a LitCal event to a liturgical season theme based on its color and date.
 * @param {*} event - The LitCal event object containing color and date information.
 * @param {*} userTimeZone - The IANA time zone string to interpret the event date correctly.
 * @returns {string|null} - The liturgical season theme key, or null if no match is found.
 */
const mapLitCalToTheme = (event, userTimeZone) => {
  if (!event) return null;

  const colors = (Array.isArray(event.color) ? event.color : [event.color])
    .filter(Boolean)
    .map((c) => String(c).toLowerCase());

  if (colors.includes("rose") || colors.includes("4")) return "ROSE";
  if (colors.includes("red") || colors.includes("2")) return "MARTYRDOM";

  if (
    colors.includes("purple") ||
    colors.includes("violet") ||
    colors.includes("1")
  ) {
    // Determine month based on the specified time zone
    const eventIso = getIsoDateInTimeZone(event.date, userTimeZone);
    const month = parseInt(eventIso.split("-")[1], 10) - 1; // 0-indexed month

    return month === 10 || month === 11 ? "ADVENT" : "LENT";
  }

  if (colors.includes("white") || colors.includes("3")) return "SOLEMNITIES";
  if (colors.includes("green") || colors.includes("0")) return "ORDINARY";

  return null;
};

/**
 * Fetches the liturgical season dynamically based on the requested or user time zone.
 * @param {Date} date - Target date object.
 * @param {string} [timeZone] - Optional IANA time zone string. Defaults to the browser's current time zone.
 */
export const fetchApiLiturgicalSeason = async (
  date = new Date(),
  timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone,
) => {
  // Check if today is Saturday after 4:00 PM (16:00) to account for Sunday anticipatory Vigil
  const localDay = getDayOfWeekInTimeZone(date, timeZone);
  const localHour = getHourInTimeZone(date, timeZone);
  const isSaturdayVigil = localDay === 6 && localHour >= 16;

  const targetDate = new Date(date);
  if (isSaturdayVigil) {
    targetDate.setDate(targetDate.getDate() + 1);
  }

  // 1. Fetch the LitCal v5 API for the given year
  const year = targetDate.getFullYear();
  const url = `https://litcal.johnromanodorazio.com/api/v5/calendar/${year}?year_type=CIVIL`;

  // 2. Set up a timeout to abort the fetch if it takes too long
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 3_000);

  // 3. Attempt to fetch and process the API response
  try {
    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (!response.ok) throw new Error(`Status ${response.status}`);

    const data = await response.json();
    const calendarArray = Array.isArray(data)
      ? data
      : Array.isArray(data.litcal)
        ? data.litcal
        : Object.values(data.litcal || data);

    // Get the target date formatted in the specified time zone
    const targetIsoDate = getIsoDateInTimeZone(targetDate, timeZone);

    // Filter events matching targetIsoDate in the same time zone
    const todayEvents = calendarArray.filter((event) => {
      if (!event.date) return false;

      const eventIsoDate =
        typeof event.date === "string"
          ? event.date.split("T")[0]
          : getIsoDateInTimeZone(event.date, timeZone);

      return eventIsoDate === targetIsoDate;
    });

    // Sort events by grade and map to theme
    if (todayEvents.length > 0) {
      todayEvents.sort((a, b) => (b.grade || 0) - (a.grade || 0));
      const primaryEvent = todayEvents[0];
      const mappedTheme = mapLitCalToTheme(primaryEvent, timeZone);

      if (mappedTheme) {
        console.log(
          `[LitCal] [${timeZone}] ${isSaturdayVigil ? "(Saturday Vigil >=4PM) " : ""}Matched "${primaryEvent.name || primaryEvent.event_key}" - Theme: ${mappedTheme}`,
        );
        return mappedTheme;
      }
    }

    // If no matching event is found, use a local fallback
    console.warn(
      `[LitCal] No event found for ${targetIsoDate} in ${timeZone}. Using local fallback.`,
    );
    return getStaticLiturgicalSeason(targetDate);
  } catch (error) {
    console.warn(
      "[LitCal] API error or timeout. Using local fallback:",
      error.message || error,
    );
    return getStaticLiturgicalSeason(date);
  }
};
