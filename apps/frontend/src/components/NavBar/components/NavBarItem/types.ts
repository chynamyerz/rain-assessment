export interface NavBarItemProps extends Omit<NavBarItem, 'icon'> {
  icon?: NavBarItemIcon;
  extracted?: boolean;
}

export interface NavBarItem {
  title: string;
  icon: NavBarItemIcon;
  navBarItemPathname: NavBarItemPathname;
}

export type NavBarItemIcon =
  | 'home'
  | 'dashboard'
  | 'services'
  | 'orders'
  | 'payments';

export type NavBarItemPathname =
  | '/home'
  | '/dashboard'
  | '/services'
  | '/orders'
  | '/payments';
