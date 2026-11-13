import {
  Box,
  Container,
  Typography,
  Card,
  Chip,
  CardActionArea,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import type { CSSProperties } from "react";

import { useLanguage } from "@app/i18n/useLanguage";
import { projectMetadata } from "@app/data/projects";

import "./Projects.css";

const Projects = () => {
  const theme = useTheme();
  const { translations } = useLanguage();
  const styleVars = {
    "--primary-main": theme.palette.primary.main,
    "--primary-dark": theme.palette.primary.dark,
    "--secondary-main": theme.palette.secondary.main,
    "--bg-parchment": theme.palette.background.default,
    "--chip-bg":
      theme.palette.primary.main === "#f2efde"
        ? "var(--primary-dark)"
        : "#ffffff",
  } as CSSProperties;

  return (
    <Box
      component="section"
      className="projects-root"
      id="projects"
      style={styleVars}
    >
      <Container maxWidth="xl">
        <Box sx={{ textAlign: "center", mb: 10 }}>
          <Typography variant="h2" className="projects-main-title">
            {translations.projects.title}
          </Typography>
        </Box>

        <Box className="stations-force-grid">
          {translations.projects.items.map((project, index) => {
            const metadata = projectMetadata[index];

            return (
              <Box className="station-node" key={metadata.id}>
                <Box className="station-marker">
                  <Typography className="roman-num">
                    {metadata.romanNumeral}
                  </Typography>
                </Box>
                <Card className="station-card">
                  {/* Make each card clickable */}
                  <CardActionArea
                    href={metadata.link}
                    target="_blank"
                    className="station-action-area"
                  >
                    <Typography className="station-subtitle">
                      {metadata.subtitle}
                    </Typography>
                    <Typography variant="h4" className="station-title">
                      {project.title}
                    </Typography>

                    <Typography className="station-desc">
                      {project.description}
                    </Typography>

                    <Box className="tech-stack">
                      {metadata.tech.map((technology) => (
                        <Chip
                          key={technology}
                          label={technology}
                          className="project-chip"
                          size="medium"
                        />
                      ))}
                    </Box>
                  </CardActionArea>
                </Card>
              </Box>
            );
          })}
        </Box>
      </Container>
    </Box>
  );
};

export default Projects;
