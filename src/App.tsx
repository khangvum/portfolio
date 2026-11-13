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
import NotFound from "@app/components/NotFound";
import { fetchApiLiturgicalSeason } from "@app/services/litcal";
import { isSupportedLocalePath } from "@app/i18n/config";
import { useLanguage } from "@app/i18n/useLanguage";
import { getThemeStyleVars } from "@app/utils/theme-utils";

import "./App.css";

function App() {
  const { locale, translations } = useLanguage();
  const [currentSeason, setCurrentSeason] = useState<SeasonKey | null>(null);
  const [feastName, setFeastName] = useState<string | undefined>(undefined);
  const [anchorElement, setAnchorElement] = useState<HTMLElement | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const activeTheme = seasons[currentSeason ?? "ORDINARY"];
  const isSupportedPath = isSupportedLocalePath();

  useEffect(() => {
    const rootStyle = document.documentElement.style;

    Object.entries(getThemeStyleVars(activeTheme)).forEach(([name, value]) => {
      rootStyle.setProperty(name, String(value));
    });
  }, [activeTheme]);

  useEffect(() => {
    if (!isSupportedPath) {
      return;
    }

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
  }, [isSupportedPath, locale]);

  const handleOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorElement(event.currentTarget);
  };

  const handleClose = () => setAnchorElement(null);

  const selectSeason = (season: SeasonKey) => {
    setCurrentSeason(season);
    handleClose();
  };

  if (!isSupportedPath) {
    return (
      <ThemeProvider theme={activeTheme}>
        <CssBaseline />
        <NotFound />
      </ThemeProvider>
    );
  }

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

        <Box className="palette-menu-anchor">
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
                className: "season-menu-paper",
              },
            }}
          >
            {/* Render header & divider only when a valid feast name exists */}
            {feastName && (
              <>
                <Box className="season-feast">
                  <Typography variant="caption" className="season-feast-label">
                    {translations.feast}
                  </Typography>
                  <Typography variant="subtitle2" className="season-feast-name">
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
                  className="season-menu-item"
                >
                  {translations.seasons[key]}
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
