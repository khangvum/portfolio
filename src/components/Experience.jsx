import React from "react";
import { Box, Container, Typography } from "@mui/material";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import { useTheme } from "@mui/material/styles";

import "./Experience.css";

const Experience = () => {
  const theme = useTheme();
  const jobs = [
    {
      title: "Automation Test Developer",
      company: "CARFAX Canada",
      period: "May 2026 - Present",
      location: "London, ON",
      points: [
        "Engineered automated test cases with Selenium WebDriver and NUnit/MSTest",
      ],
    },
    {
      title: "NSC Support Analyst - Tier 1",
      company: "Emco Corporation",
      period: "Aug 2025 - Dec 2025",
      location: "London, ON",
      points: [
        "Managed enterprise infrastructure with Entra ID (Azure AD), Intune, and Exchange",
        {
          text: "Automated Windows deployments using Autopilot and answer files",
          linkText: "khangvum/answer-files",
          linkUrl: "https://github.com/khangvum/answer-files",
        },
        "Provided comprehensive Tier 1 support through the Ivanti ticketing system",
      ],
    },
    {
      title: "Information Systems IoT",
      company: "Eramosa - A CIMA+ Company",
      period: "Jan 2025 - Apr 2025",
      location: "Guelph, ON",
      points: [
        {
          text: "Engineered a standardized, security-hardened WSL environment",
          linkText: "khangvum/nixos-wsl",
          linkUrl: "https://github.com/khangvum/nixos-wsl",
        },
        {
          text: "Implemented Infrastructure as Code (IaC) using Ansible and Terraform",
          linkText: "khangvum/homelab-ansible-config",
          linkUrl: "https://github.com/khangvum/homelab-ansible-config",
        },
        "Orchestrated multi-tenant virtual infrastructure across VMware ESXi and Hyper-V",
      ],
    },
  ];

  return (
    <Box
      component="section"
      className="exp-root"
      id="experience"
      style={{
        "--primary-dark": theme.palette.primary.dark,
        "--secondary-main": theme.palette.secondary.main,
        "--secondary-light": "#d4a017", // Lighter gold for hover
        "--text-parchment": "#F9F7F2",
      }}
    >
      <Container maxWidth="xl">
        <Typography variant="h2" className="exp-header">
          Professional Experience
        </Typography>

        <Box className="timeline-wrapper">
          {jobs.map((job, index) => (
            <Box key={index} className="timeline-row">
              {/* 1. Date column (Desktop only - Hidden on mobile) */}
              <Box className="date-column">
                <Typography className="timeline-date">{job.period}</Typography>
                <Typography className="timeline-location">
                  {job.location}
                </Typography>
              </Box>

              {/* 2. Central line & dot */}
              <Box className="timeline-marker">
                <Box className="timeline-dot">
                  <BusinessCenterIcon sx={{ fontSize: 18, color: "#F9F7F2" }} />
                </Box>
                {index !== jobs.length - 1 && <Box className="timeline-line" />}
              </Box>

              {/* 3. Content column */}
              <Box className="timeline-content-wrapper">
                {/* Date/Location for mobile only */}
                <Box className="mobile-date-info">
                  <Typography className="timeline-date">
                    {job.period}
                  </Typography>
                  <Typography className="timeline-location">
                    {job.location}
                  </Typography>
                </Box>

                <Box className="timeline-content">
                  <Typography variant="h5" className="job-title">
                    {job.title}
                  </Typography>
                  <Typography className="job-company">{job.company}</Typography>
                  <Box component="ul" className="job-points">
                    {job.points.map((point, i) => (
                      <li key={i}>
                        {typeof point === "string" ? (
                          point
                        ) : (
                          <>
                            {point.text} (<i>e.g.,</i>{" "}
                            <a
                              href={point.linkUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="job-link"
                            >
                              {point.linkText}
                            </a>
                            )
                          </>
                        )}
                      </li>
                    ))}
                  </Box>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default Experience;
