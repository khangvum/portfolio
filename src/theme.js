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
      primary: { main: "#4B0082", dark: "#2E0854" }, // Purple
      secondary: { main: "#E0C097" }, // Rose/Champagne
      background: { default: "#f0edf5" },
    },
    typography: baseTypography,
  }),
  LENT: createTheme({
    palette: {
      primary: { main: "#5D3FD3", dark: "#301934" }, // Deep Violet
      secondary: { main: "#A9A9A9" }, // Ash/Grey
      background: { default: "#ebebeb" },
    },
    typography: baseTypography,
  }),
  ROSE: createTheme({
    palette: {
      primary: { main: "#964B58", dark: "#5E2F37" }, // Dusty Liturgical Rose
      secondary: { main: "#D4AF37" }, // Antique Gold to complement the Rose
      background: { default: "#f7f2f2" },
    },
    typography: baseTypography,
  }),
  EASTER: createTheme({
    palette: {
      primary: { main: "#ffffff", dark: "#e0e0e0" }, // White/Silver
      secondary: { main: "#FFD700" }, // Bright Gold
      background: { default: "#ffffff" },
    },
    typography: baseTypography,
  }),
};
