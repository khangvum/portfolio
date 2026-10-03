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
import "./Projects.css";

const Projects = () => {
  const theme = useTheme();
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

  const myProjects = [
    {
      num: "I",
      title: "Ansible Configuration",
      subtitle: "Ordinatio",
      desc: "A declarative configuration automation solution powered by Ansible.",
      tech: ["Ansible", "API", "Docker", "Jinja", "PowerShell", "YAML"],
      link: "https://github.com/khangvum-com/ansible-config",
    },
    {
      num: "II",
      title: "Infrastructure Provisioning",
      subtitle: "Infrastructura",
      desc: "A declarative infrastructure provisioning solution powered by Terraform.",
      tech: ["Terraform", "HCL", "API", "Docker"],
      link: "https://github.com/khangvum-com/terraform-infra",
    },
    {
      num: "III",
      title: "Ansible Collection for Microsoft Hyper-V",
      subtitle: "Collectio",
      desc: "An Ansible collection powered by PowerShell for managing and configuring Hyper-V infrastructure.",
      tech: ["Ansible", "Hyper-V", "PowerShell", "Python", "YAML"],
      link: "https://github.com/khangvum-com/khangvum.hyperv",
    },
    {
      num: "IV",
      title: "Answer Files",
      subtitle: "Dictum",
      desc: "An automated operating system (OS) deployment solution utilizing answer files.",
      tech: ["Batchfile", "PowerShell", "XML", "YAML", "Windows", "Linux"],
      link: "https://github.com/khangvum/answer-files",
    },
    {
      num: "V",
      title: "NixOS-WSL Configuration",
      subtitle: "Systema",
      desc: "A NixOS 26.05 configuration tailored for running within Windows Subsystem for Linux (WSL).",
      tech: ["Nix", "Bash", "WSL", "Linux"],
      link: "https://github.com/khangvum/nixos-wsl",
    },
    {
      num: "VI",
      title: "Expression Evaluator",
      subtitle: "Calculus",
      desc: "A Windows console application that evaluates mathematical expressions involving multiple operators and functions.",
      tech: ["C++", "C"],
      link: "https://github.com/khangvum/exprevaluator",
    },
    {
      num: "VII",
      title: "Portfolio",
      subtitle: "Speculum",
      desc: "A comprehensive portfolio demonstrating educational background and technical expertise deployed as a webpage using React and Vite.",
      tech: ["TypeScript", "React", "Vite", "HTML", "CSS"],
      link: "https://github.com/khangvum/portfolio",
    },
    {
      num: "VIII",
      title: "Reqnroll Automation",
      subtitle: "Automata",
      desc: "A browser-based test automation solution utilizing Reqnroll (BDD) and Selenium WebDriver, driven by the MSTest framework and structured around the Page Object Model (POM) architectural pattern.",
      tech: ["C#", ".NET", "Gherkin", "MSTest", "Selenium", "GitHub Actions"],
      link: "https://github.com/khangvum/reqnroll-automation",
    },
    {
      num: "IX",
      title: "Chemical Equation Balancer",
      subtitle: "Elementa",
      desc: "A Python program that balances chemical equations by determining the correct stoichiometric coefficients for each reactant and product.",
      tech: ["Python", "Jupyter Notebook", "NumPy"],
      link: "https://github.com/khangvum/chemicalbalancer",
    },
  ];

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
