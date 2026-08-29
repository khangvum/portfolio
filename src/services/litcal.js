import { getStaticLiturgicalSeason } from "../utils/liturgical-utils";

/**
 * Maps a LitCal v5 API event to a theme key.
 * @param {*} event - The LitCal event object.
 * @returns {string|null} - The corresponding theme key or null if no match is found.
 */
const mapLitCalToTheme = (event) => {
  if (!event) return null;

  // Normalize color property to an array of lowercase strings
  const colors = (Array.isArray(event.color) ? event.color : [event.color])
    .filter(Boolean)
    .map((c) => String(c).toLowerCase());

  if (colors.includes("rose") || colors.includes("4")) {
    return "ROSE";
  }
  if (colors.includes("red") || colors.includes("2")) {
    return "MARTYRDOM";
  }
  if (
    colors.includes("purple") ||
    colors.includes("violet") ||
    colors.includes("1")
  ) {
    const eventDate = event.date ? new Date(event.date * 1000) : new Date();
    const month = eventDate.getUTCMonth(); // 0 = Jan, 10 = Nov, 11 = Dec

    // Nov (10) and Dec (11) purple > ADVENT
    // All other months (Feb-Apr) > LENT
    return month === 10 || month === 11 ? "ADVENT" : "LENT";
  }
  if (colors.includes("white") || colors.includes("3")) {
    return "SOLEMNITIES";
  }
  if (colors.includes("green") || colors.includes("0")) {
    return "ORDINARY";
  }

  return null;
};

/**
 * Fetches the liturgical season for a given date from the LitCal API.
 * @param {Date} date - The date for which to fetch the liturgical season.
 * @returns {Promise<string|null>} - A promise resolving to the liturgical season or null if not found.
 */
export const fetchApiLiturgicalSeason = async (date = new Date()) => {
  const year = date.getFullYear();
  const url = `https://litcal.johnromanodorazio.com/api/v5/calendar/${year}?year_type=CIVIL`;

  // Set a timeout for the fetch request to avoid hanging indefinitely
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 3000); // 3 second limit

  try {
    // Fetch the API data with the abort signal
    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);

    // Check if the response is OK (status 200-299)
    if (!response.ok) throw new Error(`Status ${response.status}`);

    // Parse the JSON response and handle different structures
    const data = await response.json();
    const calendarArray = Array.isArray(data)
      ? data
      : Array.isArray(data.litcal)
        ? data.litcal
        : Object.values(data.litcal || data);

    // Convert the target date to ISO format for comparison
    const targetIsoDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

    // Filter events for the target date and sort by grade to find the highest priority event
    const todayEvents = calendarArray.filter((event) => {
      if (!event.date) return false;
      let eventIsoDate = "";
      if (typeof event.date === "number") {
        const timestampMs = event.date > 1e11 ? event.date : event.date * 1000;
        const d = new Date(timestampMs);
        eventIsoDate = `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}-${String(d.getUTCDate()).padStart(2, "0")}`;
      } else if (typeof event.date === "string") {
        eventIsoDate = event.date.split("T")[0];
      }
      return eventIsoDate === targetIsoDate;
    });

    // If there are events for today, sort them by grade and map the highest priority event to a theme
    if (todayEvents.length > 0) {
      todayEvents.sort((a, b) => (b.grade || 0) - (a.grade || 0));
      const mappedTheme = mapLitCalToTheme(todayEvents[0]);
      if (mappedTheme) return mappedTheme;
    }

    return getStaticLiturgicalSeason(date);
  } catch (error) {
    // Handle fetch errors, timeouts, or other issues gracefully by falling back to the static liturgical season
    console.warn(
      "[LitCal] API timeout or fetch error. Resorting to local fallback:",
      error,
    );
    return getStaticLiturgicalSeason(date);
  }
};
