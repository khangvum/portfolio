import { Box, CircularProgress, Typography } from "@mui/material";
import { useLanguage } from "@app/i18n/useLanguage";
import "./LoadingScreen.css";

type LoadingScreenProps = {
  isFading: boolean;
};

const LoadingScreen = ({ isFading }: LoadingScreenProps) => {
  const { translations } = useLanguage();
  return (
    <Box className={`loading-root ${isFading ? "fade-out" : ""}`}>
      <Box className="loading-content">
        <Typography variant="h4" className="loading-title">
          {translations.loading}...
        </Typography>
        <CircularProgress size={48} thickness={3} className="loading-spinner" />
      </Box>
    </Box>
  );
};

export default LoadingScreen;
