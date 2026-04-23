import React from "react";
import { Box, Container, Typography, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import "./Hero.css";

const Hero = () => {
  const theme = useTheme();

  return (
    <Box
      component="section"
      className="hero-root"
      id="home"
      style={{
        "--primary-main": theme.palette.primary.main,
        "--primary-dark": theme.palette.primary.dark,
        "--secondary-main": theme.palette.secondary.main,
        "--secondary-light": theme.palette.secondary.light || "#D4AF37",
        "--text-parchment": "#F9F7F2",
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="h1" className="hero-title">
          Infrastructure & Automation
        </Typography>

        <Box className="hero-divider" />

        <Typography variant="h5" className="hero-subtitle">
          Automation Test Developer | CARFAX Canada
        </Typography>

        <Button
          variant="contained"
          color="secondary"
          size="large"
          className="hero-button"
          href="mailto:manhkhang0305@gmail.com"
        >
          Get in Touch
        </Button>
      </Container>
    </Box>
  );
};

export default Hero;
