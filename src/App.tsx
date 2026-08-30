import { useState, useEffect, type MouseEvent, type CSSProperties } from "react";
import {
  ThemeProvider,
  CssBaseline,
  Box,
  Fab,
  Menu,
  MenuItem,
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
  const [anchorElement, setAnchorElement] = useState<HTMLElement | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    fetchApiLiturgicalSeason()
      .then((season) => {
        if (isMounted) {
          setCurrentSeason(season as SeasonKey);
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
          >
            {(Object.keys(seasons) as SeasonKey[]).map((key) => (
              <MenuItem
                key={key}
                onClick={() => selectSeason(key)}
                selected={currentSeason === key}
                sx={{ fontFamily: "Cinzel", fontSize: "0.8rem" }}
              >
                {key}
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </ThemeProvider>
    </>
  );
}

export default App;