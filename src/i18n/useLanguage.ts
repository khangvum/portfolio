import { useContext } from "react";

import { LanguageContext } from "./LanguageContext";
import type { LanguageContextValue } from "./LanguageContext";

/**
 * @brief Accesses the active locale, translations, and locale switcher.
 * @returns The language context value.
 * @throws Error when used outside a LanguageProvider.
 */
export const useLanguage = (): LanguageContextValue => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
