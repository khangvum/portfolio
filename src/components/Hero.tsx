import React, { type CSSProperties } from "react";
import { Box, Container, Typography, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import "./Hero.css";

const Hero = () => {
  const theme = useTheme();
  const styleVars = {
    "--primary-main": theme.palette.primary.main,
    "--primary-dark": theme.palette.primary.dark,
    "--secondary-main": theme.palette.secondary.main,
    "--secondary-light": theme.palette.secondary.light || "#D4AF37",
    "--text-parchment": "#F9F7F2",
  } as CSSProperties;

  return (
    <Box
      component="section"
      className="hero-root"
      id="home"
      style={styleVars}
    >
      <Container maxWidth="lg">
        <Typography variant="h1" className="hero-title">
          Khang Vu
        </Typography>

        <Box className="hero-divider" />

        <Typography variant="h5" className="hero-subtitle">
          Developer | Automation | Infrastructure as Code
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
