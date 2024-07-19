import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { useScreenSize } from "@hooks/useScreenSize";
import { User } from "@store/types";
import { NAVBAR_ITEMS } from "../constants";

export const useNavBar = () => {
  const { isMediumAndAbove } = useScreenSize();

  const client = useQueryClient();
  const navigate = useNavigate();

  const getNavbarItems = (user?: User | null) => {
    if (user) {
      return NAVBAR_ITEMS.filter((item) => item.title !== "Home");
    }

    return NAVBAR_ITEMS.filter((item) => item.title === "Home");
  };

  const handleSignOut = async () => {
    localStorage.removeItem("token");
    await client.invalidateQueries({ queryKey: ["User"] });
    navigate("/");
  };

  return { isMediumAndAbove, getNavbarItems, handleSignOut };
};
