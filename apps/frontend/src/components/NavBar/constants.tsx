import { NavBarItem } from './components/NavBarItem/types';

export const NAVBAR_ITEMS: NavBarItem[] = [
  {
    title: 'Home',
    icon: 'home',
    navBarItemPathname: '/home',
  },
  {
    title: 'Dashboard',
    icon: 'dashboard',
    navBarItemPathname: '/dashboard',
  },
  {
    title: 'Services',
    icon: 'services',
    navBarItemPathname: '/services',
  },
  { title: 'Orders', icon: 'orders', navBarItemPathname: '/orders' },
  { title: 'Payments', icon: 'payments', navBarItemPathname: '/payments' },
];
