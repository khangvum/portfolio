import { Box, Container, Typography } from "@mui/material";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";

import { useLanguage } from "@app/i18n/useLanguage";
import { experienceMetadata } from "@app/data/experience";

import "./Experience.css";

const Experience = () => {
  const { translations } = useLanguage();
  return (
    <Box
      component="section"
      className="exp-root"
      id="experience"
    >
      <Container maxWidth="xl">
        <Typography variant="h2" className="exp-header">
          {translations.experience.title}
        </Typography>

        <Box className="timeline-wrapper">
          {translations.experience.jobs.map((job, index) => (
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
                {index !== translations.experience.jobs.length - 1 && (
                  <Box className="timeline-line" />
                )}
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
                    {job.points.map((point, i) => {
                      const link = experienceMetadata[index].pointLinks[i];

                      return (
                        <li key={i}>
                          {typeof point === "string" ? (
                            point
                          ) : (
                            <>
                              {point.text}
                              {link && (
                                <>
                                  {" "}
                                  (<i>{translations.experience.example}</i>{" "}
                                  <a
                                    href={link.linkUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="job-link"
                                  >
                                    {link.linkText}
                                  </a>
                                  )
                                </>
                              )}
                            </>
                          )}
                        </li>
                      );
                    })}
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
