import { type CSSProperties } from "react";
import { Box, Container, Typography, Button, Grid } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import coatOfArms from "@app/assets/coat-of-arms.png";
import { useLanguage } from "@app/i18n/useLanguage";

import "./Hero.css";

const Hero = () => {
  const theme = useTheme();
  const { translations } = useLanguage();
  const styleVars = {
    "--primary-main": theme.palette.primary.main,
    "--primary-dark": theme.palette.primary.dark,
    "--secondary-main": theme.palette.secondary.main,
    "--secondary-light": theme.palette.secondary.light || "#D4AF37",
    "--text-parchment": "#F9F7F2",
  } as CSSProperties;

  return (
    <Box component="section" className="hero-root" id="home" style={styleVars}>
      <Container className="hero-container" maxWidth="xl">
        <Grid container spacing={4}>
          {/* Left Column: Coat of Arms */}
          <Grid size={{ xs: 12, md: 6 }} className="hero-coat-of-arms-col">
            <Box
              component="img"
              src={coatOfArms}
              alt={translations.hero.imageAlt}
              className="hero-coat-of-arms"
            />
          </Grid>

          {/* Right Column: Hero Content */}
          <Grid size={{ xs: 12, md: 6 }} className="hero-content-col">
            <Typography variant="h1" className="hero-title">
              Khang Vu
            </Typography>

            <Box className="hero-divider" />

            <Typography variant="h5" className="hero-subtitle">
              {translations.hero.subtitle}
            </Typography>

            <Button
              variant="contained"
              color="secondary"
              size="large"
              className="hero-button"
              href="mailto:manhkhang0305@gmail.com"
            >
              {translations.hero.button}
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Hero;
