import type { CSSProperties } from "react";
import type { Theme } from "@mui/material/styles";

import { themeTokens } from "@app/theme";

type ThemeStyleVars = CSSProperties & {
  [variable: `--${string}`]: string;
};

/** @brief Builds the CSS variables shared by themed portfolio sections. */
export const getThemeStyleVars = (
  theme: Theme,
  overrides: Partial<ThemeStyleVars> = {},
): ThemeStyleVars => ({
  "--primary-main": theme.palette.primary.main,
  "--primary-dark": theme.palette.primary.dark,
  "--secondary-main": theme.palette.secondary.main,
  "--secondary-light":
    theme.palette.secondary.light || themeTokens.fallbackSecondaryLight,
  "--text-parchment": themeTokens.parchment,
  "--bg-parchment": theme.palette.background.default,
  "--nav-text":
    theme.palette.primary.main === "#f2efde"
      ? theme.palette.primary.dark
      : themeTokens.lightText,
  "--contact-bg": theme.palette.primary.main,
  "--contact-btn-bg": theme.palette.primary.dark,
  "--secondary-gold": theme.palette.secondary.main,
  "--text-color":
    theme.palette.primary.main === "#f2efde"
      ? theme.palette.primary.dark
      : themeTokens.lightText,
  "--chip-bg":
    theme.palette.primary.main === "#f2efde"
      ? theme.palette.primary.dark
      : themeTokens.lightText,
  ...overrides,
});
