import { ReactNode } from "react";
import { NavBarItem } from "../NavBarItem/types";

export interface NavBarDrawerProps {
  items: NavBarItem[];
  children: ReactNode;
}
