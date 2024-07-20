import { FC } from "react";
import { Box, CircularProgress } from "@mui/material";

import "./styles.modules.css";

export const LoadingSpinner: FC = () => {
  return (
    <Box className="loading-spinner-container">
      <CircularProgress />
    </Box>
  );
};
