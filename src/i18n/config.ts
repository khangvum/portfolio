import en from "./en.json";
import fr from "./fr.json";
import la from "./la.json";

/** @brief The complete shape of a locale translation resource. */
export type TranslationSet = typeof en;

/** @brief Translation resources registered for the application. */
const translationResources = {
  en,
  fr,
  la,
} satisfies Record<string, TranslationSet>;

/** @brief A supported application locale. */
export type Locale = keyof typeof translationResources;

/** @brief Supported language codes derived from the translation registry. */
export const supportedLocales = Object.keys(
  translationResources,
) as Locale[];

/** @brief Translation resources indexed by supported locale. */
export const translations = translationResources;

/**
 * @brief Resolves a locale from a URL pathname.
 * @param pathname - The pathname to inspect.
 * @returns The matching locale, or English when unsupported.
 */
export const getLocaleFromPath = (
  pathname = window.location.pathname,
): Locale => {
  const pathLocale = pathname.split("/")[1];
  return supportedLocales.includes(pathLocale as Locale)
    ? (pathLocale as Locale)
    : "en";
};

/**
 * @brief Builds the canonical path for a locale.
 * @param locale - The locale to encode in the path.
 * @returns The locale path, with English using the root path.
 */
export const getLocalePath = (locale: Locale): string =>
  locale === "en" ? "/" : `/${locale}/`;

/** @brief Resolves the locale used during the initial application render. */
export const getInitialLocale = (): Locale => {
  const pathLocale = getLocaleFromPath();

  if (window.location.pathname !== "/") {
    return pathLocale;
  }

  const storedLocale = window.localStorage.getItem("portfolio-locale");
  return supportedLocales.includes(storedLocale as Locale)
    ? (storedLocale as Locale)
    : pathLocale;
};
