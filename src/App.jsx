import { useState, useEffect } from "react";
import {
  ThemeProvider,
  CssBaseline,
  Box,
  Fab,
  Menu,
  MenuItem,
} from "@mui/material";
import PaletteIcon from "@mui/icons-material/Palette";

import { seasons } from "./theme";

import About from "./components/About";
import Experience from "./components/Experience";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import LoadingScreen from "./components/LoadingScreen";

import { fetchApiLiturgicalSeason } from "./services/litcal";

function App() {
  const [currentSeason, setCurrentSeason] = useState(null);
  const [anchorElement, setAnchorElement] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    fetchApiLiturgicalSeason().then((season) => {
      if (isMounted) {
        setCurrentSeason(season);
        // Triggers fade-out before unmounting the loading screen
        setTimeout(() => setIsLoading(false), 300);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleOpen = (e) => setAnchorElement(e.currentTarget);
  const handleClose = () => setAnchorElement(null);

  const selectSeason = (season) => {
    setCurrentSeason(season);
    handleClose();
  };

  return (
    <>
      {isLoading && <LoadingScreen isFading={Boolean(currentSeason)} />}

      <ThemeProvider theme={seasons[currentSeason] || seasons.ORDINARY}>
        <CssBaseline />

        <Navbar />
        <Hero />

        <Box component="main">
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
            {Object.keys(seasons).map((key) => (
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