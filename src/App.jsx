import { useState, useEffect } from "react";
import {
  ThemeProvider,
  CssBaseline,
  Box,
  Fab,
  Menu,
  MenuItem,
  CircularProgress,
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
  // 1. Initialize as null so we know we are waiting for the API
  const [currentSeason, setCurrentSeason] = useState(null);
  const [anchorElement, setAnchorElement] = useState(null);

  useEffect(() => {
    let isMounted = true;

    // 2. Fetch API (service handles fallback internally)
    fetchApiLiturgicalSeason().then((season) => {
      if (isMounted) {
        setCurrentSeason(season);
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

  // 3. Prevent theme flash by waiting until currentSeason is determined
  if (!currentSeason) {
    return <LoadingScreen />;
  }

  return (
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
  );
}

export default App;
