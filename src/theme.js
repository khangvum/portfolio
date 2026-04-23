import { createTheme } from "@mui/material/styles";

// Shared typography settings
const baseTypography = {
  fontFamily: "'Lora', 'serif'",
  h1: { fontFamily: "'Cinzel', serif", fontWeight: 700 },
  h2: { fontFamily: "'Cinzel', serif", fontWeight: 600 },
};

export const seasons = {
  ORDINARY: createTheme({
    palette: {
      primary: { main: "#006241", dark: "#00391b" }, // Green
      secondary: { main: "#B87F0D" }, // Gold
      background: { default: "#f4f1ea" },
    },
    typography: baseTypography,
  }),
  ADVENT: createTheme({
    palette: {
      primary: { main: "#4B0082", dark: "#1A0F24" }, // Purple
      secondary: { main: "#D4AF37" }, // Rose/Champagne
      background: { default: "#f0edf5" },
    },
    typography: baseTypography,
  }),
  LENT: createTheme({
    palette: {
      primary: { main: "#432E54", dark: "#301934" }, // Deep Violet
      secondary: { main: "#D4AF37" },
      background: { default: "#E8E6E1" },
    },
    typography: baseTypography,
  }),
  ROSE: createTheme({
    palette: {
      primary: { main: "#964B58", dark: "#5E2F37" }, // Dusty Liturgical Rose
      secondary: { main: "#D4AF37" },
      background: { default: "#f7f2f2" },
    },
    typography: baseTypography,
  }),
  MARTYRDOM: createTheme({
    palette: {
      // A deep, rich crimson
      primary: { main: "#8B0000", dark: "#4A0404" }, 
      secondary: { main: "#D4AF37" },
      background: { default: "#f5f2f2" },
    },
    typography: baseTypography,
  }),
  SOLEMNITIES: createTheme({
    palette: {
      primary: { main: "#f2efde", dark: "#2C2C2C" }, // White/Grey
      secondary: { main: "#D4AF37" },
      background: { default: "#FFFAF0" },
    },
    typography: baseTypography,
  }),
};
