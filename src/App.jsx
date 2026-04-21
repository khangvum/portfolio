import React from "react";
import { ThemeProvider, CssBaseline, Box } from "@mui/material";
import style from "./style";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";

function App() {
  return (
    <ThemeProvider theme={style}>
      {/* Reset browser margins */}
      <CssBaseline />

      <Navbar />
      <Hero />

      {/* Placeholder for content to check the background color */}
      <Box sx={{ p: 5, bgcolor: "background.default" }}>
        <p>If the Bishop Green bar above touches both edges, we win.</p>
      </Box>
    </ThemeProvider>
  );
}

export default App;
