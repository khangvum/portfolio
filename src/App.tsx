import { useState, useEffect, type MouseEvent } from "react";
import {
  ThemeProvider,
  CssBaseline,
  Box,
  Fab,
  Menu,
  MenuItem,
  Typography,
  Divider,
} from "@mui/material";
import PaletteIcon from "@mui/icons-material/Palette";

import { seasons, type SeasonKey } from "@app/theme";
import About from "@app/components/About";
import Experience from "@app/components/Experience";
import Hero from "@app/components/Hero";
import Navbar from "@app/components/Navbar";
import Projects from "@app/components/Projects";
import Contact from "@app/components/Contact";
import LoadingScreen from "@app/components/LoadingScreen";
import { fetchApiLiturgicalSeason } from "@app/services/litcal";
import { useLanguage } from "@app/i18n/useLanguage";
import { getThemeStyleVars } from "@app/utils/theme-utils";

function App() {
  const { locale, translations } = useLanguage();
  const [currentSeason, setCurrentSeason] = useState<SeasonKey | null>(null);
  const [feastName, setFeastName] = useState<string | undefined>(undefined);
  const [anchorElement, setAnchorElement] = useState<HTMLElement | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const activeTheme = seasons[currentSeason ?? "ORDINARY"];

  useEffect(() => {
    const rootStyle = document.documentElement.style;

    Object.entries(getThemeStyleVars(activeTheme)).forEach(([name, value]) => {
      rootStyle.setProperty(name, String(value));
    });
  }, [activeTheme]);

  useEffect(() => {
    let isMounted = true;

    fetchApiLiturgicalSeason(new Date(), undefined, locale)
      .then(({ season, name }) => {
        if (isMounted) {
          setCurrentSeason(season as SeasonKey);
          setFeastName(name); // Will be undefined if API fallback occurred
          setTimeout(() => setIsLoading(false), 300);
        }
      })
      .catch(() => {
        if (isMounted) {
          setTimeout(() => setIsLoading(false), 300);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [locale]);

  const handleOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorElement(event.currentTarget);
  };

  const handleClose = () => setAnchorElement(null);

  const selectSeason = (season: SeasonKey) => {
    setCurrentSeason(season);
    handleClose();
  };

  return (
    <>
      {isLoading && <LoadingScreen isFading={Boolean(currentSeason)} />}

      <ThemeProvider theme={activeTheme}>
        <CssBaseline />

        <Box component="main">
          <Navbar />
          <Hero />

          <Box>
            <About />
          </Box>

          <Box>
            <Experience />
          </Box>

          <Box>
            <Projects />
          </Box>

          <Box component="footer">
            <Contact />
          </Box>
        </Box>

        <Box sx={{ position: "fixed", bottom: 24, right: 24, zIndex: 999 }}>
          <Fab color="secondary" onClick={handleOpen} size="medium">
            <PaletteIcon />
          </Fab>
          <Menu
            anchorEl={anchorElement}
            open={Boolean(anchorElement)}
            onClose={handleClose}
            transformOrigin={{ vertical: "bottom", horizontal: "right" }}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            slotProps={{
              paper: {
                sx: {
                  minWidth: 160,
                  maxWidth: 240,
                  width: "auto",
                  py: 1,
                  border: "2px solid #B87F0D",
                },
              },
            }}
          >
            {/* Render header & divider only when a valid feast name exists */}
            {feastName && (
              <>
                <Box sx={{ px: 2, py: 1 }}>
                  <Typography
                    variant="caption"
                    sx={{
                      fontFamily: "Lora, serif",
                      textTransform: "uppercase",
                      letterSpacing: 1,
                      color: "text.secondary",
                      display: "block",
                      fontSize: "0.65rem",
                    }}
                  >
                    {translations.feast}
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      fontFamily: "Cinzel, serif",
                      fontWeight: 700,
                      fontSize: "0.9rem",
                      color:
                        seasons[currentSeason ?? "ORDINARY"].palette.primary
                          .dark,
                      lineHeight: 1.2,
                      mt: 0.5,
                    }}
                  >
                    {feastName}
                  </Typography>
                </Box>
                <Divider sx={{ m: 1 }} />
              </>
            )}

            {/* Manual Season Selectors */}
            {(Object.keys(seasons) as SeasonKey[]).map((key) => {
              const isSelected = currentSeason === key;
              return (
                <MenuItem
                  key={key}
                  onClick={() => selectSeason(key)}
                  selected={isSelected}
                  sx={{
                    fontFamily: "Cinzel, serif",
                    fontSize: "0.8rem",
                    letterSpacing: 1,
                    transition: "all 0.2s ease-in-out",
                    // Custom styling for selected state
                    "&.Mui-selected": {
                      backgroundColor: "rgba(184, 127, 13, 0.12)",
                      fontWeight: 700,
                      color: "#B87F0D",
                      borderLeft: "4px solid #B87F0D",
                      pl: 1.5, // Padding to account for left border
                      "&:hover": {
                        backgroundColor: "rgba(184, 127, 13, 0.2)",
                      },
                    },
                  }}
                >
                  {key}
                </MenuItem>
              );
            })}
          </Menu>
        </Box>
      </ThemeProvider>
    </>
  );
}

export default App;
