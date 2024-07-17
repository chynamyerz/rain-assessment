import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Box } from '@mui/material';

import { NavBarDrawer, NavBarItem } from './components';
import { NAVBAR_ITEMS } from './constants';
import { useNavBar } from './hooks/useNavBar';
import './styles.modules.css';

export const NavBar: FC = () => {
  const { isMediumAndAbove } = useNavBar();

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
