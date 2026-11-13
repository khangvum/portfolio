import { Box, Container, Typography, IconButton, Link } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";
import { useLanguage } from "@app/i18n/useLanguage";

import "./Contact.css";

const Contact = () => {
  const { translations } = useLanguage();

  return (
    <Box
      component="footer"
      className="contact-root"
      id="contact"
    >
      <Container maxWidth="md">
        <Box className="contact-header">
          <Typography variant="h2" className="contact-title">
            {translations.contact.title}
          </Typography>
          <Typography variant="body1" className="contact-subtitle">
            {translations.contact.subtitle}
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 4,
            flexWrap: "wrap",
          }}
          className="contact-links"
        >
          <IconButton
            component={Link}
            href="https://github.com/khangvum"
            target="_blank"
            aria-label={translations.contact.githubLabel}
            className="contact-icon-btn"
          >
            <GitHubIcon />
          </IconButton>
          <IconButton
            component={Link}
            href="https://linkedin.com/in/khangvum"
            target="_blank"
            aria-label={translations.contact.linkedinLabel}
            className="contact-icon-btn"
          >
            <LinkedInIcon />
          </IconButton>
          <IconButton
            component={Link}
            href="mailto:manhkhang0305@gmail.com"
            aria-label={translations.contact.emailLabel}
            className="contact-icon-btn"
          >
            <EmailIcon />
          </IconButton>
        </Box>

        <Box className="contact-footer-note">
          <Typography variant="caption">
            {translations.contact.copyright}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Contact;
