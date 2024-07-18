import { useMediaQuery, useTheme } from "@mui/material";

export const useScreenSize = () => {
  const theme = useTheme();
  const isMediumAndAbove = useMediaQuery(theme.breakpoints.up("sm"));

  return {
    isMediumAndAbove,
  };
};
