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
    </ThemeProvider>
  );
}

export default App;
