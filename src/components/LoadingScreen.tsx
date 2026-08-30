import React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import "./LoadingScreen.css";

type LoadingScreenProps = {
  isFading: boolean;
};

const LoadingScreen = ({ isFading }: LoadingScreenProps) => {
  return (
    <Box className={`loading-root ${isFading ? "fade-out" : ""}`}>
      <Box className="loading-content">
        <Typography variant="h4" className="loading-title">
          Loading...
        </Typography>
        <CircularProgress
          size={48}
          thickness={3}
          className="loading-spinner"
        />
      </Box>
    </Box>
  );
};

export default LoadingScreen;