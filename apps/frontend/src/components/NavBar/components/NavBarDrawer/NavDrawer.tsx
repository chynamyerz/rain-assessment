import { FC } from 'react';
import { MenuOutlined, CloseOutlined } from '@mui/icons-material';
import { Box, IconButton, Drawer, Divider } from '@mui/material';

import { NAVBAR_ITEMS } from '../../constants';
import { NavBarItem } from '../NavBarItem/NavBarItem';
import { useNavBarDrawer } from './hooks/useNavBarDrawer';
import './styles.modules.css';

export const NavBarDrawer: FC = () => {
  const { toggleDrawer, open } = useNavBarDrawer();

  return (
    <Box>
      <IconButton onClick={toggleDrawer(true)} className="navbar-drawer-icon">
        <MenuOutlined />
      </IconButton>
      <Drawer open={open} anchor="right" onClose={toggleDrawer(false)}>
        <Box className="navbar-drawer-items-container">
          <Box className="navbar-drawer-close-icon-container">
            <IconButton
              onClick={toggleDrawer(false)}
              className="navbar-drawer-close-icon"
            >
              <CloseOutlined />
            </IconButton>
          </Box>

          <Divider />

          {NAVBAR_ITEMS.map((navBarItem) => {
            return (
              <NavBarItem
                key={navBarItem.title}
                title={navBarItem.title}
                navBarItemPathname={navBarItem.navBarItemPathname}
                icon={navBarItem.icon}
              />
            );
          })}
        </Box>
      </Drawer>
    </Box>
  );
};