import React from "react";
import { ThemeProvider, CssBaseline, Box } from "@mui/material";
import style from "./style";
import About from "./components/About";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";

// import Experience from "./components/Experience";
// import Projects from "./components/Projects";
// import Contact from "./components/Contact";

function App() {
  return (
    <ThemeProvider theme={style}>
      <CssBaseline />
      
      {/* Navbar */}
      <Navbar />
      <Hero />

      <Box component="main">
        <Box id="about">
          <About />
        </Box>

        {/* <Box id="experience">
          <Experience />
        </Box> 
        */}

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