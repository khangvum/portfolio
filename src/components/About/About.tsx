import { type CSSProperties } from "react";
import { Box, Container, Typography, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import { useLanguage } from "@app/i18n/useLanguage";
import { aboutStatMetadata } from "@app/data/about";

import "./About.css";

const About = () => {
  const theme = useTheme();
  const { locale, translations } = useLanguage();
  const styleVars = {
    "--primary-main": theme.palette.primary.main,
    "--primary-dark": theme.palette.primary.dark,
    "--secondary-main": theme.palette.secondary.main,
    "--bg-parchment": theme.palette.background.default,
    "--text-button":
      theme.palette.primary.main === "#f2efde"
        ? "var(--primary-dark)"
        : "#ffffff",
  } as CSSProperties;

  return (
    <Box
      component="section"
      className="about-root"
      id="about"
      style={styleVars}
    >
      <Container maxWidth="xl">
        <Box sx={{ py: 1, mx: 4, display: "flex", flexWrap: "wrap", gap: 4 }}>
          {/* Left Column: Biography */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "flex-start",
              width: { xs: "100%", md: "45%" },
            }}
          >
            <Typography variant="h2" className="about-name">
              {translations.about.title}
            </Typography>
            <Typography variant="body1" className="about-bio">
              {translations.about.biography}
            </Typography>

            <Box component="ul" className="about-list">
              {translations.about.skills.map((skill) => (
                <li key={skill}>• {skill}</li>
              ))}
            </Box>

            <Box className="about-actions">
              <Button
                variant="contained"
                className="about-btn-primary"
                href={`${import.meta.env.BASE_URL}Khang-Vu-resume.pdf`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {translations.about.resume}
              </Button>
              <Button
                variant="outlined"
                className="about-btn-secondary"
                href="https://github.com/khangvum"
                target="_blank"
              >
                {translations.about.github}
              </Button>
              <Button
                variant="outlined"
                className="about-btn-secondary"
                href="https://www.linkedin.com/in/khangvum/"
                target="_blank"
              >
                {translations.about.linkedin}
              </Button>
            </Box>
          </Box>

          {/* Right Column: Stats Cards */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              width: { xs: "100%", md: "50%" },
            }}
          >
            <Box className="stats-container" sx={{ width: "100%" }}>
              {translations.about.stats.map((stat, index) => {
                const metadata = aboutStatMetadata[index];
                const formattedValue = new Intl.NumberFormat(locale, {
                  minimumFractionDigits: metadata.minimumFractionDigits,
                  maximumFractionDigits: metadata.maximumFractionDigits,
                }).format(metadata.value);

                return (
                  <Box key={index} className="stat-card">
                    <Typography className="stat-value">
                      {formattedValue}
                    </Typography>
                    <Box>
                      <Typography className="stat-label">
                        {stat.label}
                      </Typography>
                      <Typography
                        className="stat-detail"
                        sx={{ whiteSpace: "pre-line" }}
                      >
                        {stat.detail}
                      </Typography>
                    </Box>
                  </Box>
                );
              })}
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default About;
