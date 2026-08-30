import { createTheme, type Theme } from "@mui/material/styles";

export type SeasonKey =
  | "ORDINARY"
  | "ADVENT"
  | "LENT"
  | "ROSE"
  | "MARTYRDOM"
  | "SOLEMNITIES";

const baseTypography = {
  fontFamily: "'Lora', 'serif'",
  h1: { fontFamily: "'Cinzel', serif", fontWeight: 700 },
  h2: { fontFamily: "'Cinzel', serif", fontWeight: 600 },
} as const;

export const seasons: Record<SeasonKey, Theme> = {
  ORDINARY: createTheme({
    palette: {
      primary: { main: "#006241", dark: "#00391b" },
      secondary: { main: "#B87F0D" },
      background: { default: "#f4f1ea" },
    },
    typography: baseTypography,
  }),
  ADVENT: createTheme({
    palette: {
      primary: { main: "#4B0082", dark: "#1A0F24" },
      secondary: { main: "#D4AF37" },
      background: { default: "#f0edf5" },
    },
    typography: baseTypography,
  }),
  LENT: createTheme({
    palette: {
      primary: { main: "#432E54", dark: "#301934" },
      secondary: { main: "#D4AF37" },
      background: { default: "#E8E6E1" },
    },
    typography: baseTypography,
  }),
  ROSE: createTheme({
    palette: {
      primary: { main: "#964B58", dark: "#5E2F37" },
      secondary: { main: "#D4AF37" },
      background: { default: "#f7f2f2" },
    },
    typography: baseTypography,
  }),
  MARTYRDOM: createTheme({
    palette: {
      primary: { main: "#8B0000", dark: "#4A0404" },
      secondary: { main: "#D4AF37" },
      background: { default: "#f5f2f2" },
    },
    typography: baseTypography,
  }),
  SOLEMNITIES: createTheme({
    palette: {
      primary: { main: "#f2efde", dark: "#2C2C2C" },
      secondary: { main: "#D4AF37" },
      background: { default: "#FFFAF0" },
    },
    typography: baseTypography,
  }),
};
