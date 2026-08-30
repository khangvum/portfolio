import React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import "./LoadingScreen.css";

const LoadingScreen = () => {
  return (
    <Box className="loading-root">
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