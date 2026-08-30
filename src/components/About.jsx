import React from "react";
import { Box, Container, Grid, Typography, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import "./About.css";

const About = () => {
  const theme = useTheme();

  const stats = [
    {
      label: "Cumulative GPA",
      value: "4.20",
      detail: "Dean's Honour Roll | F2023, W2024, F2024, S2025, W2026",
    },
    {
      label: "Co-op Terms",
      value: "3",
      detail: "Infrastructure & Networking, Operations, and Automation Testing",
    },
    {
      label: "Languages",
      value: "3",
      detail: "English, French, and Vietnamese",
    },
    {
      label: "International Awards",
      value: "2",
      detail:
        "International Vietnam Language Excellence Entrance Award | CA$2000\nKaren L. Monahan International Award | CA$750",
    },
  ];

  return (
    <Box
      component="section"
      className="about-root"
      id="about"
      style={{
        "--primary-main": theme.palette.primary.main,
        "--primary-dark": theme.palette.primary.dark,
        "--secondary-main": theme.palette.secondary.main,
        "--bg-parchment": theme.palette.background.default,
        "--text-button":
          theme.palette.primary.main === "#f2efde"
            ? "var(--primary-dark)"
            : "#ffffff",
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={4} sx={{ py: 1, mx: 4 }}>
          {/* Left Column: Biography */}
          <Grid
            xs={12}
            lg={6}
            sm={6}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "flex-start",
              width: { xs: "100%", md: "45%" },
            }}
          >
            <Typography variant="h2" className="about-name">
              About Me
            </Typography>
            <Typography variant="body1" className="about-bio">
              A Computer Programming and Analysis student at Fanshawe College
              with a specialized background in enterprise systems and
              automation:
            </Typography>

            <Box component="ul" className="about-list">
              <li>
                • Engineer robust test suites using <strong>C#</strong>,{" "}
                <strong>Selenium</strong>, <strong>.NET</strong>,{" "}and <strong>NUnit/MSTest</strong>.
              </li>
              <li>
                • Architect hybrid infrastructure with <strong>Ansible</strong>,{" "}
                <strong>Terraform</strong>, <strong>VMware ESXi</strong>, and{" "}
                <strong>Hyper-V</strong>.
              </li>
              <li>
                • Optimize enterprise operations via{" "}
                <strong>Microsoft Intune</strong>, <strong>Entra ID</strong>,
                and <strong>PowerShell</strong>.
              </li>
            </Box>

            <Box className="about-actions">
              <Button
                variant="contained"
                className="about-btn-primary"
                href={`${import.meta.env.BASE_URL}Khang-Vu-resume.pdf`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Resume
              </Button>
              <Button
                variant="outlined"
                className="about-btn-secondary"
                href="https://github.com/khangvum"
                target="_blank"
              >
                GitHub
              </Button>
              <Button
                variant="outlined"
                className="about-btn-secondary"
                href="https://www.linkedin.com/in/khangvum/"
                target="_blank"
              >
                LinkedIn
              </Button>
            </Box>
          </Grid>

          {/* Right Column: Stats Cards */}
          <Grid
            xs={12}
            lg={6}
            sm={6}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              width: { xs: "100%", md: "50%" },
            }}
          >
            <Box className="stats-container" sx={{ width: "100%" }}>
              {stats.map((stat, index) => (
                <Box key={index} className="stat-card">
                  <Typography className="stat-value">{stat.value}</Typography>
                  <Box>
                    <Typography className="stat-label">{stat.label}</Typography>
                    <Typography
                      className="stat-detail"
                      sx={{ whiteSpace: "pre-line" }}
                    >
                      {stat.detail}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default About;
