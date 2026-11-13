import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import {
  getInitialLocale,
  getLocalePath,
  getLocaleFromPath,
  translations,
} from "./config";
import { LanguageContext } from "./LanguageContext";

const LOCALE_STORAGE_KEY = "portfolio-locale";

/**
 * @brief Provides locale state and translated content to the application.
 * @param children - Components that consume the language context.
 */
export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [locale, setLocaleState] = useState(getInitialLocale);

  useEffect(() => {
    const handlePopState = () => setLocaleState(getLocaleFromPath());
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    const content = translations[locale];
    document.documentElement.lang = locale;
    document.title = content.documentTitle;
    document
      .querySelector<HTMLMetaElement>('meta[name="description"]')
      ?.setAttribute("content", content.metaDescription);
  }, [locale]);

  const setLocale = useCallback(
    (nextLocale: typeof locale) => {
      if (nextLocale === locale) {
        window.localStorage.setItem(LOCALE_STORAGE_KEY, nextLocale);

        if (window.location.pathname !== getLocalePath(nextLocale)) {
          window.location.assign(getLocalePath(nextLocale));
        }

        return;
      }

      window.history.pushState({}, "", getLocalePath(nextLocale));
      window.localStorage.setItem(LOCALE_STORAGE_KEY, nextLocale);
      setLocaleState(nextLocale);
      window.scrollTo({ top: 0 });
    },
    [locale],
  );

  const value = useMemo(
    () => ({ locale, translations: translations[locale], setLocale }),
    [locale, setLocale],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
