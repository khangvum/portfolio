import { createContext } from "react";

import type { Locale, TranslationSet } from "./config";

/** @brief Shared locale state exposed to the application. */
export type LanguageContextValue = {
  locale: Locale;
  translations: TranslationSet;
  setLocale: (nextLocale: Locale) => void;
};

/** @brief React context for the active locale and its translation resources. */
export const LanguageContext = createContext<LanguageContextValue | null>(null);
