import { Box, Button, Typography } from "@mui/material";

import { getLocalePath } from "@app/i18n/config";
import { useLanguage } from "@app/i18n/useLanguage";

import "./NotFound.css";

const NotFound = () => {
  const { locale, translations } = useLanguage();

  return (
    <Box className="not-found-root">
      <Box className="not-found-content">
        <Typography variant="h1" className="not-found-code">
          404
        </Typography>
        <Typography variant="h4" className="not-found-title">
          {translations.notFound.title}
        </Typography>
        <Typography className="not-found-message">
          {translations.notFound.message}
        </Typography>
        <Button
          component="a"
          href={getLocalePath(locale)}
          className="not-found-button"
        >
          {translations.notFound.home}
        </Button>
      </Box>
    </Box>
  );
};

export default NotFound;
