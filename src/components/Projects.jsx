import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  Chip,
  CardActionArea,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import "./Projects.css";

const Projects = () => {
  const theme = useTheme();

  const myProjects = [
    {
      num: "I",
      title: "Homelab Automation with Ansible",
      subtitle: "Automata",
      desc: "A homelab configuration automation solution powered by Ansible, containerized with Docker.",
      tech: ["Ansible", "API", "Docker", "Jinja", "PowerShell", "YAML"],
      link: "https://github.com/khangvum/homelab-ansible-config",
    },
    {
      num: "II",
      title: "Answer Files",
      subtitle: "Dictum",
      desc: "An automated operating system (OS) deployment solution utilizing answer files.",
      tech: ["Batchfile", "PowerShell", "XML", "YAML"],
      link: "https://github.com/khangvum/answer-files",
    },
    {
      num: "III",
      title: "Expression Evaluator",
      subtitle: "Calculus",
      desc: "A Windows console application that evaluates mathematical expressions involving multiple operators and functions.",
      tech: ["C++", "C"],
      link: "https://github.com/khangvum/exprevaluator",
    },
    {
      num: "IV",
      title: "NixOS-WSL Configuration",
      subtitle: "Systema",
      desc: "A NixOS 25.11 configuration tailored for running within Windows Subsystem for Linux (WSL).",
      tech: ["Nix", "Bash"],
      link: "https://github.com/khangvum/nixos-wsl",
    },
    {
      num: "V",
      title: "Chemical Equation Balancer",
      subtitle: "Elementa",
      desc: "A Python program that balances chemical equations by determining the correct stoichiometric coefficients for each reactant and product.",
      tech: ["Python", "Jupyter Notebook"],
      link: "https://github.com/khangvum/chemicalbalancer",
    },
  ];

  return (
    <Box
      component="section"
      className="projects-root"
      id="projects"
      style={{
        "--primary-main": theme.palette.primary.main,
        "--primary-dark": theme.palette.primary.dark,
        "--secondary-main": theme.palette.secondary.main,
        "--bg-parchment": theme.palette.background.default,
        "--chip-bg":
          theme.palette.primary.main === "#f2efde"
            ? "var(--primary-dark)"
            : "#ffffff",
      }}
    >
      <Container maxWidth="xl">
        <Box sx={{ textAlign: "center", mb: 10 }}>
          <Typography variant="h2" className="projects-main-title">
            Personal Projects
          </Typography>
        </Box>

        <Box className="stations-force-grid">
          {myProjects.map((project, index) => (
            <Box className="station-node" key={index}>
              <Box className="station-marker">
                <Typography className="roman-num">{project.num}</Typography>
              </Box>
              <Card className="station-card">
                {/* Make each card clickable */}
                <CardActionArea
                  href={project.link}
                  target="_blank"
                  className="station-action-area"
                >
                  <Typography className="station-subtitle">
                    {project.subtitle}
                  </Typography>
                  <Typography variant="h4" className="station-title">
                    {project.title}
                  </Typography>

                  <Typography className="station-desc">
                    {project.desc}
                  </Typography>

                  <Box className="tech-stack">
                    {project.tech.map((t) => (
                      <Chip
                        key={t}
                        label={t}
                        className="project-chip"
                        size="medium"
                      />
                    ))}
                  </Box>
                </CardActionArea>
              </Card>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default Projects;
