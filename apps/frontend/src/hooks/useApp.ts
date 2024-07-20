import { useQuery } from "@tanstack/react-query";

import { User } from "@store/types";
import { queryFnWrapper } from "utils/queryHelper";

export const useApp = () => {
  const { isPending, isError, data, error } = useQuery<{ user: User }>({
    queryKey: ["User"],
    queryFn: async () => {
      return queryFnWrapper<{ user: User }>("/auth");
    },
  });

  return { user: data?.user, error, isError, isPending };
};
