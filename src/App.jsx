import { useState } from "react";
import { ThemeProvider, CssBaseline, Box } from "@mui/material";
import { seasons } from "./theme";
import About from "./components/About";
import Experience from "./components/Experience";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";

// import Projects from "./components/Projects";
// import Contact from "./components/Contact";

function App() {
  const [currentSeason, setCurrentSeason] = useState('EASTER');

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
    </ThemeProvider>
  );
}

export default App;