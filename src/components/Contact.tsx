import React, { type CSSProperties } from "react";
import {
  Box,
  Container,
  Typography,
  IconButton,
  Link,
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";
import { useTheme } from "@mui/material/styles";
import "./Contact.css";

const Contact = () => {
  const theme = useTheme();
  const styleVars = {
    "--contact-bg": theme.palette.primary.main,
    "--contact-btn-bg": theme.palette.primary.dark,
    "--secondary-gold": theme.palette.secondary.main,
    "--text-parchment": "#F9F7F2",
    "--text-color":
      theme.palette.primary.main === "#f2efde"
        ? "var(--primary-dark)"
        : "#ffffff",
  } as CSSProperties;

  return (
    <Box
      component="footer"
      className="contact-root"
      id="contact"
      style={styleVars}
    >
      <Container maxWidth="md">
        <Box className="contact-header">
          <Typography variant="h2" className="contact-title">
            The Final Script
          </Typography>
          <Typography variant="body1" className="contact-subtitle">
            Whether for a professional inquiry, a technical dialogue, or collaboration, I am always happy to connect!
          </Typography>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "center", gap: 4, flexWrap: "wrap" }} className="contact-links">
          <IconButton
            component={Link}
            href="https://github.com/khangvum"
            target="_blank"
            className="contact-icon-btn"
          >
            <GitHubIcon />
          </IconButton>
          <IconButton
            component={Link}
            href="https://linkedin.com/in/khangvum"
            target="_blank"
            className="contact-icon-btn"
          >
            <LinkedInIcon />
          </IconButton>
          <IconButton
            component={Link}
            href="mailto:manhkhang0305@gmail.com"
            className="contact-icon-btn"
          >
            <EmailIcon />
          </IconButton>
        </Box>

        <Box className="contact-footer-note">
          <Typography variant="caption">
            © 2026 Khang Vu - London, Ontario
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Contact;
