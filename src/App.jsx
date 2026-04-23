import { useState } from "react";
import { ThemeProvider, CssBaseline, Box, Fab, Menu, MenuItem } from "@mui/material";
import PaletteIcon from '@mui/icons-material/Palette';

import { seasons } from "./theme";

import About from "./components/About";
import Experience from "./components/Experience";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
// import Projects from "./components/Projects";
// import Contact from "./components/Contact";

import { getLiturgicalSeason } from "./utils/liturgical-utils";

function App() {
  const [currentSeason, setCurrentSeason] = useState(getLiturgicalSeason());
  const [anchorElement, setAnchorElement] = useState(null);

  const handleOpen = (e) => setAnchorElement(e.currentTarget);
  const handleClose = () => setAnchorElement(null);

  const selectSeason = (season) => {
    setCurrentSeason(season);
    handleClose();
  };

  return (
    <ThemeProvider theme={seasons[currentSeason]}>
      <CssBaseline />
      
      {/* Navbar */}
      <Navbar />
      <Hero />

      <Box component="main">
        <Box id="about">
          <About />
        </Box>

        <Box id="experience">
          <Experience />
        </Box> 
       

        {/* <Box id="projects">
          <Projects />
        </Box> 
        */}
      </Box>

      {/* <Box id="contact" component="footer">
        <Contact />
      </Box> 
      */}

      <Box sx={{ position: 'fixed', bottom: 24, right: 24, zIndex: 999 }}>
        <Fab color="secondary" onClick={handleOpen} size="medium">
          <PaletteIcon />
        </Fab>
        <Menu
          anchorEl={anchorElement}
          open={Boolean(anchorElement)}
          onClose={handleClose}
          transformOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          {Object.keys(seasons).map((key) => (
            <MenuItem 
              key={key} 
              onClick={() => selectSeason(key)}
              selected={currentSeason === key}
              sx={{ fontFamily: 'Cinzel', fontSize: '0.8rem' }}
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