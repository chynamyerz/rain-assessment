import { FC } from 'react';
import { Box, Typography } from '@mui/material';
import classNames from 'classnames';

import { useNavBarItem } from './hooks/useNavBarItem';
import { NavBarItemProps } from './types';
import './styles.modules.css';

export const NavBarItem: FC<NavBarItemProps> = ({
  title,
  icon,
  extracted,
  navBarItemPathname,
}) => {
  const { mapIcon, isActive, onNavigate } = useNavBarItem();
  const cssClasses = classNames('navbar-item-container', {
    extracted,
    active: isActive(`/${title === 'Home' ? '' : title.toLowerCase()}`),
  });

  return (
    <Box className={cssClasses} onClick={() => onNavigate(navBarItemPathname)}>
      {icon && <Box>{mapIcon(icon)}</Box>}
      <Typography className="navbar-item-label" variant="body1">
        {title}
      </Typography>
    </Box>
  );
};
