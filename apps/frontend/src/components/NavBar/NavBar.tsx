import { FC } from "react";
import { Link } from "react-router-dom";
import { Box, Button } from "@mui/material";
import { Logout } from "@mui/icons-material";

import { NavBarItem } from "./components/NavBarItem/NavBarItem";
import { NavBarDrawer } from "./components/NavBarDrawer/NavDrawer";
import { NavBarProps } from "./types";
import { useNavBar } from "./hooks/useNavBar";
import "./styles.modules.css";

export const NavBar: FC<NavBarProps> = ({ user }) => {
  const { isMediumAndAbove, getNavbarItems, handleSignOut } = useNavBar();

  return (
    <Box className="navbar-container">
      <Link to="/" className="logo-container">
        <img src="/rain-full-logo.png" alt="Logo" loading="lazy" width="100%" />
      </Link>
      {isMediumAndAbove ? (
        <Box className="navbar-items-container">
          {getNavbarItems(user).map((navBarItem) => {
            return (
              <NavBarItem
                key={navBarItem.title}
                title={navBarItem.title}
                navBarItemPathname={navBarItem.navBarItemPathname}
                extracted
              />
            );
          })}
          {user && (
            <Button
              className="sign-out"
              endIcon={<Logout />}
              variant="contained"
              size="small"
              fullWidth
              onClick={handleSignOut}
            >
              Logout
            </Button>
          )}
        </Box>
      ) : (
        <NavBarDrawer items={getNavbarItems(user)}>
          {user && (
            <Button
              className="sign-out"
              endIcon={<Logout />}
              variant="contained"
              size="small"
              fullWidth
              onClick={handleSignOut}
            >
              Logout
            </Button>
          )}
        </NavBarDrawer>
      )}
    </Box>
  );
};
