import React from "react";
import { Box, Container, Typography, Button } from "@mui/material";
import "./Hero.css";

const Hero = () => {
  return (
    <Box component="section" className="hero-root" id="home">
      <Container maxWidth="lg">
        <Typography variant="h1" className="hero-title">
          From Infrastructure to Automation
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
        >
          View My Work
        </Button>
      </Container>
    </Box>
  );
};

export default Hero;
