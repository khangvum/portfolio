import {
  useState,
  useEffect,
  type MouseEvent,
  type CSSProperties,
} from "react";
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

import { seasons, type SeasonKey } from "./theme";
import About from "./components/About";
import Experience from "./components/Experience";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import LoadingScreen from "./components/LoadingScreen";
import { fetchApiLiturgicalSeason } from "./services/litcal";

function App() {
  const [currentSeason, setCurrentSeason] = useState<SeasonKey | null>(null);
  const [feastName, setFeastName] = useState<string | undefined>(undefined);
  const [anchorElement, setAnchorElement] = useState<HTMLElement | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    fetchApiLiturgicalSeason()
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
  }, []);

  const handleOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorElement(event.currentTarget);
  };

  const handleClose = () => setAnchorElement(null);

  const selectSeason = (season: SeasonKey) => {
    setCurrentSeason(season);
    handleClose();
  };

  const menuThemeStyle = {
    "--primary-main": seasons.ORDINARY.palette.primary.main,
    "--secondary-main": seasons.ORDINARY.palette.secondary.main,
  } as CSSProperties;

  return (
    <>
      {isLoading && <LoadingScreen isFading={Boolean(currentSeason)} />}

      <ThemeProvider theme={seasons[currentSeason ?? "ORDINARY"]}>
        <CssBaseline />

        <Box component="main" style={menuThemeStyle}>
          <Navbar />
          <Hero />

          <Box id="about">
            <About />
          </Box>

          <Box id="experience">
            <Experience />
          </Box>

          <Box id="projects">
            <Projects />
          </Box>

          <Box id="contact" component="footer">
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
                    Today's Feast
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      fontFamily: "Cinzel, serif",
                      fontWeight: 700,
                      fontSize: "0.9rem",
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
