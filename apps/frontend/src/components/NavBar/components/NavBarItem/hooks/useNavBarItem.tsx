import { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  BusinessCenter,
  Dashboard,
  Home,
  Payment,
  ViewList,
} from '@mui/icons-material';

import type { NavBarItemIcon } from '../types';

export const useNavBarItem = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const isActive = useMemo(() => {
    const isActiveHandler = (navBarItemPathname: string) => {
      return navBarItemPathname === pathname;
    };

    return isActiveHandler;
  }, [pathname]);

  const mapIcon = (icon: NavBarItemIcon) => {
    switch (icon) {
      case 'home':
        return <Home className="navbar-item-icon" />;
      case 'dashboard':
        return <Dashboard className="navbar-item-icon" />;
      case 'services':
        return <BusinessCenter className="navbar-item-icon" />;
      case 'orders':
        return <ViewList className="navbar-item-icon" />;
      case 'payments':
        return <Payment className="navbar-item-icon" />;
      default:
        return null;
    }
  };

  const onNavigate = (navBarItemPathname: string) => {
    navigate(navBarItemPathname);
  };
  return {
    isActive,
    mapIcon,
    onNavigate,
  };
};
