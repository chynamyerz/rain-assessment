import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { User } from "@store/types";

export const useApp = () => {
  const { isPending, isError, data, error } = useQuery<{ user: User }>({
    queryKey: ["User"],
    queryFn: async () => {
      const token = localStorage.getItem("token");
      const response = await axios(`${import.meta.env.VITE_API_URL}/auth`, {
        headers: { Authorization: `Bearer ${token || ""}` },
      });

      return await response.data.data;
    },
  });

  return { data, error, isError, isPending };
};
