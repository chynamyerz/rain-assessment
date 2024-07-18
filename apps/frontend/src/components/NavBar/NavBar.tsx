import { FC } from "react";
import { Link } from "react-router-dom";
import { Box } from "@mui/material";

import { useScreenSize } from "@hooks/useScreenSize";
import { NAVBAR_ITEMS } from "./constants";
import "./styles.modules.css";
import { NavBarItem } from "./components/NavBarItem/NavBarItem";
import { NavBarDrawer } from "./components/NavBarDrawer/NavDrawer";

export const NavBar: FC = () => {
  const { isMediumAndAbove } = useScreenSize();

  return (
    <Box className="navbar-container">
      <Link to="/" className="logo-container">
        <img src="/rain-full-logo.png" alt="Logo" loading="lazy" width="100%" />
      </Link>
      {isMediumAndAbove ? (
        <Box className="navbar-items-container">
          {NAVBAR_ITEMS.map((navBarItem) => {
            return (
              <NavBarItem
                key={navBarItem.title}
                title={navBarItem.title}
                navBarItemPathname={navBarItem.navBarItemPathname}
                extracted
              />
            );
          })}
        </Box>
      ) : (
        <NavBarDrawer />
      )}
    </Box>
  );
};
